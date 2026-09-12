import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Archive, ArrowLeft, CheckCircle2, Inbox, Loader2, LockKeyhole, LogOut, Mail, Pencil, RefreshCw, Send, SendHorizontal } from 'lucide-react';

type Message = { id: string; thread_id: string; direction: 'inbound' | 'outbound'; name: string | null; email: string; inquiry_type: string | null; subject: string; body: string; status: string; created_at: string };
type View = 'compose' | 'inbox' | 'sent' | 'archived';

const api = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, { credentials: 'same-origin', ...options, headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) } });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `Request failed (${response.status})`);
  return data;
};

const AdminMailCenter = () => {
  const [auth, setAuth] = useState<'checking' | 'guest' | 'ok'>('checking');
  const [password, setPassword] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [view, setView] = useState<View>('compose');
  const [reply, setReply] = useState('');
  const [compose, setCompose] = useState({ to: '', subject: '', message: '' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const load = async () => {
    setBusy(true); setError('');
    try {
      const data = await api('/api/admin-messages');
      setMessages(Array.isArray(data.items) ? data.items as Message[] : []);
    } catch (err) {
      const text = err instanceof Error ? err.message : 'Unable to load mail';
      if (text === 'Unauthorized') setAuth('guest'); else setError(text);
    } finally { setBusy(false); }
  };

  useEffect(() => {
    api('/api/admin-session').then((data) => {
      setAuth(data.authenticated ? 'ok' : 'guest');
      if (data.authenticated) void load();
    }).catch(() => setAuth('guest'));
  }, []);

  const list = useMemo(() => messages.filter((item) => {
    if (view === 'sent') return item.direction === 'outbound';
    if (view === 'archived') return item.direction === 'inbound' && item.status === 'archived';
    return item.direction === 'inbound' && item.status !== 'archived';
  }), [messages, view]);

  const contacts = useMemo(() => Array.from(new Set(messages.map((item) => item.email))).sort(), [messages]);
  const selected = messages.find((item) => item.id === selectedId) || list[0];
  const thread = selected ? messages.filter((item) => item.thread_id === selected.thread_id).sort((a, b) => Date.parse(a.created_at) - Date.parse(b.created_at)) : [];

  const login = async (event: FormEvent) => {
    event.preventDefault(); setBusy(true); setError('');
    try { await api('/api/admin-login', { method: 'POST', body: JSON.stringify({ password }) }); setPassword(''); setAuth('ok'); await load(); }
    catch (err) { setError(err instanceof Error ? err.message : 'Login failed'); }
    finally { setBusy(false); }
  };

  const selectView = (next: View) => { setView(next); setSelectedId(null); setError(''); setNotice(''); };

  const choose = async (item: Message) => {
    setSelectedId(item.id); setReply(''); setNotice('');
    if (item.direction === 'inbound' && item.status === 'unread') {
      await api('/api/admin-messages', { method: 'PATCH', body: JSON.stringify({ id: item.id, status: 'read' }) });
      setMessages((all) => all.map((message) => message.id === item.id ? { ...message, status: 'read' } : message));
    }
  };

  const archive = async () => {
    if (!selected || selected.direction !== 'inbound') return;
    await api('/api/admin-messages', { method: 'PATCH', body: JSON.stringify({ id: selected.id, status: 'archived' }) });
    setMessages((all) => all.map((item) => item.id === selected.id ? { ...item, status: 'archived' } : item)); setSelectedId(null);
  };

  const sendMail = async (payload: { threadId?: string; to: string; subject: string; message: string }) => {
    setBusy(true); setError(''); setNotice('');
    try {
      await api('/api/admin-reply', { method: 'POST', body: JSON.stringify(payload) });
      setNotice(`Email sent to ${payload.to}`); await load(); return true;
    } catch (err) { setError(err instanceof Error ? err.message : 'Email could not be sent'); return false; }
    finally { setBusy(false); }
  };

  const submitCompose = async (event: FormEvent) => {
    event.preventDefault();
    if (await sendMail(compose)) setCompose({ to: '', subject: '', message: '' });
  };

  const submitReply = async (event: FormEvent) => {
    event.preventDefault(); if (!selected || !reply.trim()) return;
    const sent = await sendMail({ threadId: selected.thread_id, to: selected.email, subject: selected.subject.toLowerCase().startsWith('re:') ? selected.subject : `Re: ${selected.subject}`, message: reply.trim() });
    if (sent) setReply('');
  };

  const logout = async () => { await api('/api/admin-logout', { method: 'POST' }); setMessages([]); setAuth('guest'); };

  if (auth !== 'ok') return <div className="min-h-screen bg-gray-100 flex items-center justify-center px-5">
    <Helmet><title>Private Mail Center</title><meta name="robots" content="noindex, nofollow, noarchive" /></Helmet>
    <div className="w-full max-w-md bg-white border border-gray-200 shadow-xl p-8 sm:p-10">
      <img src="/logo-navbar.webp" alt="Arch AI Tool" className="h-12 mb-10" />
      <div className="h-11 w-11 bg-black text-white flex items-center justify-center mb-7"><LockKeyhole size={20} /></div>
      <p className="text-xs tracking-[0.22em] uppercase text-gray-500 mb-3">Owner access only</p><h1 className="text-3xl font-bold text-black mb-3">Private mail center</h1>
      <p className="text-gray-600 leading-relaxed mb-8">Sign in to write and manage email from service@archaitool.com.</p>
      {auth === 'checking' ? <Loader2 className="animate-spin" /> : <form onSubmit={login}><label className="block text-sm font-medium mb-2" htmlFor="owner-password">Owner password</label><input id="owner-password" type="password" autoFocus autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black" />{error && <p className="text-red-700 text-sm mt-3" role="alert">{error}</p>}<button disabled={busy || !password} className="mt-5 w-full bg-black text-white py-3 font-medium hover:bg-gray-800 disabled:opacity-50">Unlock mail center</button></form>}
    </div>
  </div>;

  const navClass = (item: View) => `w-full px-4 py-3 flex items-center gap-3 text-sm font-medium transition-colors ${view === item ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'}`;

  return <div className="min-h-screen bg-gray-50 text-black">
    <Helmet><title>Mail Center — Arch AI Tool</title><meta name="robots" content="noindex, nofollow, noarchive" /></Helmet>
    <header className="h-16 bg-white border-b border-black px-4 sm:px-8 flex items-center justify-between"><div className="flex items-center gap-4"><img src="/logo-navbar.webp" alt="Arch AI Tool" className="h-11" /><div className="hidden sm:block border-l border-gray-300 pl-4"><p className="font-semibold leading-none">Mail Center</p><p className="text-[10px] tracking-[.16em] text-gray-500 mt-1">SERVICE@ARCHAITOOL.COM</p></div></div><div className="flex gap-1"><button onClick={load} className="p-2.5 hover:bg-gray-100" aria-label="Refresh"><RefreshCw size={18} className={busy ? 'animate-spin' : ''} /></button><button onClick={logout} className="p-2.5 hover:bg-gray-100" aria-label="Log out"><LogOut size={18} /></button></div></header>
    <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-[220px_1fr]">
      <aside className="bg-white border-r border-gray-200 p-4 flex flex-col"><button onClick={() => selectView('compose')} className="w-full bg-black text-white px-4 py-3.5 flex items-center justify-center gap-2 font-medium mb-5 hover:bg-gray-800"><Pencil size={17} /> Write email</button><button onClick={() => selectView('inbox')} className={navClass('inbox')}><Inbox size={18} /> Inbox <span className="ml-auto">{messages.filter((item) => item.direction === 'inbound' && item.status === 'unread').length}</span></button><button onClick={() => selectView('sent')} className={navClass('sent')}><SendHorizontal size={18} /> Sent</button><button onClick={() => selectView('archived')} className={navClass('archived')}><Archive size={18} /> Archived</button><a href="/" className="mt-auto px-4 py-3 flex items-center gap-3 text-sm text-gray-600 hover:text-black"><ArrowLeft size={18} /> Public site</a></aside>
      <main className="min-w-0">
        {view === 'compose' ? <section className="max-w-6xl mx-auto px-5 py-10 sm:p-12">
          <div className="border-b border-gray-300 pb-8 mb-8"><p className="text-xs tracking-[.2em] uppercase text-gray-500 mb-3">Private owner tool · Plunk</p><h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Write an email</h1><p className="text-gray-600 mt-3">Send directly from service@archaitool.com through your verified Plunk domain.</p></div>
          <div className="grid xl:grid-cols-[1fr_290px] gap-6"><form onSubmit={submitCompose} className="bg-white border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6"><div><label htmlFor="compose-to" className="block text-sm font-semibold mb-2">Recipient</label><input id="compose-to" list="mail-contacts" type="email" required value={compose.to} onChange={(event) => setCompose((current) => ({ ...current, to: event.target.value }))} placeholder="customer@example.com" className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black" /><datalist id="mail-contacts">{contacts.map((email) => <option value={email} key={email} />)}</datalist><p className="text-xs text-gray-500 mt-2">Enter any email address or choose a previous contact.</p></div><div><label htmlFor="compose-subject" className="block text-sm font-semibold mb-2">Subject</label><input id="compose-subject" required maxLength={240} value={compose.subject} onChange={(event) => setCompose((current) => ({ ...current, subject: event.target.value }))} className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black" /></div><div><div className="flex justify-between mb-2"><label htmlFor="compose-message" className="text-sm font-semibold">Message</label><span className="text-xs text-gray-500">{compose.message.length} / 10,000</span></div><textarea id="compose-message" required maxLength={10000} rows={13} value={compose.message} onChange={(event) => setCompose((current) => ({ ...current, message: event.target.value }))} placeholder="Write your message…" className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black resize-y leading-7" /></div>{error && <p className="text-red-700 text-sm" role="alert">{error}</p>}{notice && <p className="text-green-700 text-sm flex items-center gap-2" role="status"><CheckCircle2 size={16} /> {notice}</p>}<button disabled={busy || !compose.to || !compose.subject || !compose.message} className="bg-black text-white px-6 py-3 font-medium inline-flex items-center gap-2 hover:bg-gray-800 disabled:opacity-40"><Send size={17} /> {busy ? 'Sending…' : 'Send email'}</button></form>
            <aside className="bg-white border border-gray-200 p-7 h-fit"><Mail size={24} /><h2 className="text-xl font-bold mt-6 mb-4">Before sending</h2><ul className="space-y-4 text-sm text-gray-600 leading-6"><li>Confirm the recipient and subject.</li><li>Email is sent immediately through Plunk and cannot be recalled.</li><li>A copy is saved automatically in Sent.</li></ul></aside></div>
        </section> : <section className="grid xl:grid-cols-[360px_1fr] min-h-[calc(100vh-4rem)]"><div className="bg-white border-r border-gray-200"><div className="px-6 py-5 border-b"><p className="text-xs uppercase tracking-[.18em] text-gray-500">{view}</p><p className="text-2xl font-bold mt-1">{list.length} messages</p></div>{list.map((item) => <button key={item.id} onClick={() => choose(item)} className={`w-full text-left p-5 border-b hover:bg-gray-50 ${selected?.id === item.id ? 'bg-gray-100 border-l-4 border-l-black' : ''}`}><div className="flex justify-between gap-3"><p className={item.status === 'unread' ? 'font-bold truncate' : 'font-medium truncate'}>{item.name || item.email}</p><time className="text-[11px] text-gray-500 shrink-0">{new Date(item.created_at).toLocaleDateString()}</time></div><p className="text-sm mt-1 truncate">{item.subject}</p><p className="text-xs text-gray-500 mt-2 line-clamp-2">{item.body}</p></button>)}{!list.length && <p className="p-8 text-sm text-gray-500">No messages here.</p>}</div>
          <div className="bg-gray-50">{selected ? <div className="max-w-3xl mx-auto p-6 sm:p-10"><div className="flex justify-between gap-4 pb-6 border-b"><div><p className="text-xs uppercase tracking-[.15em] text-gray-500">{selected.direction === 'outbound' ? 'Sent message' : selected.inquiry_type || 'Email'}</p><h1 className="text-3xl font-bold mt-3">{selected.subject}</h1><p className="text-sm text-gray-600 mt-3">{selected.name || selected.email} · {selected.email}</p></div>{selected.direction === 'inbound' && <button onClick={archive} className="p-2 border border-gray-300 bg-white h-fit" title="Archive"><Archive size={18} /></button>}</div><div className="space-y-5 py-7">{thread.map((item) => <article key={item.id} className={item.direction === 'outbound' ? 'ml-6 bg-white border border-gray-200 p-5' : ''}><p className="text-[11px] uppercase tracking-[.13em] text-gray-500 mb-3">{item.direction === 'outbound' ? 'You sent' : `${item.name || item.email} wrote`} · {new Date(item.created_at).toLocaleString()}</p><p className="whitespace-pre-wrap leading-7">{item.body}</p></article>)}</div>{selected.direction === 'inbound' && <form onSubmit={submitReply} className="bg-white border border-gray-200 p-5"><label htmlFor="reply" className="text-xs uppercase tracking-[.16em] text-gray-500">Reply as service@archaitool.com</label><textarea id="reply" rows={7} value={reply} onChange={(event) => setReply(event.target.value)} placeholder="Write your reply…" className="mt-3 w-full resize-y outline-none leading-7" />{error && <p className="text-red-700 text-sm mb-3">{error}</p>}<div className="flex justify-end"><button disabled={busy || !reply.trim()} className="bg-black text-white px-5 py-3 flex items-center gap-2 disabled:opacity-40"><Send size={16} /> Send reply</button></div></form>}</div> : <div className="min-h-[60vh] flex items-center justify-center text-gray-500">Select a message</div>}</div></section>}
      </main>
    </div>
  </div>;
};

export default AdminMailCenter;
