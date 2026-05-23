import React from 'react';

type NewBadgeVariant = 'default' | 'floating' | 'inverted';

type NewBadgeProps = {
  className?: string;
  variant?: NewBadgeVariant;
};

const badgeClasses: Record<NewBadgeVariant, string> = {
  default:
    'border-black bg-white text-black shadow-[2px_2px_0_#111]',
  floating:
    'border-white bg-black text-white shadow-lg ring-2 ring-white',
  inverted:
    'border-white/80 bg-white text-black shadow-[2px_2px_0_rgba(255,255,255,0.45)]'
};

const dotClasses: Record<NewBadgeVariant, string> = {
  default: 'bg-black',
  floating: 'bg-white',
  inverted: 'bg-black'
};

export const NewBadge = ({ className = '', variant = 'default' }: NewBadgeProps) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-[4px] border px-2 py-0.5 text-[10px] font-bold uppercase leading-none ${badgeClasses[variant]} ${className}`}
    aria-label="New tool"
  >
    <span className={`h-1.5 w-1.5 rounded-full ${dotClasses[variant]}`} />
    <span>NEW</span>
  </span>
);
