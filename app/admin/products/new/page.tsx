"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Sparkles } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { getCategories, Product } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

export default function AdminNewProductPage() {
  const router = useRouter();
  const { t, locale } = useLocale();
  const { showToast } = useToast();
  const categories = getCategories();

  const [form, setForm] = useState({
    nameAz: "",
    nameEn: "",
    descAz: "",
    descEn: "",
    price: "",
    salePrice: "",
    category: categories[0]?.id || "cat_women",
    imageUrl:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80",
    sizes: ["S", "M", "L"],
    isNewArrival: true,
  });

  const allSizes = ["XS", "S", "M", "L", "XL", "XXL", "36", "37", "38", "39", "40"];

  const toggleSize = (size: string) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.nameAz.trim() || !form.price) {
      showToast("Zəhmət olmasa adı və qiyməti daxil edin!", "error");
      return;
    }

    const newProduct: Product = {
      id: `prod_${Date.now()}`,
      name: {
        az: form.nameAz.trim(),
        en: form.nameEn.trim() || form.nameAz.trim(),
      },
      description: {
        az: form.descAz.trim() || "Zərif və müasir kolleksiya parçası.",
        en: form.descEn.trim() || "Elegant and modern collection piece.",
      },
      price: parseFloat(form.price),
      salePrice: form.salePrice ? parseFloat(form.salePrice) : null,
      currency: "AZN",
      category: form.category,
      images: [form.imageUrl],
      sizes: form.sizes,
      colors: [{ name: { az: "Klassik", en: "Classic" }, hex: "#1A1A1A" }],
      rating: 5.0,
      reviews: 1,
      inStock: true,
      isBestSeller: false,
      isNewArrival: form.isNewArrival,
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    const saved = localStorage.getItem("lunora-admin-products");
    let currentList: Product[] = [];
    if (saved) {
      try {
        currentList = JSON.parse(saved);
      } catch (err) {}
    }
    const updated = [newProduct, ...currentList];
    localStorage.setItem("lunora-admin-products", JSON.stringify(updated));

    showToast("Məhsul uğurla əlavə edildi!", "success");
    router.push("/admin/products");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 rounded-xl bg-white border border-stone-200 text-stone-600 hover:text-black hover:bg-stone-50 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-heading text-2xl font-bold text-stone-900">
              {t("admin.addProduct")}
            </h1>
            <p className="text-xs text-stone-500">
              Mağazaya yeni geyim və ya aksesuar əlavə edin
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Details Box */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-xs space-y-5">
          <h3 className="font-heading text-base font-semibold text-stone-900 border-b border-stone-100 pb-3">
            Əsas Məlumatlar
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                Məhsulun adı (AZ) *
              </label>
              <input
                type="text"
                required
                value={form.nameAz}
                onChange={(e) => setForm({ ...form, nameAz: e.target.value })}
                placeholder="məs. Zərif İpək Köynək"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#C4A882]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                Məhsulun adı (EN)
              </label>
              <input
                type="text"
                value={form.nameEn}
                onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
                placeholder="e.g. Elegant Silk Shirt"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#C4A882]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                Təsvir (AZ)
              </label>
              <textarea
                rows={3}
                value={form.descAz}
                onChange={(e) => setForm({ ...form, descAz: e.target.value })}
                placeholder="Məhsul haqqında qısa təsvir..."
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#C4A882]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                Təsvir (EN)
              </label>
              <textarea
                rows={3}
                value={form.descEn}
                onChange={(e) => setForm({ ...form, descEn: e.target.value })}
                placeholder="Short description..."
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#C4A882]"
              />
            </div>
          </div>
        </div>

        {/* Pricing & Category Box */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-xs space-y-5">
          <h3 className="font-heading text-base font-semibold text-stone-900 border-b border-stone-100 pb-3">
            Qiymət və Kateqoriya
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                Qiymət (₼) *
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="89.99"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#C4A882]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                Endirimli Qiymət (₼, istəyə görə)
              </label>
              <input
                type="number"
                step="0.01"
                value={form.salePrice}
                onChange={(e) => setForm({ ...form, salePrice: e.target.value })}
                placeholder="69.99"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#C4A882]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                Kateqoriya *
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#C4A882] cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name[locale]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-2 pt-2 border-t border-stone-100">
            <label className="text-xs font-semibold text-stone-700 block">
              Mövcud Ölçülər:
            </label>
            <div className="flex flex-wrap gap-2">
              {allSizes.map((sz) => (
                <button
                  type="button"
                  key={sz}
                  onClick={() => toggleSize(sz)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                    form.sizes.includes(sz)
                      ? "bg-[#1A1A1A] text-white border-black"
                      : "bg-white text-stone-700 border-stone-200 hover:border-stone-400"
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Media & Options */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-xs space-y-5">
          <h3 className="font-heading text-base font-semibold text-stone-900 border-b border-stone-100 pb-3">
            Şəkil və Parametrlər
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
            <div className="sm:col-span-2 space-y-4">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                  Şəkil URL-i *
                </label>
                <input
                  type="url"
                  required
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#C4A882]"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.isNewArrival}
                  onChange={(e) =>
                    setForm({ ...form, isNewArrival: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-black cursor-pointer"
                />
                <span className="text-xs font-semibold text-stone-800">
                  "Yeni Gələnlər" (New Arrival) etiketini əlavə et
                </span>
              </label>
            </div>

            {/* Image Preview */}
            <div className="aspect-3/4 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 max-w-[140px] mx-auto sm:mx-0">
              <img
                src={form.imageUrl}
                alt="Önizləmə"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as any).src =
                    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80";
                }}
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            href="/admin/products"
            className="px-6 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-semibold transition"
          >
            {t("admin.cancel")}
          </Link>
          <button
            type="submit"
            className="px-7 py-2.5 rounded-xl bg-[#1A1A1A] hover:bg-stone-800 text-white text-xs font-semibold tracking-wider transition shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{t("admin.save")}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
