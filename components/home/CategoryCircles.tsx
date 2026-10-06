"use client";

import React from "react";
import Link from "next/link";
import { useLocale } from "@/hooks/useLocale";
import { getCategories } from "@/lib/utils";

export default function CategoryCircles() {
  const { locale } = useLocale();
  const categories = getCategories();

  return (
    <section className="bg-white py-8 border-b border-stone-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start sm:justify-center space-x-6 sm:space-x-8 overflow-x-auto no-scrollbar py-2">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="flex flex-col items-center group shrink-0 space-y-2"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden p-0.5 border-2 border-transparent group-hover:border-[#C4A882] transition-all duration-300 shadow-xs">
                <div className="w-full h-full rounded-full overflow-hidden bg-stone-100">
                  <img
                    src={cat.image}
                    alt={cat.name[locale]}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              <span className="text-xs font-medium text-stone-700 group-hover:text-black tracking-wide">
                {cat.name[locale]}
              </span>
            </Link>
          ))}

          {/* SALE Circle */}
          <Link
            href="/products?sale=true"
            className="flex flex-col items-center group shrink-0 space-y-2"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden p-0.5 border-2 border-transparent group-hover:border-rose-500 transition-all duration-300 shadow-xs">
              <div className="w-full h-full rounded-full bg-[#1A1A1A] flex items-center justify-center text-white font-bold text-xs sm:text-sm tracking-widest group-hover:bg-rose-600 transition-colors">
                SALE
              </div>
            </div>
            <span className="text-xs font-bold text-rose-600 tracking-wide">
              Sale %
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
