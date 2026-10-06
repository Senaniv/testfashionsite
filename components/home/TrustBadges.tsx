"use client";

import React from "react";
import { Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

export default function TrustBadges() {
  const { t } = useLocale();

  const badges = [
    {
      icon: Truck,
      title: t("trustBadges.freeShipping"),
      desc: t("trustBadges.freeShippingDesc"),
    },
    {
      icon: RotateCcw,
      title: t("trustBadges.easyReturns"),
      desc: t("trustBadges.easyReturnsDesc"),
    },
    {
      icon: ShieldCheck,
      title: t("trustBadges.securePayment"),
      desc: t("trustBadges.securePaymentDesc"),
    },
    {
      icon: Headphones,
      title: t("trustBadges.support"),
      desc: t("trustBadges.supportDesc"),
    },
  ];

  return (
    <section className="py-6 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F5F0EB]/80 rounded-2xl p-6 sm:p-8 border border-stone-200/60 shadow-xs">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {badges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <div key={idx} className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1A1A1A] shrink-0 shadow-xs">
                    <Icon className="w-5 h-5 text-stone-800" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-stone-900 leading-tight">
                      {badge.title}
                    </h4>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      {badge.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
