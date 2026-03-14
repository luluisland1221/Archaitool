import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';

type Submission = {
  id: string;
  title: string;
  url: string;
  desc: string;
  tags: string | null;
  email: string | null;
  status: string | null;
  submission_ip: string | null;
  created_at: string;
};

const DEFAULT_LIMIT = 200;

const ContactSubmissions = () => {
  const [token, setToken] = useState('');
  const [rememberToken, setRememberToken] = useState(true);
  const [status, setStatus] = useState('');
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<Submission[]>([]);
  const [lastLoadedAt, setLastLoadedAt] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('archaitool_admin_token');
    if (saved) {
      setToken(saved);
    }
  }, []);

  useEffect(() => {
    if (!rememberToken) {
      localStorage.removeItem('archaitool_admin_token');
      return;
    }
    if (token) {
      localStorage.setItem('archaitool_admin_token', token);
    }
  }, [token, rememberToken]);

  const canLoad = useMemo(() => token.trim().length > 0, [token]);

  const loadSubmissions = async () => {
    if (!canLoad) {
      setError('Please enter the admin token.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (status.trim()) {
        params.set('status', status.trim());
      }
      params.set('limit', String(limit || DEFAULT_LIMIT));

      const res = await fetch(`/api/admin/submissions?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
        },
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || res.statusText);
      }

      const data = await res.json();
      setItems(Array.isArray(data.items) ? data.items : []);
      setLastLoadedAt(new Date().toISOString());
    } catch (err: any) {
      setError(err.message || 'Failed to load submissions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Submission Inbox - Arch AI Tool</title>
        <meta name="description" content="Private submissions inbox for Arch AI Tool." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Submission Inbox</h1>
            <p className="text-gray-600 mt-2">View the latest tool submissions stored in D1.</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Admin Token</label>
                <input
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Enter admin token"
                  type="password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status Filter</label>
                <input
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="pending, paid, approved"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Limit</label>
                <input
                  value={limit}
                  onChange={(e) => setLimit(Number(e.target.value) || DEFAULT_LIMIT)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  type="number"
                  min={1}
                  max={500}
                />
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <label className="inline-flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={rememberToken}
                  onChange={(e) => setRememberToken(e.target.checked)}
                  className="mr-2"
                />
                Remember token on this device
              </label>
              <button
                onClick={loadSubmissions}
                disabled={loading}
                className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-60"
              >
                {loading ? 'Loading...' : 'Load Submissions'}
              </button>
              {lastLoadedAt && (
                <span className="text-sm text-gray-500">
                  Last loaded: {new Date(lastLoadedAt).toLocaleString()}
                </span>
              )}
            </div>

            {error && (
              <div className="mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
                {error}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Results</h2>
              <span className="text-sm text-gray-500">{items.length} records</span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-4 py-3 text-left">Created</th>
                    <th className="px-4 py-3 text-left">Title</th>
                    <th className="px-4 py-3 text-left">URL</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Tags</th>
                    <th className="px-4 py-3 text-left">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {items.length === 0 && (
                    <tr>
                      <td className="px-4 py-6 text-gray-500" colSpan={7}>
                        No submissions loaded yet.
                      </td>
                    </tr>
                  )}
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{item.created_at}</td>
                      <td className="px-4 py-3 text-gray-900 font-medium">{item.title}</td>
                      <td className="px-4 py-3 max-w-xs truncate">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-gray-700 hover:text-gray-900 underline"
                        >
                          {item.url}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{item.email || '-'}</td>
                      <td className="px-4 py-3 text-gray-700">{item.status || '-'}</td>
                      <td className="px-4 py-3 text-gray-700">{item.tags || '-'}</td>
                      <td className="px-4 py-3 text-gray-700 max-w-sm truncate">{item.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactSubmissions;
