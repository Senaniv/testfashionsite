"use client";

import React, { useState } from "react";
import { useLocale } from "@/hooks/useLocale";
import { useToast } from "@/components/ui/Toast";

export default function Newsletter() {
  const { t } = useLocale();
  const { showToast } = useToast();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      showToast(t("newsletter.success"), "success");
      setEmail("");
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#EFE9E2] grid grid-cols-1 lg:grid-cols-12 items-center shadow-xs">
          {/* Left image of model holding coffee cup matching reference */}
          <div className="lg:col-span-4 h-64 lg:h-full relative overflow-hidden bg-stone-200">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80"
              alt="Join our style list"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-transparent to-[#EFE9E2]/80" />
          </div>

          {/* Right Content */}
          <div className="lg:col-span-8 p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-4">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-stone-500">
              {t("newsletter.discount")}
            </span>

            <h2 className="font-heading text-3xl sm:text-4xl text-[#1A1A1A] font-normal">
              {t("newsletter.title")}
            </h2>

            <p className="text-stone-600 text-sm max-w-md">
              {t("newsletter.description")}
            </p>

            {/* Email form */}
            <form onSubmit={handleSubmit} className="pt-2 max-w-md">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("newsletter.placeholder")}
                  className="flex-1 px-5 py-3 rounded-full bg-white border border-stone-300 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C4A882]"
                />
                <button
                  type="submit"
                  className="px-8 py-3 rounded-full bg-[#1A1A1A] text-white text-xs sm:text-sm font-semibold tracking-wider hover:bg-stone-800 transition shadow-xs cursor-pointer shrink-0"
                >
                  {t("newsletter.subscribe")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
