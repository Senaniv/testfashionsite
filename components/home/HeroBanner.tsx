"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Play, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

export default function HeroBanner() {
  const { t } = useLocale();
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      subtitle: t("hero.subtitle"),
      title: t("hero.title"),
      desc: t("hero.description"),
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&auto=format&fit=crop&q=80",
    },
    {
      subtitle: "AUTUMN / WINTER 2026",
      title: "Zamansız Zəriflik\nSizin Üçün",
      desc: "Hər fəslin ən unikal parçaları ilə qarderobunuzu yeniləyin.",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1000&auto=format&fit=crop&q=80",
    },
    {
      subtitle: "LIMITED EDITION",
      title: "Premium Dəri &\nKətan Kolleksiyası",
      desc: "Təbii materiallar, incə detallar və yüksək keyfiyyət.",
      image:
        "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?w=1000&auto=format&fit=crop&q=80",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const current = slides[activeSlide];

  return (
    <section className="relative bg-[#F5F0EB] overflow-hidden pt-4 pb-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 lg:pr-6 z-10 order-2 lg:order-1">
            {/* Small uppercase tag */}
            <div className="flex items-center space-x-2">
              <span className="w-6 h-px bg-stone-400"></span>
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-stone-600">
                {current.subtitle}
              </span>
            </div>

            {/* Main serif heading */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-[#1A1A1A] leading-[1.15] font-normal whitespace-pre-line tracking-tight">
              {current.title}
            </h1>

            {/* Description */}
            <p className="text-stone-600 text-sm sm:text-base max-w-lg leading-relaxed font-light">
              {current.desc}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#1A1A1A] text-white text-xs sm:text-sm font-medium tracking-wider hover:bg-stone-800 hover:shadow-lg transition-all duration-300 group"
              >
                <span>{t("hero.shopNow")}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                onClick={() => alert("Lookbook 2026 tezliklə yayımlanacaq!")}
                className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-white/80 border border-stone-300 text-stone-800 text-xs sm:text-sm font-medium hover:bg-white hover:border-stone-400 transition-all cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center">
                  <Play className="w-2.5 h-2.5 fill-stone-800 ml-0.5" />
                </div>
                <span>{t("hero.watchLookbook")}</span>
              </button>
            </div>

            {/* Inline Trust Badges matching reference */}
            <div className="pt-6 border-t border-stone-300/60 grid grid-cols-3 gap-2 sm:gap-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <div className="p-2 rounded-full bg-stone-200/60 text-stone-800 shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-stone-900 leading-tight">
                    {t("trustBadges.freeShipping")}
                  </h4>
                  <p className="text-[10px] text-stone-500 hidden sm:block">
                    {t("trustBadges.freeShippingDesc")}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <div className="p-2 rounded-full bg-stone-200/60 text-stone-800 shrink-0">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-stone-900 leading-tight">
                    {t("trustBadges.easyReturns")}
                  </h4>
                  <p className="text-[10px] text-stone-500 hidden sm:block">
                    {t("trustBadges.easyReturnsDesc")}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <div className="p-2 rounded-full bg-stone-200/60 text-stone-800 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-stone-900 leading-tight">
                    {t("trustBadges.securePayment")}
                  </h4>
                  <p className="text-[10px] text-stone-500 hidden sm:block">
                    {t("trustBadges.securePaymentDesc")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Model Image with Slide Numbers */}
          <div className="lg:col-span-5 relative order-1 lg:order-2">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Image Frame with soft organic border */}
              <div className="relative aspect-4/5 sm:aspect-3/4 lg:aspect-4/5 rounded-3xl overflow-hidden shadow-2xl bg-stone-200">
                <img
                  src={current.image}
                  alt="Lunora Fashion Collection"
                  className="w-full h-full object-cover object-center transition-all duration-700 hover:scale-105"
                />

                {/* Subtle dark gradient overlay at the bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Slide indicators: 01, 02, 03 on the right edge */}
              <div className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 flex flex-col space-y-3 z-20">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`text-xs font-mono font-bold transition-all px-2 py-1 rounded-full cursor-pointer ${
                      activeSlide === index
                        ? "text-[#1A1A1A] scale-125 bg-white/90 shadow-xs"
                        : "text-stone-400 hover:text-stone-700 bg-white/40"
                    }`}
                  >
                    0{index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
