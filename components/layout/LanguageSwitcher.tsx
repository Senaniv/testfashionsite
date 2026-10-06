"use client";

import React from "react";
import { useLocale } from "@/hooks/useLocale";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex items-center text-xs font-semibold tracking-wider border border-stone-300 rounded-full px-2 py-1 bg-white/80 backdrop-blur-sm shadow-xs">
      <button
        onClick={() => setLocale("az")}
        className={`px-1.5 py-0.5 rounded-full transition-all cursor-pointer ${
          locale === "az"
            ? "bg-[#1A1A1A] text-white"
            : "text-stone-600 hover:text-stone-900"
        }`}
        title="Azərbaycan dili"
      >
        AZ
      </button>
      <span className="text-stone-300 mx-0.5">|</span>
      <button
        onClick={() => setLocale("en")}
        className={`px-1.5 py-0.5 rounded-full transition-all cursor-pointer ${
          locale === "en"
            ? "bg-[#1A1A1A] text-white"
            : "text-stone-600 hover:text-stone-900"
        }`}
        title="English"
      >
        EN
      </button>
    </div>
  );
}
