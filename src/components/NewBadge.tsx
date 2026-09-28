import React from 'react';

type NewBadgeVariant = 'default' | 'floating' | 'inverted';

type NewBadgeProps = {
  className?: string;
  variant?: NewBadgeVariant;
};

const badgeClasses: Record<NewBadgeVariant, string> = {
  default:
    'border-violet-200/80 bg-white/95 text-violet-700 shadow-[0_5px_18px_rgba(109,40,217,0.14)]',
  floating:
    'border-white/70 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-rose-500 text-white shadow-[0_10px_28px_rgba(124,58,237,0.35)] ring-1 ring-black/5',
  inverted:
    'border-violet-300/50 bg-violet-500/15 text-violet-100 shadow-[0_5px_18px_rgba(109,40,217,0.2)]'
};

const dotClasses: Record<NewBadgeVariant, string> = {
  default: 'bg-violet-500',
  floating: 'bg-white shadow-[0_0_0_3px_rgba(255,255,255,0.18)]',
  inverted: 'bg-violet-200'
};

export const NewBadge = ({ className = '', variant = 'default' }: NewBadgeProps) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-extrabold uppercase leading-none tracking-[0.14em] backdrop-blur-md ${badgeClasses[variant]} ${className}`}
    aria-label="New tool"
  >
    <span className={`h-1.5 w-1.5 rounded-full ${dotClasses[variant]}`} />
    <span>NEW</span>
  </span>
);
