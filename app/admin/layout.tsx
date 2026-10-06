"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  ShoppingCart,
  Users,
  ExternalLink,
  Menu,
  X,
  Bell,
  ArrowLeft,
} from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { t } = useLocale();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    {
      label: t("admin.dashboard"),
      href: "/admin",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      label: t("admin.products"),
      href: "/admin/products",
      icon: Package,
    },
    {
      label: t("admin.categories"),
      href: "/admin/categories",
      icon: FolderOpen,
    },
    {
      label: t("admin.orders"),
      href: "/admin/orders",
      icon: ShoppingCart,
    },
    {
      label: t("admin.users"),
      href: "/admin/users",
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex text-stone-800">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 inset-y-0 left-0 w-64 bg-white border-r border-stone-200 z-50 flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          {/* Logo / Brand */}
          <div className="p-6 border-b border-stone-100 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2">
              <span className="font-heading text-xl font-bold tracking-widest text-[#1A1A1A]">
                LUNORA
              </span>
              <span className="text-[10px] tracking-widest px-1.5 py-0.5 rounded-md bg-[#1A1A1A] text-white font-bold">
                ADMIN
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-stone-500 hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? "bg-[#1A1A1A] text-white shadow-xs"
                      : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer of Sidebar */}
        <div className="p-4 border-t border-stone-100 space-y-2">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200 text-xs font-semibold transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Mağazaya Qayıt</span>
          </Link>
          <div className="text-[10px] text-stone-400 text-center pt-2">
            LUNORA Admin v1.0
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 bg-white border-b border-stone-200 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-xs font-semibold text-stone-500 hidden sm:inline">
              LUNORA İdarəetmə Paneli
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-stone-200 cursor-pointer">
              <Bell className="w-4 h-4" />
            </div>

            <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
              <div className="w-8 h-8 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-xs font-bold">
                AD
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-semibold text-stone-800">Admin</div>
                <div className="text-[10px] text-stone-400">admin@lunora.az</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
