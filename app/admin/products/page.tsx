"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Trash2, Edit, ExternalLink, Check, AlertCircle } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { getProducts, getCategories, Product, formatPrice } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

export default function AdminProductsPage() {
  const { t, locale } = useLocale();
  const { showToast } = useToast();

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");
  const categories = getCategories();

  useEffect(() => {
    // Check if custom products exist in localStorage
    const saved = localStorage.getItem("lunora-admin-products");
    if (saved) {
      try {
        setProducts(JSON.parse(saved));
        return;
      } catch (e) {}
    }
    setProducts(getProducts());
  }, []);

  const handleDelete = (id: string, name: string) => {
    if (confirm(`"${name}" məhsulunu silmək istədiyinizə əminsiniz?`)) {
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      localStorage.setItem("lunora-admin-products", JSON.stringify(updated));
      showToast("Məhsul uğurla silindi", "info");
    }
  };

  const toggleStock = (id: string) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, inStock: !p.inStock } : p
    );
    setProducts(updated);
    localStorage.setItem("lunora-admin-products", JSON.stringify(updated));
    showToast("Stok statusu yeniləndi", "success");
  };

  const filtered = products.filter((p) => {
    const matchSearch =
      p.name.az.toLowerCase().includes(search.toLowerCase()) ||
      p.name.en.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCat === "all" || p.category === selectedCat;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl text-stone-900 font-bold">
            {t("admin.products")}
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Bütün məhsulların siyahısı və idarəedilməsi ({filtered.length} məhsul)
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A1A1A] hover:bg-stone-800 text-white rounded-xl text-xs font-semibold tracking-wider transition shadow-xs w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>{t("admin.addProduct")}</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("admin.searchProducts")}
            className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#C4A882]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="bg-stone-50 border border-stone-200 text-stone-700 text-xs rounded-xl px-3 py-2 focus:outline-none cursor-pointer w-full sm:w-auto"
          >
            <option value="all">Bütün kateqoriyalar</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name[locale]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table (Desktop) & Card List (Mobile) */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden">
        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-600">
            <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-200">
              <tr>
                <th className="py-3.5 px-4">Şəkil</th>
                <th className="py-3.5 px-4">{t("admin.productName")}</th>
                <th className="py-3.5 px-4">{t("products.category")}</th>
                <th className="py-3.5 px-4">{t("admin.price")}</th>
                <th className="py-3.5 px-4">{t("admin.stock")}</th>
                <th className="py-3.5 px-4 text-right">{t("admin.actions")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((product) => {
                const category = categories.find((c) => c.id === product.category);
                return (
                  <tr key={product.id} className="hover:bg-stone-50/60 transition">
                    <td className="py-3 px-4">
                      <div className="w-11 h-14 rounded-lg overflow-hidden bg-stone-100">
                        <img
                          src={product.images[0]}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-stone-900">
                        {product.name[locale]}
                      </div>
                      <div className="text-[11px] text-stone-400">
                        {product.name[locale === "az" ? "en" : "az"]}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-stone-600">
                      {category ? category.name[locale] : product.category}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-stone-900">
                        {formatPrice(product.salePrice ?? product.price)}
                      </span>
                      {product.salePrice && (
                        <span className="text-[10px] text-stone-400 line-through ml-1.5">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleStock(product.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition ${
                          product.inStock
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                            : "bg-rose-100 text-rose-800 hover:bg-rose-200"
                        }`}
                      >
                        {product.inStock ? "Stokda var" : "Bitib"}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/products/${product.id}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition"
                          title="Saytda bax"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() =>
                            handleDelete(product.id, product.name[locale])
                          }
                          className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                          title="Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Cards */}
        <div className="md:hidden divide-y divide-stone-100 p-4 space-y-3">
          {filtered.map((product) => (
            <div key={product.id} className="pt-3 first:pt-0 flex gap-3 items-center">
              <div className="w-14 h-18 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                <img
                  src={product.images[0]}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-semibold text-stone-900 truncate">
                  {product.name[locale]}
                </h4>
                <div className="text-xs font-bold text-stone-900 mt-0.5">
                  {formatPrice(product.salePrice ?? product.price)}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => toggleStock(product.id)}
                    className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      product.inStock
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {product.inStock ? "Stokda var" : "Bitib"}
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-1 shrink-0">
                <button
                  onClick={() => handleDelete(product.id, product.name[locale])}
                  className="p-2 text-stone-400 hover:text-rose-600 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
