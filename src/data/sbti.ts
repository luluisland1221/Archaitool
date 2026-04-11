
export type Level = 'L' | 'M' | 'H';

export type DimensionKey =
  | 'S1'
  | 'S2'
  | 'S3'
  | 'E1'
  | 'E2'
  | 'E3'
  | 'A1'
  | 'A2'
  | 'A3'
  | 'Ac1'
  | 'Ac2'
  | 'Ac3'
  | 'So1'
  | 'So2'
  | 'So3';

export type SbtiOption = {
  label: string;
  value: number;
};

export type SbtiQuestion = {
  id: string;
  dim?: DimensionKey;
  text: string;
  options: SbtiOption[];
  special?: boolean;
  kind?: 'drink_gate' | 'drink_trigger';
};

export type SbtiType = {
  code: string;
  name: string;
  intro: string;
  desc: string;
};

export const dimensionMeta: Record<DimensionKey, { name: string; model: string }> = {
  S1: { name: 'S1 Self-esteem and Confidence', model: 'Self model' },
  S2: { name: 'S2 Self-clarity', model: 'Self model' },
  S3: { name: 'S3 Core Values', model: 'Self model' },
  E1: { name: 'E1 Attachment Security', model: 'Emotional model' },
  E2: { name: 'E2 Emotional Investment', model: 'Emotional model' },
  E3: { name: 'E3 Boundaries and Dependence', model: 'Emotional model' },
  A1: { name: 'A1 Worldview Bias', model: 'Attitude model' },
  A2: { name: 'A2 Rules and Flexibility', model: 'Attitude model' },
  A3: { name: 'A3 Sense of Meaning', model: 'Attitude model' },
  Ac1: { name: 'Ac1 Motivational Drive', model: 'Action drive model' },
  Ac2: { name: 'Ac2 Decision Style', model: 'Action drive model' },
  Ac3: { name: 'Ac3 Execution Style', model: 'Action drive model' },
  So1: { name: 'So1 Social Initiative', model: 'Social model' },
  So2: { name: 'So2 Interpersonal Boundaries', model: 'Social model' },
  So3: { name: 'So3 Expression and Authenticity', model: 'Social model' }
};

