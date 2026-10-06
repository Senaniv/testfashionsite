"use client";

import React from "react";
import Link from "next/link";
import { X, ShoppingBag, Heart, ShieldAlert, Sparkles, Compass } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import LanguageSwitcher from "./LanguageSwitcher";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  cartCount: number;
  wishlistCount: number;
}

export default function MobileMenu({
  isOpen,
  onClose,
  cartCount,
  wishlistCount,
}: MobileMenuProps) {
  const { t } = useLocale();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-[#FAF8F5] shadow-2xl flex flex-col justify-between overflow-y-auto animate-slideInLeft z-50">
        <div>
          {/* Top header */}
          <div className="p-5 flex items-center justify-between border-b border-stone-200">
            <div>
              <span className="font-heading text-xl tracking-widest font-bold text-[#1A1A1A]">
                LUNORA
              </span>
              <p className="text-[10px] tracking-widest text-[#C4A882] font-semibold">
                FASHION
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-stone-200 text-stone-700 transition"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Language Switcher Bar */}
          <div className="px-5 py-3 bg-stone-100/70 border-b border-stone-200 flex items-center justify-between">
            <span className="text-xs text-stone-500 font-medium">
              {t("common.language")}:
            </span>
            <LanguageSwitcher />
          </div>

          {/* Nav Links */}
          <div className="p-5 flex flex-col space-y-4">
            <Link
              href="/"
              onClick={onClose}
              className="text-base font-medium text-stone-800 hover:text-[#C4A882] transition py-1 flex items-center justify-between"
            >
              <span>{t("nav.home")}</span>
              <span className="text-xs text-stone-400">→</span>
            </Link>
            <Link
              href="/products"
              onClick={onClose}
              className="text-base font-medium text-stone-800 hover:text-[#C4A882] transition py-1 flex items-center justify-between"
            >
              <span>{t("nav.products")}</span>
              <span className="text-xs text-stone-400">→</span>
            </Link>
            <Link
              href="/category/women"
              onClick={onClose}
              className="text-base font-medium text-stone-800 hover:text-[#C4A882] transition py-1 flex items-center justify-between"
            >
              <span>{t("nav.women")}</span>
              <span className="text-xs text-stone-400">→</span>
            </Link>
            <Link
              href="/category/men"
              onClick={onClose}
              className="text-base font-medium text-stone-800 hover:text-[#C4A882] transition py-1 flex items-center justify-between"
            >
              <span>{t("nav.men")}</span>
              <span className="text-xs text-stone-400">→</span>
            </Link>
            <Link
              href="/category/dresses"
              onClick={onClose}
              className="text-base font-medium text-stone-800 hover:text-[#C4A882] transition py-1 flex items-center justify-between"
            >
              <span>{t("categories.subtitle")}</span>
              <span className="text-xs text-stone-400">→</span>
            </Link>
            <Link
              href="/products?sale=true"
              onClick={onClose}
              className="text-base font-semibold text-rose-600 hover:text-rose-700 transition py-1 flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-rose-600" />
                {t("nav.sale")} %
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-600 font-bold">
                HOT
              </span>
            </Link>
          </div>

          {/* Quick Shortcuts */}
          <div className="px-5 py-4 border-t border-stone-200 grid grid-cols-2 gap-3">
            <Link
              href="/wishlist"
              onClick={onClose}
              className="flex items-center gap-2 p-3 bg-white rounded-xl border border-stone-200 text-sm font-medium text-stone-800"
            >
              <Heart className="w-4 h-4 text-rose-500" />
              <span>{t("nav.wishlist")}</span>
              {wishlistCount > 0 && (
                <span className="ml-auto text-xs bg-rose-500 text-white font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link
              href="/cart"
              onClick={onClose}
              className="flex items-center gap-2 p-3 bg-white rounded-xl border border-stone-200 text-sm font-medium text-stone-800"
            >
              <ShoppingBag className="w-4 h-4 text-[#C4A882]" />
              <span>{t("nav.cart")}</span>
              {cartCount > 0 && (
                <span className="ml-auto text-xs bg-[#1A1A1A] text-white font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Admin Link at the bottom */}
        <div className="p-5 border-t border-stone-200 bg-stone-100/50">
          <Link
            href="/admin"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-stone-900 text-white rounded-xl text-xs font-semibold tracking-wider hover:bg-stone-800 transition"
          >
            <ShieldAlert className="w-4 h-4 text-[#C4A882]" />
            <span>{t("nav.admin")}</span>
          </Link>
          <p className="text-center text-[10px] text-stone-400 mt-3">
            © 2026 LUNORA FASHION
          </p>
        </div>
      </div>
    </div>
  );
}
