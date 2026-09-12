import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Archive, ArrowLeft, Inbox, Loader2, LockKeyhole, LogOut, Mail, RefreshCw, Send } from 'lucide-react';

type Message = { id: string; thread_id: string; direction: 'inbound' | 'outbound'; name: string | null; email: string; inquiry_type: string | null; subject: string; body: string; status: string; created_at: string };

const api = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, { credentials: 'same-origin', ...options, headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) } });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Request failed');
  return data;
};

const AdminMailCenter = () => {
  const [auth, setAuth] = useState<'checking' | 'guest' | 'ok'>('checking');
  const [password, setPassword] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'inbox' | 'archived'>('inbox');
  const [reply, setReply] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setBusy(true); setError('');
    try {
      const data = await api('/api/admin-messages');
      const items = Array.isArray(data.items) ? data.items as Message[] : [];
      setMessages(items);
      setSelectedId((current) => current || items.find((item) => item.direction === 'inbound')?.id || null);
    } catch (err) {
      const text = err instanceof Error ? err.message : 'Unable to load mail';
      if (text === 'Unauthorized') setAuth('guest'); else setError(text);
    } finally { setBusy(false); }
  };

  useEffect(() => { api('/api/admin-session').then((data) => { setAuth(data.authenticated ? 'ok' : 'guest'); if (data.authenticated) void load(); }).catch(() => setAuth('guest')); }, []);

  const inbox = useMemo(() => messages.filter((item) => item.direction === 'inbound' && (filter === 'archived' ? item.status === 'archived' : item.status !== 'archived')), [messages, filter]);
  const selected = messages.find((item) => item.id === selectedId && item.direction === 'inbound') || inbox[0];
  const thread = selected ? messages.filter((item) => item.thread_id === selected.thread_id).sort((a, b) => Date.parse(a.created_at) - Date.parse(b.created_at)) : [];

  const login = async (event: FormEvent) => {
    event.preventDefault(); setBusy(true); setError('');
    try { await api('/api/admin-login', { method: 'POST', body: JSON.stringify({ password }) }); setPassword(''); setAuth('ok'); await load(); }
    catch (err) { setError(err instanceof Error ? err.message : 'Login failed'); }
    finally { setBusy(false); }
  };

  const choose = async (item: Message) => {
    setSelectedId(item.id); setReply('');
    if (item.status === 'unread') {
      await api('/api/admin-messages', { method: 'PATCH', body: JSON.stringify({ id: item.id, status: 'read' }) });
      setMessages((all) => all.map((message) => message.id === item.id ? { ...message, status: 'read' } : message));
    }
  };

  const archive = async () => {
    if (!selected) return;
    await api('/api/admin-messages', { method: 'PATCH', body: JSON.stringify({ id: selected.id, status: 'archived' }) });
    setMessages((all) => all.map((item) => item.id === selected.id ? { ...item, status: 'archived' } : item)); setSelectedId(null);
  };

  const send = async (event: FormEvent) => {
    event.preventDefault(); if (!selected || !reply.trim()) return;
    setBusy(true); setError('');
    try {
      await api('/api/admin-reply', { method: 'POST', body: JSON.stringify({ threadId: selected.thread_id, to: selected.email, subject: selected.subject.toLowerCase().startsWith('re:') ? selected.subject : `Re: ${selected.subject}`, message: reply.trim() }) });
      setReply(''); await load();
    } catch (err) { setError(err instanceof Error ? err.message : 'Reply could not be sent'); }
    finally { setBusy(false); }
  };

  const logout = async () => { await api('/api/admin-logout', { method: 'POST' }); setMessages([]); setAuth('guest'); };

  if (auth !== 'ok') return <div className="min-h-screen bg-[#111713] text-[#edf0e8] flex items-center justify-center px-5">
    <Helmet><title>Private Mail Desk</title><meta name="robots" content="noindex, nofollow, noarchive" /></Helmet>
    <div className="w-full max-w-md border border-[#344238] bg-[#19221c] p-8 sm:p-10 shadow-2xl shadow-black/30">
      <div className="h-12 w-12 bg-[#d9ff43] text-[#111713] flex items-center justify-center mb-10"><LockKeyhole size={22} /></div>
      <p className="text-xs tracking-[0.28em] uppercase text-[#9eab9f] mb-3">Owner access only</p><h1 className="font-serif text-4xl mb-3">Private mail desk</h1>
      <p className="text-[#9eab9f] leading-relaxed mb-8">Protected with a server-side session. This page is not linked from the public website.</p>
      {auth === 'checking' ? <Loader2 className="animate-spin text-[#d9ff43]" /> : <form onSubmit={login}><label className="block text-sm mb-2" htmlFor="owner-password">Owner password</label><input id="owner-password" type="password" autoFocus autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#111713] border border-[#415045] px-4 py-3 outline-none focus:border-[#d9ff43]" />{error && <p className="text-[#ff9c83] text-sm mt-3">{error}</p>}<button disabled={busy || !password} className="mt-5 w-full bg-[#d9ff43] text-[#111713] py-3 font-semibold disabled:opacity-50">Unlock mail</button></form>}
    </div>
  </div>;

  return <div className="min-h-screen bg-[#eef0e9] text-[#182019]">
    <Helmet><title>Mail Center — Arch AI Tool</title><meta name="robots" content="noindex, nofollow, noarchive" /></Helmet>
    <header className="h-16 bg-[#172019] text-white px-4 sm:px-7 flex items-center justify-between"><div className="flex items-center gap-3"><div className="bg-[#d9ff43] text-[#172019] p-2"><Mail size={18} /></div><div><p className="font-serif text-xl leading-none">Mail Center</p><p className="text-[10px] uppercase tracking-[.2em] text-[#9dac9f] mt-1">service@archaitool.com</p></div></div><div className="flex gap-2"><button onClick={load} className="p-2 hover:bg-white/10" aria-label="Refresh"><RefreshCw size={18} className={busy ? 'animate-spin' : ''} /></button><button onClick={logout} className="p-2 hover:bg-white/10" aria-label="Log out"><LogOut size={18} /></button></div></header>
    <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-[210px_350px_1fr]">
      <aside className="bg-[#172019] text-[#c6cec7] p-4"><button onClick={() => setFilter('inbox')} className={`w-full px-4 py-3 flex gap-3 ${filter === 'inbox' ? 'bg-[#d9ff43] text-[#172019]' : ''}`}><Inbox size={18} /> Inbox <span className="ml-auto">{messages.filter((m) => m.direction === 'inbound' && m.status === 'unread').length}</span></button><button onClick={() => setFilter('archived')} className={`w-full px-4 py-3 flex gap-3 ${filter === 'archived' ? 'bg-[#d9ff43] text-[#172019]' : ''}`}><Archive size={18} /> Archived</button><a href="/" className="mt-8 px-4 py-3 flex gap-3 text-sm"><ArrowLeft size={18} /> Public site</a></aside>
      <section className="border-r border-[#ced3ca] bg-[#f7f8f3]"><div className="px-5 py-4 border-b border-[#ced3ca]"><p className="text-xs uppercase tracking-[.18em] text-[#667069]">{filter}</p><p className="font-serif text-2xl">{inbox.length} conversations</p></div><div className="max-h-[calc(100vh-8.8rem)] overflow-y-auto">{inbox.map((item) => <button key={item.id} onClick={() => choose(item)} className={`w-full text-left p-5 border-b border-[#dfe2da] hover:bg-white ${selected?.id === item.id ? 'bg-white border-l-4 border-l-[#829d00]' : ''}`}><div className="flex justify-between gap-3"><p className={item.status === 'unread' ? 'font-bold truncate' : 'font-medium truncate'}>{item.name || item.email}</p><time className="text-[11px] text-[#788078]">{new Date(item.created_at).toLocaleDateString()}</time></div><p className="text-sm mt-1 truncate">{item.subject}</p><p className="text-xs text-[#788078] mt-2 line-clamp-2">{item.body}</p></button>)}{!inbox.length && <p className="p-8 text-sm text-[#788078]">No messages here.</p>}</div></section>
      <main className="bg-white min-w-0">{selected ? <div className="max-w-3xl mx-auto p-5 sm:p-9"><div className="flex justify-between gap-4 pb-6 border-b"><div><span className="text-[10px] uppercase tracking-[.18em] bg-[#edf2d3] px-2 py-1">{selected.inquiry_type || 'general'}</span><h1 className="font-serif text-3xl sm:text-4xl mt-4">{selected.subject}</h1><p className="text-sm text-[#667069] mt-3">{selected.name} · {selected.email}</p></div><button onClick={archive} className="p-2 border h-fit"><Archive size={18} /></button></div><div className="space-y-5 py-7">{thread.map((item) => <article key={item.id} className={item.direction === 'outbound' ? 'ml-8 bg-[#f0f3e7] p-5 border-l-2 border-[#829d00]' : ''}><p className="text-[11px] uppercase tracking-[.15em] text-[#788078] mb-3">{item.direction === 'outbound' ? 'You replied' : `${item.name || item.email} wrote`} · {new Date(item.created_at).toLocaleString()}</p><p className="whitespace-pre-wrap leading-7">{item.body}</p></article>)}</div><form onSubmit={send} className="border border-[#bbc2b8] p-5"><label htmlFor="reply" className="text-xs uppercase tracking-[.18em] text-[#667069]">Reply as service@archaitool.com</label><textarea id="reply" rows={7} value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Write your reply…" className="mt-3 w-full resize-y outline-none leading-7" />{error && <p className="text-red-700 text-sm mb-3">{error}</p>}<div className="flex justify-end"><button disabled={busy || !reply.trim()} className="bg-[#172019] text-white px-5 py-3 flex gap-2 disabled:opacity-40"><Send size={16} /> Send reply</button></div></form></div> : <div className="min-h-[60vh] flex items-center justify-center text-[#788078]">Select a conversation</div>}</main>
    </div>
  </div>;
};

export default AdminMailCenter;