export const questions: SbtiQuestion[] = [
  {
    id: 'q1',
    dim: 'S1',
    text: `I am not just a loser; I am a joker, I am a salted fish. I have never dated anyone, I am timid and insecure. My youth is a series of fantasies. Every day I imagine having a girl to walk the streets with, shop with, play with. Reality is burning my parents' money, going to a trash school, drifting into a dead-end job, no ideals, no goals, no ability, a triple-no person. Every time I see you joke about losers online, I want to cry. I am a rat underground, peeking at the beautiful world above through a sewer grate. Every glance hurts my soul and squeezes my living space. Please, bros, give clowns like us a little room to breathe. I really do not want to soak my pillowcase with tears in broad daylight.`,
    options: [
      { label: 'I cried...', value: 1 },
      { label: 'What is this...', value: 2 },
      { label: 'That is not me!', value: 3 }
    ]
  },
  {
    id: 'q2',
    dim: 'S1',
    text: 'I am not good enough; everyone around me is better.',
    options: [
      { label: 'True', value: 1 },
      { label: 'Sometimes', value: 2 },
      { label: 'No', value: 3 }
    ]
  },
  {
    id: 'q3',
    dim: 'S2',
    text: 'I know clearly what my real self is like.',
    options: [
      { label: 'Disagree', value: 1 },
      { label: 'Neutral', value: 2 },
      { label: 'Agree', value: 3 }
    ]
  },
  {
    id: 'q4',
    dim: 'S2',
    text: 'Deep down I have something I truly pursue.',
    options: [
      { label: 'Disagree', value: 1 },
      { label: 'Neutral', value: 2 },
      { label: 'Agree', value: 3 }
    ]
  },
  {
    id: 'q5',
    dim: 'S3',
    text: 'I must keep climbing and become stronger.',
    options: [
      { label: 'Disagree', value: 1 },
      { label: 'Neutral', value: 2 },
      { label: 'Agree', value: 3 }
    ]
  },
  {
    id: 'q6',
    dim: 'S3',
    text: "Other people's opinions do not matter to me.",
    options: [
      { label: 'Disagree', value: 1 },
      { label: 'Neutral', value: 2 },
      { label: 'Agree', value: 3 }
    ]
  },
  {
    id: 'q7',
    dim: 'E1',
    text: 'Your partner has not replied for over 5 hours and says they had diarrhea. What do you think?',
    options: [
      { label: 'Diarrhea cannot last 5 hours; maybe they are hiding something.', value: 1 },
      { label: 'I swing between trust and suspicion.', value: 2 },
      { label: 'Maybe they are really unwell today.', value: 3 }
    ]
  },
  {
    id: 'q8',
    dim: 'E1',
    text: 'In relationships I often fear being abandoned.',
    options: [
      { label: 'Yes', value: 1 },
      { label: 'Sometimes', value: 2 },
      { label: 'No', value: 3 }
    ]
  },
  {
    id: 'q9',
    dim: 'E2',
    text: 'I swear to the heavens, I take every relationship seriously!',
    options: [
      { label: 'Not really.', value: 1 },
      { label: 'Maybe?', value: 2 },
      { label: 'Yes! (Clear conscience, proud face)', value: 3 }
    ]
  },
  {
    id: 'q10',
    dim: 'E2',
    text: 'Your crush is respectful to elders and kids, gentle and kind, clean-living, upright, righteous, articulate, sharp-eyed, well-read, learned, patient, approachable, kind-hearted, optimistic, energetic, and ridiculously gorgeous. What would you do?',
    options: [
      { label: 'Even if they are amazing, I will not fall in too deep.', value: 1 },
      { label: 'Somewhere between A and C.', value: 2 },
      { label: 'I would cherish them a lot and might become love-brained.', value: 3 }
    ]
  },
  {
    id: 'q11',
    dim: 'E3',
    text: 'After dating, your partner is very clingy. How do you feel?',
    options: [
      { label: 'That feels great.', value: 1 },
      { label: 'Either way, whatever.', value: 2 },
      { label: 'I prefer keeping my own space.', value: 3 }
    ]
  },
  {
    id: 'q12',
    dim: 'E3',
    text: 'In any relationship I value personal space.',
    options: [
      { label: 'I prefer depending on and being depended on.', value: 1 },
      { label: 'Depends.', value: 2 },
      { label: 'Yes! (Decisively)', value: 3 }
    ]
  },
  {
    id: 'q13',
    dim: 'A1',
    text: 'Most people are kind.',
    options: [
      { label: 'Actually there are more evil hearts than hemorrhoids in the world.', value: 1 },
      { label: 'Maybe.', value: 2 },
      { label: 'Yes, I want to believe there are more good people.', value: 3 }
    ]
  },
  {
    id: 'q14',
    dim: 'A1',
    text: 'You are walking on the street. A super cute little girl hops over and hands you a lollipop (cute from every angle, cute on any phone). What do you think?',
    options: [
      { label: 'Aww she is so sweet and cute! She gave me a lollipop!', value: 3 },
      { label: 'Confused, scratching my head.', value: 2 },
      { label: 'This might be a new kind of scam; better walk away.', value: 1 }
    ]
  },
  {
    id: 'q15',
    dim: 'A2',
    text: 'Exams are coming. School requires evening study and skipping costs points, but tonight you planned to play PUBG Mobile with your crush. What do you do?',
    options: [
      { label: 'Skip it! It is just once!', value: 1 },
      { label: 'Just ask for leave.', value: 2 },
      { label: 'Exams are near; why go at all.', value: 3 }
    ]
  },
  {
    id: 'q16',
    dim: 'A2',
    text: 'I like breaking norms and dislike being constrained.',
    options: [
      { label: 'Agree', value: 1 },
      { label: 'Neutral', value: 2 },
      { label: 'Disagree', value: 3 }
    ]
  },
  {
    id: 'q17',
    dim: 'A3',
    text: 'I usually have goals when I do things.',
    options: [
      { label: 'Disagree', value: 1 },
      { label: 'Neutral', value: 2 },
      { label: 'Agree', value: 3 }
    ]
  },
  {
    id: 'q18',
    dim: 'A3',
    text: 'One day I suddenly realize life has no damn meaning. People are just animals driven by desires and hormones. Hungry we eat, sleepy we sleep, in heat we want to mate. We are basically pigs and dogs with little difference.',
    options: [
      { label: 'That is how it is.', value: 1 },
      { label: 'Maybe yes, maybe no.', value: 2 },
      { label: 'That is nonsense.', value: 3 }
    ]
  },
  {
    id: 'q19',
    dim: 'Ac1',
    text: 'I do things mainly to achieve results and progress, not to avoid trouble and risk.',
    options: [
      { label: 'Disagree', value: 1 },
      { label: 'Neutral', value: 2 },
      { label: 'Agree', value: 3 }
    ]
  },
  {
    id: 'q20',
    dim: 'Ac1',
    text: 'You are constipated on the toilet for 30 minutes and it hurts. You are more like:',
    options: [
      { label: 'Sit another 30 minutes; maybe it will happen.', value: 1 },
      { label: 'Smack your butt and say: "Come on, useless butt!"', value: 2 },
      { label: 'Use a suppository and get it done fast.', value: 3 }
    ]
  },
  {
    id: 'q21',
    dim: 'Ac2',
    text: 'I am decisive and do not like to hesitate.',
    options: [
      { label: 'Disagree', value: 1 },
      { label: 'Neutral', value: 2 },
      { label: 'Agree', value: 3 }
    ]
  },
  {
    id: 'q22',
    dim: 'Ac2',
    text: 'This question has no prompt. Pick blindly.',
    options: [
      { label: 'After overthinking, A?', value: 1 },
      { label: 'Uh, maybe B?', value: 2 },
      { label: 'No idea, pick C?', value: 3 }
    ]
  },
  {
    id: 'q23',
    dim: 'Ac3',
    text: 'People say you have strong execution. Which line is closer to your inner voice?',
    options: [
      { label: 'When I am pushed to the edge, my execution is insane...', value: 1 },
      { label: 'Eh, sometimes.', value: 2 },
      { label: 'Yes. Things should be pushed forward.', value: 3 }
    ]
  },
  {
    id: 'q24',
    dim: 'Ac3',
    text: 'I often plan things, ____.',
    options: [
      { label: 'But change beats plans.', value: 1 },
      { label: 'Sometimes I finish, sometimes I do not.', value: 2 },
      { label: 'I hate having my plans disrupted.', value: 3 }
    ]
  },
  {
    id: 'q25',
    dim: 'So1',
    text: 'You met many online friends through a game and get invited to meet offline. What do you think?',
    options: [
      { label: 'Online banter is fine, but meeting in person makes me nervous.', value: 1 },
      { label: 'Meeting is fine; whoever comes, I will chat a bit.', value: 2 },
      { label: 'I will dress up and chat warmly, just in case.', value: 3 }
    ]
  },
  {
    id: 'q26',
    dim: 'So1',
    text: 'A friend brings their friend along. You are most likely to:',
    options: [
      { label: "Keep some distance from a friend's friend to avoid affecting their relationship.", value: 1 },
      { label: 'Depends on them; if we click, we play.', value: 2 },
      { label: "A friend's friend is my friend too. I will chat warmly.", value: 3 }
    ]
  },
  {
    id: 'q27',
    dim: 'So2',
    text: 'I have an electronic fence in socializing; get too close and alarms go off.',
    options: [
      { label: 'Agree', value: 3 },
      { label: 'Neutral', value: 2 },
      { label: 'Disagree', value: 1 }
    ]
  },
  {
    id: 'q28',
    dim: 'So2',
    text: 'I crave close bonds with people I trust, as close as long-lost relatives.',
    options: [
      { label: 'Agree', value: 1 },
      { label: 'Neutral', value: 2 },
      { label: 'Disagree', value: 3 }
    ]
  },
  {
    id: 'q29',
    dim: 'So3',
    text: 'Sometimes you have a different, negative opinion but do not say it. Mostly because:',
    options: [
      { label: 'This rarely happens.', value: 1 },
      { label: 'Out of face-saving or relationship concerns.', value: 2 },
      { label: 'I do not want others to know I am a dark person.', value: 3 }
    ]
  },
  {
    id: 'q30',
    dim: 'So3',
    text: 'I show different sides of myself in front of different people.',
    options: [
      { label: 'Disagree', value: 1 },
      { label: 'Neutral', value: 2 },
      { label: 'Agree', value: 3 }
    ]
  }
];

