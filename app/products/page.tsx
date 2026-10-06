"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, ArrowUpDown, ChevronDown } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { getProducts, getCategories, Product } from "@/lib/utils";
import ProductCard from "@/components/products/ProductCard";
import Breadcrumb from "@/components/ui/Breadcrumb";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialSaleOnly = searchParams.get("sale") === "true";
  const initialFilter = searchParams.get("filter") || "";

  const { t, locale } = useLocale();
  const allProducts = getProducts();
  const categories = getCategories();

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [saleOnly, setSaleOnly] = useState(initialSaleOnly);
  const [newOnly, setNewOnly] = useState(initialFilter === "new");
  const [sortBy, setSortBy] = useState<"newest" | "priceLow" | "priceHigh" | "popular">("popular");
  const [priceRange, setPriceRange] = useState<number>(200);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((p) => {
        if (selectedCategory !== "all" && p.category !== selectedCategory) {
          return false;
        }
        if (saleOnly && !p.salePrice) {
          return false;
        }
        if (newOnly && !p.isNewArrival) {
          return false;
        }
        const effectivePrice = p.salePrice ?? p.price;
        if (effectivePrice > priceRange) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        const priceA = a.salePrice ?? a.price;
        const priceB = b.salePrice ?? b.price;
        if (sortBy === "priceLow") return priceA - priceB;
        if (sortBy === "priceHigh") return priceB - priceA;
        if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return b.rating - a.rating;
      });
  }, [allProducts, selectedCategory, saleOnly, newOnly, priceRange, sortBy]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSaleOnly(false);
    setNewOnly(false);
    setPriceRange(200);
    setSortBy("popular");
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: t("nav.products") }]} />

        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-stone-200 gap-4">
          <div>
            <h1 className="font-heading text-3xl sm:text-4xl text-[#1A1A1A]">
              {t("products.allProducts")}
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              {filteredProducts.length} {t("products.results")}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-stone-300 rounded-full text-xs font-medium text-stone-800 shadow-xs cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#C4A882]" />
              <span>{t("products.filters")}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="relative inline-block">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label={t("products.sortBy")}
                className="appearance-none bg-white border border-stone-300 text-stone-800 text-xs rounded-full pl-4 pr-9 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#C4A882] cursor-pointer shadow-xs font-medium"
              >
                <option value="popular">{t("products.popular")}</option>
                <option value="newest">{t("products.newest")}</option>
                <option value="priceLow">{t("products.priceLow")}</option>
                <option value="priceHigh">{t("products.priceHigh")}</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-stone-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Main Grid Layout with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block space-y-6 bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs h-fit sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-heading text-lg text-stone-900">
                {t("products.filters")}
              </h3>
              <button
                onClick={resetFilters}
                className="text-xs text-stone-500 hover:text-black underline cursor-pointer"
              >
                {t("products.clearFilters")}
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-800 block">
                {t("products.category")}
              </label>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left text-xs py-1.5 px-2.5 rounded-lg transition cursor-pointer flex items-center justify-between ${
                    selectedCategory === "all"
                      ? "bg-[#1A1A1A] text-white font-medium"
                      : "text-stone-600 hover:bg-stone-100"
                  }`}
                >
                  <span>{t("products.allProducts")}</span>
                  <span className="text-[10px] opacity-70">
                    {allProducts.length}
                  </span>
                </button>
                {categories.map((cat) => {
                  const count = allProducts.filter((p) => p.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left text-xs py-1.5 px-2.5 rounded-lg transition cursor-pointer flex items-center justify-between ${
                        selectedCategory === cat.id
                          ? "bg-[#1A1A1A] text-white font-medium"
                          : "text-stone-600 hover:bg-stone-100"
                      }`}
                    >
                      <span>{cat.name[locale]}</span>
                      <span className="text-[10px] opacity-70">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-2 pt-2 border-t border-stone-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-800">
                  {t("products.priceRange")}
                </label>
                <span className="text-xs font-semibold text-stone-900">
                  ₼0 - ₼{priceRange}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="200"
                step="5"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-[#1A1A1A] cursor-pointer"
              />
            </div>

            {/* Quick Toggles */}
            <div className="space-y-2.5 pt-2 border-t border-stone-100">
              <label className="flex items-center gap-2.5 text-xs text-stone-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={saleOnly}
                  onChange={(e) => setSaleOnly(e.target.checked)}
                  className="rounded text-[#1A1A1A] focus:ring-0 w-4 h-4 cursor-pointer"
                />
                <span className="font-semibold text-rose-600">
                  {t("nav.sale")} % ({allProducts.filter((p) => p.salePrice).length})
                </span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-stone-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={newOnly}
                  onChange={(e) => setNewOnly(e.target.checked)}
                  className="rounded text-[#1A1A1A] focus:ring-0 w-4 h-4 cursor-pointer"
                />
                <span>
                  {t("nav.newArrivals")} ({allProducts.filter((p) => p.isNewArrival).length})
                </span>
              </label>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-stone-200">
                <p className="text-stone-500 text-sm mb-4">
                  {t("products.noProducts")}
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-[#1A1A1A] text-white rounded-full text-xs font-semibold hover:bg-stone-800 transition"
                >
                  {t("products.clearFilters")}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-slideInRight z-50">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <h3 className="font-heading text-lg text-stone-900">
                  {t("products.filters")}
                </h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 rounded-full text-stone-500 hover:text-black"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories in Drawer */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-800">
                  {t("products.category")}
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`text-xs py-2 px-3 rounded-lg border text-center transition ${
                      selectedCategory === "all"
                        ? "bg-[#1A1A1A] text-white border-black"
                        : "border-stone-200 text-stone-700"
                    }`}
                  >
                    {t("products.allProducts")}
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.id)}
                      className={`text-xs py-2 px-3 rounded-lg border text-center transition ${
                        selectedCategory === c.id
                          ? "bg-[#1A1A1A] text-white border-black"
                          : "border-stone-200 text-stone-700"
                      }`}
                    >
                      {c.name[locale]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2 pt-2 border-t border-stone-200">
                <div className="flex justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider">
                    {t("products.priceRange")}
                  </span>
                  <span className="font-bold">₼0 - ₼{priceRange}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="5"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-[#1A1A1A]"
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-3 pt-2 border-t border-stone-200 text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={saleOnly}
                    onChange={(e) => setSaleOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-black"
                  />
                  <span className="text-rose-600 font-semibold">{t("nav.sale")} %</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newOnly}
                    onChange={(e) => setNewOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-black"
                  />
                  <span>{t("nav.newArrivals")}</span>
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-200 flex gap-3">
              <button
                onClick={resetFilters}
                className="flex-1 py-3 text-xs font-semibold border border-stone-300 rounded-full"
              >
                {t("products.clearFilters")}
              </button>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="flex-1 py-3 text-xs font-semibold bg-[#1A1A1A] text-white rounded-full"
              >
                Tətbiq Et ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm">Yüklənir...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
