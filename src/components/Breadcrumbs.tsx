import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav aria-label="Breadcrumb" className="flex mb-8">
      <ol className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-slate-500">
        <li className="flex items-center">
          <Link 
            href="/" 
            className="hover:text-blue-500 transition-colors flex items-center"
          >
            <Home className="w-3 h-3 mr-2" />
            Home
          </Link>
        </li>
        
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="w-3 h-3 mx-2 text-slate-700" />
            {index === items.length - 1 ? (
              <span className="text-slate-300 font-black">{item.label}</span>
            ) : (
              <Link 
                href={item.href} 
                className="hover:text-blue-500 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
