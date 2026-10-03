import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

type SiteHeaderProps = {
  ctaHref?: string;
  ctaLabel?: string;
  statusLabel?: string;
};

/** Shared site-wide header so the brand mark, spacing, and primary action stay consistent. */
export function SiteHeader({
  ctaHref = '/quote',
  ctaLabel = 'Request a quote review',
  statusLabel,
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/90 bg-slate-950/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" aria-label="Truck Coverage Experts home" className="inline-flex min-w-0 items-center gap-2.5">
          <ShieldCheck className="h-7 w-7 shrink-0 text-blue-400" aria-hidden="true" />
          <span className="leading-none">
            <span className="block text-[0.62rem] font-black tracking-[0.18em] text-slate-400 sm:text-[0.68rem]">TRUCK COVERAGE</span>
            <span className="mt-1 block text-sm font-black tracking-[0.08em] text-white sm:text-base">EXPERTS</span>
          </span>
        </Link>
        <div className="flex shrink-0 items-center gap-3">
          {statusLabel && <span className="hidden rounded-full border border-slate-700 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-slate-400 sm:inline-flex">{statusLabel}</span>}
          <Link href={ctaHref} className="rounded-lg bg-blue-600 px-3.5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-blue-500 sm:px-4 sm:text-sm">
            {ctaLabel}
          </Link>
        </div>
      </div>
    </header>
  );
}
