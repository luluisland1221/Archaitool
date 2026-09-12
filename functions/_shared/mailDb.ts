/// <reference types="@cloudflare/workers-types" />

export type MailEnv = {
  DB: D1Database;
  PLUNK_API_KEY?: string;
  MAIL_FROM?: string;
  MAIL_FROM_NAME?: string;
};

export const ensureMailSchema = async (db: D1Database) => {
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id TEXT PRIMARY KEY,
      thread_id TEXT NOT NULL,
      direction TEXT NOT NULL CHECK(direction IN ('inbound', 'outbound')),
      name TEXT,
      email TEXT NOT NULL,
      inquiry_type TEXT,
      subject TEXT NOT NULL,
      body TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'unread',
      provider_id TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `).run();
  await db.prepare('CREATE INDEX IF NOT EXISTS idx_contact_messages_thread ON contact_messages(thread_id, created_at)').run();
  await db.prepare('CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status, created_at)').run();
};

export const cleanText = (value: unknown, maxLength: number) =>
  String(value ?? '').trim().replace(/\0/g, '').slice(0, maxLength);
