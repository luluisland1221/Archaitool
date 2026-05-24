import React from 'react';

type NewBadgeVariant = 'default' | 'floating' | 'inverted';

type NewBadgeProps = {
  className?: string;
  variant?: NewBadgeVariant;
};

const badgeClasses: Record<NewBadgeVariant, string> = {
  default:
    'border-amber-200 bg-amber-50 text-amber-950 shadow-[0_4px_12px_rgba(180,120,0,0.16)]',
  floating:
    'border-amber-200 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-amber-950 shadow-[0_10px_24px_rgba(180,120,0,0.28)] ring-1 ring-white/70',
  inverted:
    'border-amber-200 bg-amber-100 text-amber-950 shadow-[0_4px_12px_rgba(180,120,0,0.16)]'
};

const dotClasses: Record<NewBadgeVariant, string> = {
  default: 'bg-amber-700',
  floating: 'bg-amber-950',
  inverted: 'bg-amber-700'
};

export const NewBadge = ({ className = '', variant = 'default' }: NewBadgeProps) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase leading-none ${badgeClasses[variant]} ${className}`}
    aria-label="New tool"
  >
    <span className={`h-1.5 w-1.5 rounded-full ${dotClasses[variant]}`} />
    <span>NEW</span>
  </span>
);