export const specialQuestions: SbtiQuestion[] = [
  {
    id: 'drink_gate_q1',
    special: true,
    kind: 'drink_gate',
    text: 'What is your usual hobby?',
    options: [
      { label: 'Eat, drink, poop.', value: 1 },
      { label: 'Artistic hobbies.', value: 2 },
      { label: 'Drinking.', value: 3 },
      { label: 'Fitness.', value: 4 }
    ]
  },
  {
    id: 'drink_gate_q2',
    special: true,
    kind: 'drink_trigger',
    text: 'What is your attitude toward drinking?',
    options: [
      { label: 'A little for the mood; I cannot drink much.', value: 1 },
      { label: 'I pour baijiu in a thermos and drink it like water. Alcohol convinces me.', value: 2 }
    ]
  }
];

export const typeLibrary: Record<string, SbtiType> = {
  CTRL: {
    code: 'CTRL',
    name: 'Controller',
    intro: 'So, feel handled yet?',
    desc: `Congrats, you scored one of the rarest types in China. You are a natural rebel against the universe's entropy. Among so-called successful people, 99.99% are crude imitations of you. CTRL is a walking, self-driving task manager. The rules normal people see are just factory defaults to you; their plans are your casual doodles. Having a CTRL friend means your life navigation gets precise and efficient, because CTRL knows how to take control. Right before your life train derails, they hit Ctrl+S to hard-save and drag you back on track with logic you cannot refuse. They are the last backup disk in your chaotic life, the one restart key still glowing before the universe collapses.`
  },
  'ATM-er': {
    code: 'ATM-er',
    name: 'Payer',
    intro: 'Do you think I am made of money?',
    desc: `Congrats, you pulled one of the rarest types in the world. You might become an unsolved mystery of finance. Yes, an ATM-er does not necessarily give money, but is always paying: time, energy, patience, and nights that should have been peaceful. You are like an old but sturdy ATM: people insert their anxiety and trouble, and you dispense a calm "it is fine, I have got you." Your life is a grand, uncheered solo bill-paying show. With rock-solid reliability you bear a waterfall of demands, and only late at night do you sigh at your statement (maybe a mental one): this damn responsibility with nowhere to go.`
  },
  'Dior-s': {
    code: 'Dior-s',
    name: 'Original Realist',
    intro: 'Just wait for my underdog comeback.',
    desc: `Congrats! You are not a loser; you are the spiritual heir of Diogenes, because Dior-s stands for Diogenes' Original Realist - sage. Dior-s is the most thorough contempt for consumerist traps and hustle-culture gaslighting. It is not "no ambition"; it is seeing that the end of ambition is just a fancier prison. Dior-s has big wisdom. While others chase trends and get smashed by the era's waves, Dior-s is sunbathing in their own barrel, reaching the supreme state of barrel-self unity. They believe not in slogans but in physical laws and instincts tested millions of times: one, lying down is more comfortable than standing; two, when it is meal time, you eat.`
  },
  BOSS: {
    code: 'BOSS',
    name: 'Leader',
    intro: 'Hand me the wheel. I will drive.',
    desc: `BOSS always has a steering wheel in hand. Even if the fuel light is red and the navigation is talking nonsense, you say "I will drive" and actually get to the destination. This type has its own law of physics - the eternal upward law. BOSS sees the world like a player who already cleared the game watching a tutorial. Efficiency is their faith, order is their breathing. They are not born with a leader aura; they are the aura generator. Within five meters, the air becomes serious and efficient. Their idea of self-improvement is what ordinary people call self-torture. Learn a new language today, earn another certificate tomorrow, colonize Mars the day after. If you say that is too intense, they look at you like a weak chick: it is not that I am too hard, it is that you are too soft.`
  },
  'THAN-K': {
    code: 'THAN-K',
    name: 'Grateful',
    intro: 'I thank the heavens. I thank the earth.',
    desc: `Congrats, you scored one of the rarest types in China. You should thank me. Thank that you have life at this moment. If you hit a traffic jam on the way to work, you should say: I thank this jam; it gives me more time to listen to this beautiful song and observe every anxious face outside, so I can treasure inner peace. THAN-K has a gentle temperament and an ocean-wide heart. In their eyes there are no completely bad people, only friends not yet lit by gratitude. Having a THAN-K friend is like carrying a never-ending positive-energy tower. They can even find a Van Gogh style starry sky in a patch of mold.`
  },
  'OH-NO': {
    code: 'OH-NO',
    name: 'Oh-No',
    intro: 'Oh no! How am I this type?!',
    desc: `"Oh no" is not a scream of fear, but top-level wisdom. When normal people see a cup on the edge of a table, the Oh-No type sees a disaster epic: water stain, short circuit, fire, evacuation, economic loss, butterfly effect, apocalypse. So with a soul-deep "Oh, no!" they move the cup to the center and place a coaster. Oh-No people have an obsessive respect for boundaries: yours is yours, mine is mine. All accidents and risks are strangled in the bud by that "Oh, no!" They are guardians of order, the last batch of well-composed people in a chaotic world.`
  },
  GOGO: {
    code: 'GOGO',
    name: 'Goer',
    intro: 'gogogo, let us go.',
    desc: `Research shows the GOGO brain is fundamentally different. GOGO lives in an extreme WYSIWYG world with a brutally simple creed: if I close my eyes, it is dark; if I spend all my money, I have no money; if I stand on a crosswalk, I am a pedestrian. The logic loops perfectly and is impossible to refute. While others debate "which came first, the chicken or the egg," GOGO has already turned both into a rice bowl called "chicken gives egg, egg gives chicken, ultimate truth." They are not solving problems; they are clearing to-do items. For them there are only two states: done, and about to be done by me.`
  },
  SEXY: {
    code: 'SEXY',
    name: 'Stunner',
    intro: 'You are a born stunner.',
    desc: `When you enter a room, the lighting system recognizes you as a born stunner and dims itself to save energy. When you smile, you become a smiling stunner and the humidity drops because the vapor condenses into hearts in people's eyes. Anyone tends to pay too much attention to your existence. Legend says if enough SEXY types gather for a party, the combined charm energy can temporarily distort space-time and make attendees feel time slowing. They do not need to over-express; often just existing already reads like a lavish ode.`
  },
  'LOVE-R': {
    code: 'LOVE-R',
    name: 'Romantic',
    intro: 'Love is so full that reality feels thin.',
    desc: `LOVE-R is like a rare species surviving from ancient myths, rarer than catching the author's arm in a toilet. You are the last, most out-of-place bard of this steel-forest age. Your emotional processor is not binary; it is rainbow-based. A fallen leaf to others is "autumn is here"; to LOVE-R it is a 13-act tragicomedy about cycles, sacrifice, and wordless love. Your inner world is a theme park that never closes, and you spend your life looking for the one soul who can read the map and ride the carousel with you to the end of the universe.`
  },
  MUM: {
    code: 'MUM',
    name: 'Mom',
    intro: 'Maybe... can I call you Mom?',
    desc: `Congrats, you scored the rarest Mom type in China. Yes, before chaos was opened, before time had a name, before the first star burped, there was already Mom. The base color of Mom is gentle. They sense emotions, have strong empathy, know when to stop, and know when to say "forget it" to themselves. Mom is like a doctor, healing other people's unhappiness. Sadly, when Mom cries, the medicine they give themselves is always a smaller dose than what they give others. Their tenderness for themselves is often discounted.`
  },
  FAKE: {
    code: 'FAKE',
    name: 'Impostor',
    intro: 'There are no humans left.',
    desc: `SCP Foundation emergency report: item SCP-CN-XXXX "Impostor." In social situations, the FAKE type is eight-sided because they switch masks faster than phone input methods. One second they are your brother-from-another-mother, the next the boss arrives and they switch to reliable employee mode, even their facial shine and curl degree adjust. You think you met a true friend? Wake up. You just met a high-performance android good at disguise. At night they peel off layers of masks and find emptiness underneath. The masks themselves made the self.`
  },
  OJBK: {
    code: 'OJBK',
    name: 'Whatever',
    intro: 'When I say whatever, I mean it.',
    desc: `Let us face the rough essence of this word: OJBK. It is no longer a personality, it is a philosophy of rule. When ordinary people face the century choice of rice or noodles, their brains burn calories; the OJBK type calmly says "either." It is not indecisive; it means your choices are ants to me. Why not argue? Debating the future of the universe with a paramecium is pointless. Why not nitpick? An emperor does not care which way the dust at his feet drifts.`
  },
  MALO: {
    code: 'MALO',
    name: 'Monkey',
    intro: 'Life is a side quest, and I am just a monkey.',
    desc: `Friend, you are not "young at heart"; you just never evolved. Your soul is still at the stage of swinging from trees and lighting up at bananas. When human ancestors decided to climb down, walk upright, and wear suits, the ancestors of the MALO type watched from a tree, scratched their butt, and let out a scornful "chi." They saw through everything: civilization is just the most boring, least fun pay-to-play game. Rules can be broken, ceilings are for hanging upside down, conference rooms are for backflips. MALO itself is a wild idea that fell out of a huge brain and forgot to close the door.`
  },
  'JOKE-R': {
    code: 'JOKE-R',
    name: 'Clown',
    intro: 'Turns out we are all clowns.',
    desc: `Note that JOKE-R is not really a person; it is a clown wearing jokes. You open one layer - a joke; open another - a punchline; layer by layer until inside there is nothing, just a faint echo saying "ha, surprised?" JOKE-R is the designated firepower and vibe leader in social gatherings. With them, the room never goes cold. Everyone laughs, and the loudest laugh is often theirs, using it to cover the sound of a broken heart.`
  },
  'WOC!': {
    code: 'WOC!',
    name: 'WOC',
    intro: 'WOC! How am I this type?',
    desc: `We discovered a magical species - WOC people. They have two independent operating systems: the surface system outputs "WOC," "awesome," "huh" and other exaggerated noises; the background system calmly analyzes: yep, just as expected. WOC people only say WOC and do not meddle, because they know explaining to idiots is like trying to plaster mud onto a wall - it wastes energy and covers your hands in crap. So they hold a big stick of wisdom and offer the world a heartfelt "WOC!"`
  },
  'THIN-K': {
    code: 'THIN-K',
    name: 'Thinker',
    intro: 'Deep thinking for 100s.',
    desc: `Research shows the THIN-K brain is fundamentally different. As the name suggests, your brain stays in thinking mode for long periods. You scrutinize information - arguments, evidence, logic, hidden bias, even a three-generation background check on the author. In the age of information overload, you do not follow blindly, you weigh pros and cons in relationships, and you fiercely protect your personal space. If people see you alone and think you are spacing out, foolish. You are not spacing out; your brain is sorting, archiving, and deleting everything you absorbed today.`
  },
  SHIT: {
    code: 'SHIT',
    name: 'Doomer',
    intro: 'This world is a pile of crap.',
    desc: `Congrats, SHIT is the only known rare type in the universe. "Shit" is not just a complaint; it is a mysterious ritual. SHIT's behavior is a paradox drama. Mouth: this project is shit. Hands: quietly open Excel, build formulas and Gantt charts. Mouth: these coworkers are shit. Hands: after they mess up, stay up late cleaning the mess. Mouth: this world is a pile of shit, hurry up and end it. Hands: wake up at 7 a.m., squeeze into a shit-like subway, go to a shit-like job. Do not panic. It is not an apocalypse alarm; it is the horn announcing they are about to save the world.`
  },
  ZZZZ: {
    code: 'ZZZZ',
    name: 'Sleeper',
    intro: 'I am not dead, I am just sleeping.',
    desc: `Congrats, you scored the rarest playing-dead type. You can ignore 99+ messages in a group, but when someone posts "@all members, 30 minutes left" you awaken like a mummy from a thousand-year tomb, slowly type "received," and deliver a barely passing answer within 29 minutes. Only when the one highest-permission instruction called "deadline" appears do you truly explode. You prove a cosmic truth: sometimes doing nothing means doing nothing wrong.`
  },
  POOR: {
    code: 'POOR',
    name: 'Laser Focus',
    intro: 'I am broke, but I am focused.',
    desc: `Congrats, you are the POOR type. This poor is not a verdict on your wallet; it is resource redistribution after desire decluttering. Others scatter energy into a sky of QR codes; you compress it into a laser beam. Point it and smoke appears. The POOR world is simple: everything unimportant gets noise-reduced; everything important gets hammered. Social bustle, vanity, showing up everywhere? Sorry, no time. It is not that you have fewer resources; you pour them all into one pit, so you look poor but actually like a mine. Once you decide something is worth drilling into, outside noise is just background.`
  },
  MONK: {
    code: 'MONK',
    name: 'Monk',
    intro: 'No worldly desires.',
    desc: `While others study love and hate in KTV, MONK studies the Way at home. MONK has seen through worldly dust and does not want random people to disturb their cultivation. Their personal space is their barrier, their Mount Sumeru, their absolute domain, sacred and inviolable. Intruders will feel a suffocation from the soul. MONKs are not clingy, because in their worldview everything has its own orbit. Planets stay billions of kilometers apart to form a harmonious universe; why should people be different?`
  },
  IMSB: {
    code: 'IMSB',
    name: 'Fool',
    intro: 'Seriously? Am I really an idiot?',
    desc: `Congrats! You are outside the human category. You scored the once-in-a-million-years IMSB type. Inside the IMSB brain live two ultimate warriors: one shouts "I am going for it!" the other shouts "I am an idiot!" When IMSB meets someone they like, the first says: go, ask for their contact, ask them out, say love out loud. The second says: why would they like you? You will just humiliate yourself. Final result: you stare at their back until they disappear, then search "how to overcome social anxiety." IMSB is not truly stupid; your inner drama may be longer than the entire Marvel universe.`
  },
  SOLO: {
    code: 'SOLO',
    name: 'Solo',
    intro: 'I cried. How am I Solo?',
    desc: `Congrats, you scored the rarest SOLO type in China. Do not rush to cry. A king's coronation is usually solo. Solos have low self-worth, so they sometimes push others away. They build a Great Wall named "Do not come near me" around their souls. Every brick is an old wound. A Solo is like a hedgehog hiding all soft spots and facing the world with the hardest spikes. Those spikes are not attacks; they are unspoken "do not come close, I am afraid you will get hurt" and "please do not leave."`
  },
  FUCK: {
    code: 'FUCK',
    name: 'Wild Weed',
    intro: 'What the hell is this type?',
    desc: `Congrats! You are outside the human category. You scored the once-in-a-million-years FUCK type. In civilized cities, a human-shaped weed appears that no herbicide can kill - the Wild Weed type. Its scientific name is FUCK. In the FUCK worldview, worldly rules are meaningless, and its emotion switch is a physical toggle: FUCK YEAH and FUCK OFF. FUCK pursues not only the immediate rush but also a wild life force crashing inside. When everyone is domesticated into gentle poultry, FUCK is the last wolf howl in the wilderness.`
  },
  DEAD: {
    code: 'DEAD',
    name: 'Dead',
    intro: 'Am I... still alive?',
    desc: `Congrats, you scored one of the rarest types in China. The name Dead is a bit unlucky, so you can also call it: Don't Expect Any Drives. Dead has seen through meaningless philosophy and lost interest in everything. Their gaze is like a top player who cleared all main and side quests, deleted the save, restarted 999 times, and finally realized this game is pointless. Dead is the ultimate sage beyond desire and goals. Their existence is the quietest and most complete protest against a noisy world.`
  },
  IMFW: {
    code: 'IMFW',
    name: 'Fragile',
    intro: 'Am I really... trash?',
    desc: `Congrats, you did not get an ordinary type. You are a rare one that makes up only 0.0001% of the world - IMFW. IMFW types often have fragile self-esteem, lack security, and sometimes lack decisiveness, so they can detect the strongest WiFi signal around them, the person they trust most. Entering an IMFW life is like entering a top orchid greenhouse: you must control temperature and humidity precisely and provide daily photosynthesis of "I love you." Give an IMFW a candy and they return a fully trusting, sparkling gaze. You might not be trash; you are just too unguarded and too easily serious.`
  },
  HHHH: {
    code: 'HHHH',
    name: 'Laugher',
    intro: 'Hahahahahaha.',
    desc: `Congrats! Your brain wiring is so unique that the standard type library crashed. Only when your top match is below 60% does the system force this type - HHHH. What traits does it have? Hahahahahaha. Sorry, that is all. You can look at the 15 dimensions for an unprofessional assessment. The author did not design the types comprehensively, hence this. Hahahaha... laughing and laughing, I end up crying. How can someone's brain be this unique.`
  },
  DRUNK: {
    code: 'DRUNK',
    name: 'Drunk',
    intro: 'Strong liquor burns the throat. You must get drunk.',
    desc: `Why do you walk wobbling? Why are you always hyped? Why are things double? Because what flows in you is not blood, but delicious baijiu: Wuliangye, Guojiao 1573, Jiangxiaobai, Shaanxi Wuliangye. Oh, delicious white liquor, every drop burning and boiling. Have you already gotten used to pouring baijiu into a thermos and drinking it like water? What a great liquor. It lets you talk big at the table and later hug the toilet to repent; it makes you feel like the night poet, the central flame of the universe, until 10 a.m. the next day when your avatar is a cracked walnut, food crumbs on your lip, and your soul shrinks in a corner. You finally realize that loud person from last night has become a drunk.`
  }
};
export const typeImages: Record<string, string> = {
  IMSB: '/sbti/IMSB.png',
  BOSS: '/sbti/BOSS.png',
  MUM: '/sbti/MUM.png',
  FAKE: '/sbti/FAKE.png',
  'Dior-s': '/sbti/Dior-s.jpg',
  DEAD: '/sbti/DEAD.png',
  ZZZZ: '/sbti/ZZZZ.png',
  GOGO: '/sbti/GOGO.png',
  FUCK: '/sbti/FUCK.png',
  CTRL: '/sbti/CTRL.png',
  HHHH: '/sbti/HHHH.png',
  SEXY: '/sbti/SEXY.png',
  OJBK: '/sbti/OJBK.png',
  'JOKE-R': '/sbti/JOKE-R.jpg',
  POOR: '/sbti/POOR.png',
  'OH-NO': '/sbti/OH-NO.png',
  MONK: '/sbti/MONK.png',
  SHIT: '/sbti/SHIT.png',
  'THAN-K': '/sbti/THAN-K.png',
  MALO: '/sbti/MALO.png',
  'ATM-er': '/sbti/ATM-er.png',
  'THIN-K': '/sbti/THIN-K.png',
  SOLO: '/sbti/SOLO.png',
  'LOVE-R': '/sbti/LOVE-R.png',
  'WOC!': '/sbti/WOC.png',
  DRUNK: '/sbti/DRUNK.png',
  IMFW: '/sbti/IMFW.png'
};

