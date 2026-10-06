"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

export default function PromoBanners() {
  const { t } = useLocale();

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Banner 1: Spring Sale */}
          <div className="relative rounded-2xl overflow-hidden bg-[#EFE9E2] min-h-[260px] sm:min-h-[280px] flex items-center p-8 sm:p-10 shadow-xs group">
            {/* Background Model Image on right */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 sm:w-2/5 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80"
                alt="Spring Sale"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#EFE9E2] via-[#EFE9E2]/50 to-transparent" />
            </div>

            {/* Left Content */}
            <div className="relative z-10 max-w-xs space-y-3">
              <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-stone-500">
                {t("promo.limitedOffer")}
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl text-[#1A1A1A] leading-tight font-normal">
                {t("promo.springSale")}<br />
                <span className="font-semibold text-rose-600">
                  {t("promo.upTo50")}
                </span>
              </h3>
              <div className="pt-2">
                <Link
                  href="/products?sale=true"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1A1A1A] text-white text-xs font-semibold tracking-wider hover:bg-stone-800 transition shadow-xs"
                >
                  <span>{t("promo.shopSale")}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Banner 2: Fresh Styles Just Landed */}
          <div className="relative rounded-2xl overflow-hidden bg-[#ECE8E1] min-h-[260px] sm:min-h-[280px] flex items-center p-8 sm:p-10 shadow-xs group">
            {/* Background Image of racks / clothes on right */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 sm:w-2/5 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&auto=format&fit=crop&q=80"
                alt="New Arrivals"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#ECE8E1] via-[#ECE8E1]/50 to-transparent" />
            </div>

            {/* Left Content */}
            <div className="relative z-10 max-w-xs space-y-3">
              <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-stone-500">
                {t("promo.newArrivals")}
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl text-[#1A1A1A] leading-tight font-normal">
                {t("promo.freshStyles")}<br />
                <span>{t("promo.justLanded")}</span>
              </h3>
              <div className="pt-2">
                <Link
                  href="/products?filter=new"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1A1A1A] text-white text-xs font-semibold tracking-wider hover:bg-stone-800 transition shadow-xs"
                >
                  <span>{t("promo.exploreNow")}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
