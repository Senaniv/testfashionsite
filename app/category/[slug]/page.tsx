"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useLocale } from "@/hooks/useLocale";
import { getCategoryBySlug, getProductsByCategory, getCategories } from "@/lib/utils";
import ProductCard from "@/components/products/ProductCard";
import Breadcrumb from "@/components/ui/Breadcrumb";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const category = getCategoryBySlug(slug);
  const { locale, t } = useLocale();

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(category.id);
  const allCategories = getCategories();

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: t("nav.categories"), href: "/products" },
            { label: category.name[locale] },
          ]}
        />

        {/* Category Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-[#EFE9E2] p-8 sm:p-14 mb-10 shadow-xs">
          <div className="relative z-10 max-w-xl space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C4A882]">
              {t("categories.subtitle")}
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A]">
              {category.name[locale]}
            </h1>
            <p className="text-sm text-stone-600">
              {products.length} {t("products.results")}
            </p>
          </div>

          <img
            src={category.image}
            alt={category.name[locale]}
            className="absolute right-0 top-0 bottom-0 w-1/2 sm:w-2/5 object-cover opacity-90 mix-blend-multiply"
          />
        </div>

        {/* Category Pill Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-6">
          <Link
            href="/products"
            className="px-4 py-2 rounded-full text-xs font-semibold border border-stone-300 bg-white hover:bg-stone-50 transition shrink-0"
          >
            {t("products.allProducts")}
          </Link>
          {allCategories.map((c) => (
            <Link
              key={c.id}
              href={`/category/${c.slug}`}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition shrink-0 ${
                c.slug === slug
                  ? "bg-[#1A1A1A] text-white"
                  : "bg-white border border-stone-300 text-stone-700 hover:bg-stone-50"
              }`}
            >
              {c.name[locale]}
            </Link>
          ))}
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-stone-200">
            <p className="text-stone-500 text-sm mb-4">
              {t("products.noProducts")}
            </p>
            <Link
              href="/products"
              className="px-6 py-2.5 bg-[#1A1A1A] text-white rounded-full text-xs font-semibold hover:bg-stone-800 transition inline-block"
            >
              {t("products.allProducts")}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