export const normalTypes = [
  { code: 'CTRL', pattern: 'HHH-HMH-MHH-HHH-MHM' },
  { code: 'ATM-er', pattern: 'HHH-HHM-HHH-HMH-MHL' },
  { code: 'Dior-s', pattern: 'MHM-MMH-MHM-HMH-LHL' },
  { code: 'BOSS', pattern: 'HHH-HMH-MMH-HHH-LHL' },
  { code: 'THAN-K', pattern: 'MHM-HMM-HHM-MMH-MHL' },
  { code: 'OH-NO', pattern: 'HHL-LMH-LHH-HHM-LHL' },
  { code: 'GOGO', pattern: 'HHM-HMH-MMH-HHH-MHM' },
  { code: 'SEXY', pattern: 'HMH-HHL-HMM-HMM-HLH' },
  { code: 'LOVE-R', pattern: 'MLH-LHL-HLH-MLM-MLH' },
  { code: 'MUM', pattern: 'MMH-MHL-HMM-LMM-HLL' },
  { code: 'FAKE', pattern: 'HLM-MML-MLM-MLM-HLH' },
  { code: 'OJBK', pattern: 'MMH-MMM-HML-LMM-MML' },
  { code: 'MALO', pattern: 'MLH-MHM-MLH-MLH-LMH' },
  { code: 'JOKE-R', pattern: 'LLH-LHL-LML-LLL-MLM' },
  { code: 'WOC!', pattern: 'HHL-HMH-MMH-HHM-LHH' },
  { code: 'THIN-K', pattern: 'HHL-HMH-MLH-MHM-LHH' },
  { code: 'SHIT', pattern: 'HHL-HLH-LMM-HHM-LHH' },
  { code: 'ZZZZ', pattern: 'MHL-MLH-LML-MML-LHM' },
  { code: 'POOR', pattern: 'HHL-MLH-LMH-HHH-LHL' },
  { code: 'MONK', pattern: 'HHL-LLH-LLM-MML-LHM' },
  { code: 'IMSB', pattern: 'LLM-LMM-LLL-LLL-MLM' },
  { code: 'SOLO', pattern: 'LML-LLH-LHL-LML-LHM' },
  { code: 'FUCK', pattern: 'MLL-LHL-LLM-MLL-HLH' },
  { code: 'DEAD', pattern: 'LLL-LLM-LML-LLL-LHM' },
  { code: 'IMFW', pattern: 'LLH-LHL-LML-LLL-MLL' }
] as const;
export const dimensionExplanations: Record<DimensionKey, Record<Level, string>> = {
  S1: {
    L: 'You are harsher on yourself than others; even compliments make you question their authenticity.',
    M: 'Confidence swings with the weather; with tailwind you fly, with headwind you shrink.',
    H: 'You have a decent read on yourself; a passerby comment will not scatter you.'
  },
  S2: {
    L: 'Your inner channel has lots of static; you often loop on "who am I."',
    M: 'You usually recognize yourself, but emotions sometimes swap your account.',
    H: 'You are clear about your temper, desires, and boundaries.'
  },
  S3: {
    L: 'You value comfort and safety; no need to sprint every day.',
    M: 'You want progress and also a nap; your values hold frequent internal meetings.',
    H: 'Goals, growth, or a core belief easily push you forward.'
  },
  E1: {
    L: 'Your relationship alarm is sensitive; a read but no reply becomes a full movie.',
    M: 'Half trust, half testing; lots of inner tug-of-war.',
    H: 'You trust the relationship itself and do not scatter at every breeze.'
  },
  E2: {
    L: 'You invest cautiously; the door is not closed, just heavily gated.',
    M: 'You invest but keep a backup, no all-in.',
    H: 'Once you commit, you go serious with lots of emotion and energy.'
  },
  E3: {
    L: 'You can be clingy or attract clinginess; warmth matters.',
    M: 'You want closeness and independence, adjustable dependence.',
    H: 'Space is important; even in love you need your own territory.'
  },
  A1: {
    L: 'You see the world through a defense filter: doubt first, then approach.',
    M: 'Neither naive nor full conspiracist; watching is your instinct.',
    H: 'You prefer believing in human goodness and do not sentence the world at first sign.'
  },
  A2: {
    L: 'If rules can be bent, you bend them; comfort and freedom come first.',
    M: 'You follow rules when needed and flex when needed.',
    H: 'Strong sense of order; if there is a process, you do not like to freestyle chaos.'
  },
  A3: {
    L: 'Low sense of meaning; many things feel like going through the motions.',
    M: 'Sometimes you have goals, sometimes you want to slack; life philosophy is half-booted.',
    H: 'You have direction and know roughly where you are headed.'
  },
  Ac1: {
    L: 'You first try not to crash; risk avoidance boots before ambition.',
    M: 'Sometimes you want to win, sometimes just avoid hassle.',
    H: 'Results, growth, and momentum ignite you.'
  },
  Ac2: {
    L: 'You loop before deciding; inner meetings often overtime.',
    M: 'You think, but not to a freeze, normal hesitation.',
    H: 'You decide quickly and do not look back.'
  },
  Ac3: {
    L: 'Your execution is bonded to deadlines; the later it is, the more you awaken.',
    M: 'You can do it, but timing matters; sometimes steady, sometimes lazy.',
    H: 'You have strong push-through energy; unfinished tasks feel like a thorn.'
  },
  So1: {
    L: 'Social startup is slow; initiating takes a lot of charge-up.',
    M: 'If people come, you engage; if not, you do not force it.',
    H: 'You like to open the room and do not mind being visible.'
  },
  So2: {
    L: 'You want closeness and fusion; once familiar, you pull people into your inner circle.',
    M: 'You want closeness but keep a gap; boundaries adjust by person.',
    H: 'Strong boundaries; if someone gets too close you step back.'
  },
  So3: {
    L: 'You express directly; you do not like to wrap things.',
    M: 'You read the room; keep a bit of truth and a bit of politeness.',
    H: 'You switch selves across contexts easily; authenticity is doled out in layers.'
  }
};

export const dimensionOrder: DimensionKey[] = [
  'S1',
  'S2',
  'S3',
  'E1',
  'E2',
  'E3',
  'A1',
  'A2',
  'A3',
  'Ac1',
  'Ac2',
  'Ac3',
  'So1',
  'So2',
  'So3'
];

export const DRUNK_TRIGGER_QUESTION_ID = 'drink_gate_q2';
