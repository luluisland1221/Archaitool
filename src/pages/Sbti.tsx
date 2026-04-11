
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  DRUNK_TRIGGER_QUESTION_ID,
  dimensionExplanations,
  dimensionMeta,
  dimensionOrder,
  normalTypes,
  questions,
  specialQuestions,
  typeImages,
  typeLibrary,
  type DimensionKey,
  type Level,
  type SbtiQuestion,
  type SbtiType
} from '../data/sbti';

const OPTION_CODES = ['A', 'B', 'C', 'D'] as const;

type Screen = 'intro' | 'test' | 'result';

type RankedType = SbtiType & {
  pattern: string;
  distance: number;
  exact: number;
  similarity: number;
};

type SbtiResult = {
  rawScores: Record<DimensionKey, number>;
  levels: Record<DimensionKey, Level>;
  ranked: RankedType[];
  bestNormal: RankedType;
  finalType: SbtiType;
  modeKicker: string;
  badge: string;
  sub: string;
  special: boolean;
  secondaryType: RankedType | null;
};

const sumToLevel = (score: number): Level => {
  if (score <= 3) return 'L';
  if (score === 4) return 'M';
  return 'H';
};

const levelNum = (level: Level) => {
  if (level === 'L') return 1;
  if (level === 'M') return 2;
  return 3;
};

const parsePattern = (pattern: string) => pattern.replace(/-/g, '').split('') as Level[];

