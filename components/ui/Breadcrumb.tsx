import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-1.5 text-xs text-stone-500 py-3 overflow-x-auto no-scrollbar">
      <Link
        href="/"
        className="hover:text-stone-900 transition flex items-center gap-1 shrink-0"
      >
        <Home className="w-3.5 h-3.5" />
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 text-stone-300 shrink-0" />
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="hover:text-stone-900 transition shrink-0 capitalize"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-stone-900 font-semibold truncate shrink-0 capitalize">
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
