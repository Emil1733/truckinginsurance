import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-industrial-500 mb-6 font-mono uppercase tracking-wider">
      <Link href="/" className="hover:text-white transition-colors">
        <Home className="w-4 h-4" />
      </Link>
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center gap-2">
          <ChevronRight className="w-3 h-3 text-industrial-700" />
          <Link 
            href={item.href} 
            className={`hover:text-white transition-colors ${index === items.length - 1 ? 'text-silver font-bold pointer-events-none' : ''}`}
            aria-current={index === items.length - 1 ? 'page' : undefined}
          >
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}
