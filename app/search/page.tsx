"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { searchProducts } from "@/lib/utils";
import ProductCard from "@/components/products/ProductCard";
import Breadcrumb from "@/components/ui/Breadcrumb";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const { t, locale } = useLocale();

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState(searchProducts(initialQuery, locale));

  useEffect(() => {
    setResults(searchProducts(query, locale));
  }, [query, locale]);

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: t("search.title") }]} />

        {/* Search Input Box */}
        <div className="max-w-2xl mx-auto my-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("search.placeholder")}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-stone-200 rounded-full text-sm text-stone-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C4A882]"
            />
          </div>
          <p className="text-xs text-stone-500 text-center mt-3">
            {results.length} {t("search.results")}
          </p>
        </div>

        {/* Results Grid */}
        {results.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/80 max-w-md mx-auto shadow-xs">
            <p className="text-stone-500 text-sm">{t("search.noResults")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm">Yüklənir...</div>}>
      <SearchContent />
    </Suspense>
  );
}
