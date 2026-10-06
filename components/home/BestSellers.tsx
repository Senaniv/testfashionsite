"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { getBestSellers } from "@/lib/utils";
import ProductCard from "@/components/products/ProductCard";

export default function BestSellers() {
  const { t } = useLocale();
  const bestSellers = getBestSellers().slice(0, 6);

  return (
    <section className="py-14 bg-white border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-500">
              {t("bestSellers.subtitle")}
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-[#1A1A1A] mt-1">
              {t("bestSellers.title")}
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-700 hover:text-black hover:translate-x-1 transition-all"
          >
            <span>{t("bestSellers.viewAll")}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 6 Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
