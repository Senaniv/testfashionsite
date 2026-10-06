"use client";

import React from "react";
import Link from "next/link";
import {
  Package,
  ShoppingCart,
  Clock,
  Users,
  TrendingUp,
  Plus,
  ArrowRight,
} from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { getProducts, formatPrice } from "@/lib/utils";

export default function AdminDashboardPage() {
  const { t, locale } = useLocale();
  const products = getProducts();

  const stats = [
    {
      label: t("admin.totalProducts"),
      value: products.length,
      icon: Package,
      change: "+3 bu ay",
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: t("admin.totalOrders"),
      value: "48",
      icon: ShoppingCart,
      change: "+12% keçən aydan",
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: t("admin.pendingOrders"),
      value: "6",
      icon: Clock,
      change: "Diqqət tələb edir",
      color: "bg-amber-50 text-amber-600",
    },
    {
      label: t("admin.totalUsers"),
      value: "156",
      icon: Users,
      change: "+18 yeni istifadəçi",
      color: "bg-purple-50 text-purple-600",
    },
  ];

  const recentOrders = [
    { id: "ORD-9421", customer: "Aygün Əliyeva", amount: 149.98, status: "pending", date: "Bugün, 14:30" },
    { id: "ORD-9420", customer: "Rəşad Məmmədov", amount: 89.99, status: "confirmed", date: "Bugün, 11:15" },
    { id: "ORD-9419", customer: "Nərgiz Qasımova", amount: 219.50, status: "shipped", date: "Dünən, 18:40" },
    { id: "ORD-9418", customer: "Kamran Həsənov", amount: 59.99, status: "delivered", date: "Dünən, 12:20" },
    { id: "ORD-9417", customer: "Leyla Cəfərova", amount: 119.99, status: "delivered", date: "03 Okt, 16:05" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">Gözləmədə</span>;
      case "confirmed":
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">Təsdiqləndi</span>;
      case "shipped":
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">Göndərildi</span>;
      case "delivered":
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Çatdırıldı</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl text-stone-900 font-bold">
            {t("admin.welcome")}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            LUNORA mağazasının cari göstəriciləri və son fəaliyyətlər xülasəsi.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1A1A1A] hover:bg-stone-800 text-white rounded-xl text-xs font-semibold tracking-wider transition shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>{t("admin.addProduct")}</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-500 font-medium">
                  {s.label}
                </span>
                <div className={`p-2 rounded-xl ${s.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-stone-900">
                {s.value}
              </div>
              <div className="text-[11px] text-stone-400 font-medium">
                {s.change}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders and Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-lg text-stone-900">
              {t("admin.recentOrders")}
            </h3>
            <Link
              href="/admin/orders"
              className="text-xs font-semibold text-[#C4A882] hover:text-[#1A1A1A] transition flex items-center gap-1"
            >
              <span>{t("common.viewAll")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-600">
              <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-100">
                <tr>
                  <th className="py-3 px-3">Sifariş №</th>
                  <th className="py-3 px-3">Müştəri</th>
                  <th className="py-3 px-3">Məbləğ</th>
                  <th className="py-3 px-3">Tarix</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-stone-50/50 transition">
                    <td className="py-3.5 px-3 font-semibold text-stone-900">
                      {order.id}
                    </td>
                    <td className="py-3.5 px-3 font-medium text-stone-800">
                      {order.customer}
                    </td>
                    <td className="py-3.5 px-3 font-bold text-stone-900">
                      {formatPrice(order.amount)}
                    </td>
                    <td className="py-3.5 px-3 text-stone-400">
                      {order.date}
                    </td>
                    <td className="py-3.5 px-3">
                      {getStatusBadge(order.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-lg text-stone-900">
              {t("admin.recentProducts")}
            </h3>
            <Link
              href="/admin/products"
              className="text-xs font-semibold text-[#C4A882] hover:text-[#1A1A1A] transition"
            >
              <span>{t("common.viewAll")}</span>
            </Link>
          </div>

          <div className="space-y-3.5">
            {products.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <div className="w-12 h-14 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                  <img
                    src={p.images[0]}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-stone-800 truncate">
                    {p.name[locale]}
                  </div>
                  <div className="text-[11px] text-stone-400">
                    {p.reviews} satış • {p.rating} ★
                  </div>
                </div>
                <div className="text-xs font-bold text-stone-900">
                  {formatPrice(p.salePrice ?? p.price)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
