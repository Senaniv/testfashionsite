"use client";

import React, { useState } from "react";
import { FolderOpen, Plus, Trash2, Edit3, Check } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { getCategories, getProducts, Category } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

export default function AdminCategoriesPage() {
  const { t, locale } = useLocale();
  const { showToast } = useToast();
  const products = getProducts();

  const [categories, setCategories] = useState<Category[]>(getCategories());
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCatNameAz, setNewCatNameAz] = useState("");
  const [newCatNameEn, setNewCatNameEn] = useState("");
  const [newCatSlug, setNewCatSlug] = useState("");
  const [newCatImage, setNewCatImage] = useState(
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&auto=format&fit=crop&q=80"
  );

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatNameAz.trim()) return;

    const newCat: Category = {
      id: `cat_${Date.now()}`,
      name: {
        az: newCatNameAz.trim(),
        en: newCatNameEn.trim() || newCatNameAz.trim(),
      },
      slug: (newCatSlug || newCatNameAz).toLowerCase().replace(/\s+/g, "-"),
      image: newCatImage,
      icon: "✨",
      order: categories.length + 1,
    };

    setCategories([...categories, newCat]);
    setShowAddForm(false);
    setNewCatNameAz("");
    setNewCatNameEn("");
    setNewCatSlug("");
    showToast("Yeni kateqoriya əlavə edildi!", "success");
  };

  const handleDeleteCategory = (id: string, name: string) => {
    if (confirm(`"${name}" kateqoriyasını silmək istəyirsiniz?`)) {
      setCategories(categories.filter((c) => c.id !== id));
      showToast("Kateqoriya silindi", "info");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl text-stone-900 font-bold">
            {t("admin.categories")}
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Mağazadakı məhsul qrupları və bölmələrin idarə edilməsi ({categories.length} kateqoriya)
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A1A1A] hover:bg-stone-800 text-white rounded-xl text-xs font-semibold tracking-wider transition shadow-xs w-fit cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Kateqoriya</span>
        </button>
      </div>

      {/* Add New Category Drawer / Accordion */}
      {showAddForm && (
        <form
          onSubmit={handleAddCategory}
          className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4 animate-slideDown"
        >
          <h3 className="text-sm font-semibold text-stone-900">
            Yeni Kateqoriya Əlavə Et
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-medium text-stone-700 block mb-1">
                Kateqoriya Adı (AZ) *
              </label>
              <input
                type="text"
                required
                value={newCatNameAz}
                onChange={(e) => setNewCatNameAz(e.target.value)}
                placeholder="məs. Sport Geyimlər"
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-1 focus:ring-[#C4A882]"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-stone-700 block mb-1">
                Kateqoriya Adı (EN)
              </label>
              <input
                type="text"
                value={newCatNameEn}
                onChange={(e) => setNewCatNameEn(e.target.value)}
                placeholder="e.g. Sportswear"
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-1 focus:ring-[#C4A882]"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-stone-700 block mb-1">
                Şəkil URL
              </label>
              <input
                type="url"
                value={newCatImage}
                onChange={(e) => setNewCatImage(e.target.value)}
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-1 focus:ring-[#C4A882]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 border border-stone-300 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-50"
            >
              Ləğv et
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#1A1A1A] hover:bg-stone-800 text-white rounded-xl text-xs font-semibold"
            >
              Əlavə Et
            </button>
          </div>
        </form>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((cat) => {
          const count = products.filter((p) => p.category === cat.id).length;
          return (
            <div
              key={cat.id}
              className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs flex flex-col group"
            >
              <div className="relative h-40 bg-stone-100 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name[locale]}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <div className="text-lg font-heading font-medium">
                    {cat.name[locale]}
                  </div>
                  <div className="text-[11px] text-stone-300">
                    /{cat.slug} • {count} məhsul
                  </div>
                </div>
              </div>

              <div className="p-4 flex items-center justify-between bg-white text-xs">
                <span className="text-stone-500 font-medium">
                  ID: <code className="text-stone-700">{cat.id}</code>
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() =>
                      handleDeleteCategory(cat.id, cat.name[locale])
                    }
                    className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                    title="Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
