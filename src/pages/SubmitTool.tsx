import React, { useState } from 'react';

const SubmitTool = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const submitBaseUrl = String((import.meta as any).env?.VITE_SUBMIT_BASE_URL || '').replace(/\/$/, '');
  const submitEndpoint = submitBaseUrl ? `${submitBaseUrl}/api/submit-site` : '/api/submit-site';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const payload = {
      title: form.get('title')?.toString().trim(),
      url: form.get('url')?.toString().trim(),
      desc: form.get('desc')?.toString().trim(),
      tags: form.get('tags')?.toString().trim(),
      email: form.get('email')?.toString().trim(),
    };

    try {
      const res = await fetch(submitEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage('Thanks! Your tool was submitted and is pending review.');
        formEl.reset();
      } else {
        const err = await res.json().catch(() => ({}));
        setMessage(`Submission failed: ${err.error || res.statusText}`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      setMessage(`Submission failed: ${message}`);
      // Surface the underlying error for debugging.
      console.error('Submit request failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Submit an AI Tool</h1>
      <p className="text-gray-700 mb-6">
        Share your architecture / design AI tool with our directory. Submissions are reviewed manually before publishing.
      </p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1">Tool name *</label>
          <input
            name="title"
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="e.g., Rendera AI"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Website URL *</label>
          <input
            name="url"
            type="url"
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="https://example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Short description *</label>
          <textarea
            name="desc"
            required
            rows={4}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="What does it do? Who is it for?"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tags (optional)</label>
          <input
            name="tags"
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="e.g., rendering, interior, BIM"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Contact email (optional)</label>
          <input
            name="email"
            type="email"
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="you@example.com"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-60"
        >
          {loading ? 'Submitting…' : 'Submit'}
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-gray-800">{message}</p>}
    </main>
  );
};

export default SubmitTool;