const shuffleArray = <T,>(items: T[]) => {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const computeResult = (answers: Record<string, number>): SbtiResult => {
  const rawScores = dimensionOrder.reduce((acc, dim) => {
    acc[dim] = 0;
    return acc;
  }, {} as Record<DimensionKey, number>);

  questions.forEach((question) => {
    rawScores[question.dim as DimensionKey] += Number(answers[question.id] || 0);
  });

  const levels = dimensionOrder.reduce((acc, dim) => {
    acc[dim] = sumToLevel(rawScores[dim]);
    return acc;
  }, {} as Record<DimensionKey, Level>);

  const userVector = dimensionOrder.map((dim) => levelNum(levels[dim]));

  const ranked: RankedType[] = normalTypes
    .map((type) => {
      const vector = parsePattern(type.pattern).map(levelNum);
      let distance = 0;
      let exact = 0;

      for (let i = 0; i < vector.length; i += 1) {
        const diff = Math.abs(userVector[i] - vector[i]);
        distance += diff;
        if (diff === 0) exact += 1;
      }

      const similarity = Math.max(0, Math.round((1 - distance / 30) * 100));

      return {
        ...typeLibrary[type.code],
        pattern: type.pattern,
        distance,
        exact,
        similarity
      };
    })
    .sort((a, b) => {
      if (a.distance !== b.distance) return a.distance - b.distance;
      if (b.exact !== a.exact) return b.exact - a.exact;
      return b.similarity - a.similarity;
    });

  const bestNormal = ranked[0];
  const drunkTriggered = answers[DRUNK_TRIGGER_QUESTION_ID] === 2;

  let finalType: SbtiType = bestNormal;
  let modeKicker = 'Your primary type';
  let badge = `Match ${bestNormal.similarity}% · ${bestNormal.exact}/15 exact`;
  let sub = 'High dimensional alignment; this can be considered your primary profile.';
  let special = false;
  let secondaryType: RankedType | null = null;

  if (drunkTriggered) {
    finalType = typeLibrary.DRUNK;
    secondaryType = bestNormal;
    modeKicker = 'Hidden type unlocked';
    badge = 'Match 100% · Alcohol override engaged';
    sub = 'Ethanol affinity too strong. Standard judgment skipped.';
    special = true;
  } else if (bestNormal.similarity < 60) {
    finalType = typeLibrary.HHHH;
    modeKicker = 'System fallback';
    badge = `Top match only ${bestNormal.similarity}%`;
    sub = 'The standard library went on strike, so you were assigned HHHH.';
    special = true;
  }

  return {
    rawScores,
    levels,
    ranked,
    bestNormal,
    finalType,
    modeKicker,
    badge,
    sub,
    special,
    secondaryType
  };
};

type QuestionCardProps = {
  question: SbtiQuestion;
  index: number;
  answer?: number;
  onAnswer: (id: string, value: number) => void;
};

const QuestionCard = ({ question, index, answer, onAnswer }: QuestionCardProps) => {
  const metaLabel = question.special ? 'Bonus question' : 'Dimension hidden';

  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs uppercase tracking-wide text-gray-500">
        <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[11px] font-semibold text-gray-600">
          Question {index + 1}
        </span>
        <span>{metaLabel}</span>
      </div>
      <p className="mt-3 text-base leading-relaxed text-gray-900">{question.text}</p>
      <div className="mt-4 grid gap-3">
        {question.options.map((option, optionIndex) => {
          const checked = answer === option.value;
          return (
            <label
              key={`${question.id}-${option.value}`}
              className={`flex items-start gap-3 rounded-xl border px-4 py-3 transition ${
                checked
                  ? 'border-black bg-gray-50 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name={question.id}
                className="mt-1 h-4 w-4 accent-black"
                checked={checked}
                onChange={() => onAnswer(question.id, option.value)}
              />
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold ${
                  checked ? 'border-black bg-black text-white' : 'border-gray-300 text-gray-600'
                }`}
              >
                {OPTION_CODES[optionIndex] ?? String(optionIndex + 1)}
              </span>
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          );
        })}
      </div>
    </article>
  );
};
const Sbti = () => {
  const [screen, setScreen] = useState<Screen>('intro');
  const [shuffledQuestions, setShuffledQuestions] = useState<SbtiQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<SbtiResult | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [screen]);

  const visibleQuestions = useMemo(() => {
    const visible = [...shuffledQuestions];
    const gateIndex = visible.findIndex((q) => q.id === 'drink_gate_q1');
    if (gateIndex !== -1 && answers['drink_gate_q1'] === 3) {
      visible.splice(gateIndex + 1, 0, specialQuestions[1]);
    }
    return visible;
  }, [shuffledQuestions, answers]);

  const progress = useMemo(() => {
    const total = visibleQuestions.length;
    const done = visibleQuestions.filter((q) => answers[q.id] !== undefined).length;
    const percent = total ? (done / total) * 100 : 0;
    return {
      total,
      done,
      percent,
      complete: total > 0 && done === total
    };
  }, [visibleQuestions, answers]);

  const handleAnswer = useCallback((id: string, value: number) => {
    setAnswers((prev) => {
      const next = { ...prev, [id]: value };
      if (id === 'drink_gate_q1' && value !== 3) {
        delete next['drink_gate_q2'];
      }
      return next;
    });
  }, []);

  const startTest = useCallback(() => {
    setAnswers({});
    setResult(null);
    const shuffled = shuffleArray(questions);
    const insertIndex = Math.floor(Math.random() * shuffled.length) + 1;
    const withGate = [
      ...shuffled.slice(0, insertIndex),
      specialQuestions[0],
      ...shuffled.slice(insertIndex)
    ];
    setShuffledQuestions(withGate);
    setScreen('test');
  }, []);

  const submitTest = useCallback(() => {
    if (!progress.complete) return;
    const computed = computeResult(answers);
    setResult(computed);
    setScreen('result');
  }, [answers, progress.complete]);

  const goIntro = useCallback(() => {
    setScreen('intro');
  }, []);

  const restart = useCallback(() => {
    startTest();
  }, [startTest]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {screen === 'intro' && (
          <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500">SBTI Personality Test</p>
              <h1 className="mt-3 text-4xl font-bold text-gray-900 sm:text-5xl">
                MBTI is outdated. SBTI is here.
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                A playful 15-dimension personality test with chaotic energy, strange accuracy, and absolutely no
                professional guarantees. Take it for fun only.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={startTest}
                  className="rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-900"
                >
                  Start the test
                </button>
                <Link
                  to="/tools"
                  className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-gray-400"
                >
                  Explore AI tools
                </Link>
              </div>
              <div className="mt-8 grid gap-2 text-sm text-gray-500">
                <span>
                  Original creator:{' '}
                  <a
                    href="https://space.bilibili.com/417038183"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 underline underline-offset-4 hover:text-black"
                  >
                    Bilibili creator (UID 417038183)
                  </a>
                </span>
                <span>Hosting: Cloudflare (free)</span>
                <span>Domain: Spaceship (self-paid)</span>
              </div>
            </div>
          </section>
        )}

        {screen === 'test' && (
          <section className="space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="w-full flex-1">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-black transition-all"
                      style={{ width: `${progress.percent}%` }}
                    />
                  </div>
                </div>
                <div className="text-sm font-semibold text-gray-700">
                  {progress.done} / {progress.total}
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                {progress.complete
                  ? 'All done. You can now submit your digital soul for judgment.'
                  : 'Finish every question before the gate opens. The world is messy enough; at least finish the test.'}
              </p>
            </div>

            <div className="space-y-4">
              {visibleQuestions.map((question, index) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  index={index}
                  answer={answers[question.id]}
                  onAnswer={handleAnswer}
                />
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={goIntro}
                className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-gray-400"
              >
                Back to start
              </button>
              <button
                type="button"
                onClick={submitTest}
                disabled={!progress.complete}
                className={`rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-sm transition ${
                  progress.complete ? 'bg-black hover:bg-gray-900' : 'cursor-not-allowed bg-gray-300'
                }`}
              >
                Submit and view results
              </button>
            </div>
          </section>
        )}

        {screen === 'result' && result && (
          <section className="space-y-8">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-gray-500">
                  <span>Result poster</span>
                  <span>{result.finalType.code}</span>
                </div>
                <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                  {typeImages[result.finalType.code] ? (
                    <img
                      src={typeImages[result.finalType.code]}
                      alt={`${result.finalType.code} poster`}
                      className="h-auto w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-64 items-center justify-center text-sm text-gray-500">
                      No poster available
                    </div>
                  )}
                </div>
                <p className="mt-3 text-sm text-gray-600">{result.finalType.intro}</p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">{result.modeKicker}</p>
                <h2 className="mt-3 text-3xl font-bold text-gray-900">
                  {result.finalType.code} <span className="text-gray-500">({result.finalType.name})</span>
                </h2>
                <div className="mt-4 inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-700">
                  {result.badge}
                </div>
                <p className="mt-4 text-sm text-gray-600">{result.sub}</p>
                {result.secondaryType && (
                  <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
                    Closest standard match: <strong>{result.secondaryType.code}</strong> ({result.secondaryType.name})
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">Quick read on this type</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-700">{result.finalType.desc}</p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">15-dimension scores</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {dimensionOrder.map((dim) => {
                  const level = result.levels[dim];
                  const explanation = dimensionExplanations[dim][level];
                  return (
                    <div key={dim} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                      <div className="flex items-center justify-between text-sm font-semibold text-gray-800">
                        <span>{dimensionMeta[dim].name}</span>
                        <span className="text-gray-500">
                          {level} / {result.rawScores[dim]} pts
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">{explanation}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">Friendly note</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-700">
                {result.special
                  ? 'For entertainment only. The hidden type and HHHH fallback are intentional traps. Do not treat this as medical, psychological, fortune-telling, or paranormal evidence.'
                  : 'For entertainment only. Do not use it as diagnosis, interviews, matchmaking, breakups, summoning, or a life verdict. Laugh, but do not take it too seriously.'}
              </p>
            </div>

            <details className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <summary className="cursor-pointer text-sm font-semibold text-gray-800">Author's note</summary>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-gray-600">
                <p>
                  This test first appeared on Bilibili (UID 417038183). The original intention was to persuade a
                  friend who loves drinking to quit.
                </p>
                <p>
                  Because the author is a SHIT doomer type, they roasted everyone equally. Sorry about that. But I am
                  an absolute beauty, so you will forgive me. If you are on Bilibili, feel free to follow.
                </p>
                <p>
                  I could not balance entertainment and professionalism, so some interpretations are vague or
                  inaccurate (for example, Dior-s may not be a real loser). If offended, I am sorry.
                </p>
                <p>
                  Given limited time and energy, I threw together a version for now and will improve it later. It is
                  mainly for fun. Please do not use it for profit.
                </p>
              </div>
            </details>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={restart}
                className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-gray-400"
              >
                Retake the test
              </button>
              <button
                type="button"
                onClick={goIntro}
                className="rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-900"
              >
                Back to start
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Sbti;
