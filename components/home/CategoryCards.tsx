"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

export default function CategoryCards() {
  const { t, locale } = useLocale();

  const cards = [
    {
      title: locale === "az" ? "Qadın Kolleksiyası" : "Women's Collection",
      subtitle: locale === "az" ? "Kəşf Et" : "Explore Now",
      href: "/category/women",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
    },
    {
      title: locale === "az" ? "Kişi Kolleksiyası" : "Men's Collection",
      subtitle: locale === "az" ? "Kəşf Et" : "Explore Now",
      href: "/category/men",
      image:
        "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=800&auto=format&fit=crop&q=80",
    },
    {
      title: locale === "az" ? "Donlar" : "Dresses",
      subtitle: locale === "az" ? "Kəşf Et" : "Explore Now",
      href: "/category/dresses",
      image:
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop&q=80",
    },
    {
      title: locale === "az" ? "Aksesuarlar" : "Accessories",
      subtitle: locale === "az" ? "Kəşf Et" : "Explore Now",
      href: "/category/accessories",
      image:
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-500">
              {t("categories.subtitle")}
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-[#1A1A1A] mt-1">
              {t("categories.title")}
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-700 hover:text-black hover:translate-x-1 transition-all"
          >
            <span>{t("categories.viewAll")}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4 Cards Grid matching reference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <Link
              key={idx}
              href={card.href}
              className="group relative rounded-2xl overflow-hidden aspect-3/4 sm:aspect-4/5 shadow-md bg-stone-100 flex flex-col justify-end p-6 cursor-pointer"
            >
              {/* Background Image */}
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent transition-opacity group-hover:from-black/85" />

              {/* Content overlay at bottom */}
              <div className="relative z-10 text-white space-y-1">
                <h3 className="text-lg sm:text-xl font-medium tracking-wide">
                  {card.title}
                </h3>
                <div className="inline-flex items-center gap-1.5 text-xs font-light text-stone-300 group-hover:text-white group-hover:translate-x-1 transition-all">
                  <span>{card.subtitle}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
