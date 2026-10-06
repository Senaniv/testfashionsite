"use client";

import React from "react";
import Link from "next/link";
import { Heart, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/components/ui/Toast";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { formatPrice } from "@/lib/utils";

export default function WishlistPage() {
  const { t, locale } = useLocale();
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();
  const { showToast } = useToast();

  const handleMoveToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      salePrice: item.salePrice,
      image: item.image,
      quantity: 1,
    });
    removeItem(item.id);
    showToast(`${item.name[locale]} səbətə əlavə edildi!`, "success");
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: t("wishlist.title") }]} />

        <div className="flex items-center justify-between my-6">
          <h1 className="font-heading text-3xl sm:text-4xl text-[#1A1A1A]">
            {t("wishlist.title")}
          </h1>
          <span className="text-xs text-stone-500">
            {items.length} məhsul
          </span>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 sm:p-16 text-center border border-stone-200/80 max-w-lg mx-auto shadow-xs space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mx-auto text-rose-500">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="font-heading text-2xl text-stone-800">
              {t("wishlist.empty")}
            </h3>
            <p className="text-stone-500 text-sm">
              Bəyəndiyiniz məhsulları ürək işarəsinə klikləyərək buraya yadda saxlaya bilərsiniz.
            </p>
            <div className="pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1A1A1A] text-white text-xs font-semibold tracking-wider hover:bg-stone-800 transition"
              >
                <span>{t("cart.continueShopping")}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs flex flex-col group"
              >
                <div className="relative aspect-3/4 bg-stone-100 overflow-hidden">
                  <Link href={`/products/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.name[locale]}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </Link>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-stone-500 hover:text-rose-600 transition shadow-xs cursor-pointer"
                    title={t("wishlist.remove")}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
                  <div>
                    <Link
                      href={`/products/${item.id}`}
                      className="font-medium text-xs sm:text-sm text-stone-900 hover:underline line-clamp-1"
                    >
                      {item.name[locale]}
                    </Link>
                    <div className="font-bold text-stone-900 text-sm mt-1">
                      {formatPrice(item.salePrice ?? item.price)}
                    </div>
                  </div>

                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="w-full py-2 px-3 rounded-lg bg-[#1A1A1A] hover:bg-black text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{t("wishlist.moveToCart")}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
