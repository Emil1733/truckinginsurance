import Link from 'next/link';

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
        <Link href="/" aria-label="Truck Coverage Experts home" className="inline-flex min-w-0 items-center gap-3">
          <span aria-hidden="true" className="h-9 w-[3px] shrink-0 bg-safety-orange" />
          <span className="leading-none">
            <span className="block font-mono text-[0.6rem] font-medium uppercase tracking-[0.3em] text-slate-400 sm:text-[0.64rem]">
              Truck Coverage
            </span>
            <span className="mt-1.5 block font-display text-lg font-bold uppercase leading-none tracking-[0.04em] text-white sm:text-xl">
              Experts
            </span>
          </span>
        </Link>
        <div className="flex shrink-0 items-center gap-3">
          {statusLabel && <span className="hidden rounded-full border border-slate-700 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-slate-400 sm:inline-flex">{statusLabel}</span>}
          <Link href={ctaHref} className="rounded-lg bg-safety-orange px-3.5 py-2.5 text-xs font-bold text-industrial-900 transition-colors hover:bg-safety-yellow sm:px-4 sm:text-sm">
            {ctaLabel}
          </Link>
        </div>
      </div>
    </header>
  );
}
