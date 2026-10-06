"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { useToast } from "@/components/ui/Toast";

export default function Footer() {
  const pathname = usePathname();
  const { t } = useLocale();
  const { showToast } = useToast();
  const [email, setEmail] = useState("");

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      showToast(t("newsletter.success"), "success");
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#141414] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-stone-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-heading text-2xl tracking-[0.25em] font-bold text-white">
                LUNORA
              </span>
              <span className="block text-[10px] tracking-[0.35em] text-[#C4A882] font-semibold">
                FASHION
              </span>
            </Link>
            <p className="text-sm text-stone-400 max-w-sm leading-relaxed">
              {t("footer.tagline")}
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:bg-[#C4A882] transition"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:bg-[#C4A882] transition"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.7 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:bg-[#C4A882] transition"
                aria-label="Twitter / X"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 1: Shop */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white">
              {t("footer.shop")}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/products"
                  className="hover:text-white text-stone-400 transition"
                >
                  {t("footer.allProducts")}
                </Link>
              </li>
              <li>
                <Link
                  href="/products?filter=new"
                  className="hover:text-white text-stone-400 transition"
                >
                  {t("footer.newArrivals")}
                </Link>
              </li>
              <li>
                <Link
                  href="/category/women"
                  className="hover:text-white text-stone-400 transition"
                >
                  {t("footer.women")}
                </Link>
              </li>
              <li>
                <Link
                  href="/category/men"
                  className="hover:text-white text-stone-400 transition"
                >
                  {t("footer.men")}
                </Link>
              </li>
              <li>
                <Link
                  href="/products?sale=true"
                  className="text-rose-400 hover:text-rose-300 font-medium transition"
                >
                  {t("footer.sale")} %
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Customer Care */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white">
              {t("footer.customerCare")}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <span className="text-stone-400 hover:text-white cursor-pointer transition">
                  {t("footer.contactUs")}
                </span>
              </li>
              <li>
                <span className="text-stone-400 hover:text-white cursor-pointer transition">
                  {t("footer.shippingDelivery")}
                </span>
              </li>
              <li>
                <span className="text-stone-400 hover:text-white cursor-pointer transition">
                  {t("footer.returnsExchanges")}
                </span>
              </li>
              <li>
                <span className="text-stone-400 hover:text-white cursor-pointer transition">
                  {t("footer.sizeGuide")}
                </span>
              </li>
              <li>
                <span className="text-stone-400 hover:text-white cursor-pointer transition">
                  {t("footer.faqs")}
                </span>
              </li>
            </ul>
          </div>

          {/* Col 3: Stay Connected */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white">
              {t("footer.stayConnected")}
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              {t("newsletter.discount")}
            </p>
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("footer.emailPlaceholder")}
                className="w-full pl-3.5 pr-10 py-2.5 bg-stone-900 border border-stone-800 rounded-full text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#C4A882]"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 p-1.5 bg-[#C4A882] text-[#1A1A1A] rounded-full hover:bg-white transition cursor-pointer"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
            <div className="pt-2">
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-[#C4A882] transition"
              >
                <span>⚙️ {t("nav.admin")}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} LUNORA FASHION. {t("footer.rights")}</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-stone-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-stone-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-stone-400 cursor-pointer">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
