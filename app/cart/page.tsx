"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/components/ui/Toast";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { t, locale } = useLocale();
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const { showToast } = useToast();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "LUNORA10") {
      setDiscount(0.1);
      showToast("10% endirim tətbiq edildi!", "success");
    } else {
      showToast("Yanlış promo kod!", "error");
    }
  };

  const shipping = totalPrice > 50 || items.length === 0 ? 0 : 5;
  const discountAmount = totalPrice * discount;
  const finalTotal = Math.max(0, totalPrice - discountAmount + shipping);

  const handleCheckout = () => {
    showToast(
      locale === "az"
        ? "Sayt demo rejimindədir. Sifarişlər hələlik qəbul olunmur."
        : "The site is in demo mode. Orders are not processed yet.",
      "info"
    );
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: t("nav.cart") }]} />

        <h1 className="font-heading text-3xl sm:text-4xl text-[#1A1A1A] my-6">
          {t("cart.title")}
        </h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 sm:p-16 text-center border border-stone-200/80 max-w-lg mx-auto shadow-xs space-y-4">
            <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
              <ShoppingBag className="w-8 h-8 text-[#C4A882]" />
            </div>
            <h3 className="font-heading text-2xl text-stone-800">
              {t("cart.empty")}
            </h3>
            <p className="text-stone-500 text-sm">
              Səbətinizdə hələlik heç bir məhsul yoxdur. Ən son kolleksiyaya nəzər yetirin.
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white rounded-2xl border border-stone-200/80 p-6 divide-y divide-stone-100 shadow-xs">
                {items.map((item, index) => {
                  const effectivePrice = item.salePrice ?? item.price;
                  return (
                    <div
                      key={`${item.id}-${item.size}-${item.color}-${index}`}
                      className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                    >
                      {/* Product Thumbnail */}
                      <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                        <img
                          src={item.image}
                          alt={item.name[locale]}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 space-y-1">
                        <Link
                          href={`/products/${item.id}`}
                          className="font-medium text-sm sm:text-base text-stone-900 hover:underline"
                        >
                          {item.name[locale]}
                        </Link>
                        <div className="flex flex-wrap gap-2 text-xs text-stone-500">
                          {item.size && (
                            <span>
                              {t("cart.size")}: <strong>{item.size}</strong>
                            </span>
                          )}
                          {item.color && (
                            <span>
                              • {t("cart.color")}: <strong>{item.color}</strong>
                            </span>
                          )}
                        </div>
                        <div className="text-sm font-bold text-stone-900 pt-1">
                          {formatPrice(effectivePrice)}
                        </div>
                      </div>

                      {/* Quantity Controls & Delete */}
                      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-2 sm:pt-0">
                        <div className="flex items-center border border-stone-300 rounded-full px-2.5 py-1 bg-stone-50">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity - 1,
                                item.size,
                                item.color
                              )
                            }
                            className="p-1 text-stone-500 hover:text-black cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold px-3">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity + 1,
                                item.size,
                                item.color
                              )
                            }
                            className="p-1 text-stone-500 hover:text-black cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-sm font-bold text-stone-900 min-w-[70px] text-right">
                          {formatPrice(effectivePrice * item.quantity)}
                        </div>

                        <button
                          onClick={() =>
                            removeItem(item.id, item.size, item.color)
                          }
                          className="p-2 text-stone-400 hover:text-rose-600 transition cursor-pointer"
                          title={t("cart.remove")}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between items-center pt-2">
                <Link
                  href="/products"
                  className="text-xs text-stone-600 hover:text-black underline"
                >
                  ← {t("cart.continueShopping")}
                </Link>
                <button
                  onClick={clearCart}
                  className="text-xs text-rose-600 hover:text-rose-700 underline cursor-pointer"
                >
                  Səbəti Təmizlə
                </button>
              </div>
            </div>

            {/* Cart Summary Sidebar */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-xs space-y-5 sticky top-24">
                <h3 className="font-heading text-xl text-stone-900">
                  Sifariş Xülasəsi
                </h3>

                {/* Pricing Breakdown */}
                <div className="space-y-3 text-xs text-stone-600 border-b border-stone-100 pb-4">
                  <div className="flex justify-between">
                    <span>{t("cart.subtotal")}</span>
                    <span className="font-semibold text-stone-900">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Promo Endirim (10%)</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>{t("cart.shipping")}</span>
                    <span className="font-semibold text-stone-900">
                      {shipping === 0 ? (
                        <span className="text-emerald-600 font-bold uppercase">
                          {t("cart.free")}
                        </span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                </div>

                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="LUNORA10"
                    className="flex-1 px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg uppercase placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#C4A882]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-800 hover:bg-black text-white text-xs font-semibold rounded-lg cursor-pointer transition"
                  >
                    {t("cart.apply")}
                  </button>
                </form>

                {/* Total */}
                <div className="flex justify-between items-baseline pt-2 border-t border-stone-100">
                  <span className="text-sm font-semibold text-stone-800">
                    {t("cart.total")}
                  </span>
                  <span className="text-2xl font-bold text-stone-900">
                    {formatPrice(finalTotal)}
                  </span>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 px-6 rounded-full bg-[#1A1A1A] hover:bg-black text-white text-xs sm:text-sm font-semibold tracking-wider transition shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-[#C4A882]" />
                  <span>{t("cart.checkout")}</span>
                </button>

                <p className="text-[11px] text-center text-stone-400">
                  🔒 256-bit SSL Təhlükəsiz Şifrələnmə
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
