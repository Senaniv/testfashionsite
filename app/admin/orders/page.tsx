"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Eye, Filter, CheckCircle2, Clock, Truck, Package, XCircle } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { formatPrice } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

interface Order {
  id: string;
  customer: string;
  email: string;
  phone: string;
  city: string;
  itemsCount: number;
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  date: string;
}

const initialOrders: Order[] = [
  { id: "ORD-9421", customer: "Aygün Əliyeva", email: "aygun@gmail.com", phone: "+994 50 123 45 67", city: "Bakı (Nəsimi r.)", itemsCount: 2, total: 149.98, status: "pending", date: "05 Okt 2026, 14:30" },
  { id: "ORD-9420", customer: "Rəşad Məmmədov", email: "reshad@mail.ru", phone: "+994 55 987 65 43", city: "Bakı (Yasamal r.)", itemsCount: 1, total: 89.99, status: "confirmed", date: "05 Okt 2026, 11:15" },
  { id: "ORD-9419", customer: "Nərgiz Qasımova", email: "nargiz.q@yahoo.com", phone: "+994 70 333 22 11", city: "Sumqayıt", itemsCount: 3, total: 219.50, status: "shipped", date: "04 Okt 2026, 18:40" },
  { id: "ORD-9418", customer: "Kamran Həsənov", email: "kamran@gmail.com", phone: "+994 51 555 44 33", city: "Bakı (Səbail r.)", itemsCount: 1, total: 59.99, status: "delivered", date: "04 Okt 2026, 12:20" },
  { id: "ORD-9417", customer: "Leyla Cəfərova", email: "leyla.c@gmail.com", phone: "+994 50 777 88 99", city: "Gəncə", itemsCount: 2, total: 119.99, status: "delivered", date: "03 Okt 2026, 16:05" },
  { id: "ORD-9416", customer: "Murad Quliyev", email: "murad.q@gmail.com", phone: "+994 55 444 33 22", city: "Bakı (Xətai r.)", itemsCount: 1, total: 45.99, status: "cancelled", date: "02 Okt 2026, 09:30" },
];

export default function AdminOrdersPage() {
  const { t } = useLocale();
  const { showToast } = useToast();

  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [search, setSearch] = useState("");

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast(`Sifariş #${orderId} statusu dəyişdirildi`, "success");
  };

  const filtered = orders.filter((o) => {
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800"><Clock className="w-3 h-3" /> Gözləmədə</span>;
      case "confirmed":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800"><Package className="w-3 h-3" /> Təsdiqləndi</span>;
      case "shipped":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800"><Truck className="w-3 h-3" /> Göndərildi</span>;
      case "delivered":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800"><CheckCircle2 className="w-3 h-3" /> Çatdırıldı</span>;
      case "cancelled":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800"><XCircle className="w-3 h-3" /> Ləğv edildi</span>;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl text-stone-900 font-bold">
          {t("admin.orders")}
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Daxil olan sifarişlərin izlənməsi və statuslarının dəyişdirilməsi ({filtered.length} sifariş)
        </p>
      </div>

      {/* Status Filter Tabs & Search */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        {/* Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1 sm:pb-0">
          {[
            { id: "all", label: "Hamısı" },
            { id: "pending", label: "Gözləmədə" },
            { id: "confirmed", label: "Təsdiqləndi" },
            { id: "shipped", label: "Göndərildi" },
            { id: "delivered", label: "Çatdırıldı" },
            { id: "cancelled", label: "Ləğv" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition shrink-0 cursor-pointer ${
                filterStatus === tab.id
                  ? "bg-[#1A1A1A] text-white"
                  : "bg-stone-50 text-stone-600 hover:bg-stone-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Sifariş № və ya Müştəri..."
            className="w-full pl-9 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#C4A882]"
          />
        </div>
      </div>

      {/* Orders Table (Desktop) */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-600">
            <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-200">
              <tr>
                <th className="py-3.5 px-4">Sifariş №</th>
                <th className="py-3.5 px-4">Müştəri</th>
                <th className="py-3.5 px-4">Şəhər / Ünvan</th>
                <th className="py-3.5 px-4">Məhsul</th>
                <th className="py-3.5 px-4">Məbləğ</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Əməliyyat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-stone-50/50 transition">
                  <td className="py-3.5 px-4 font-bold text-stone-900">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="hover:underline hover:text-[#C4A882]"
                    >
                      {order.id}
                    </Link>
                    <div className="text-[10px] text-stone-400 font-normal">
                      {order.date}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-stone-900">
                      {order.customer}
                    </div>
                    <div className="text-[10px] text-stone-400">
                      {order.phone}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-stone-600">
                    {order.city}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-stone-800">
                    {order.itemsCount} ədəd
                  </td>
                  <td className="py-3.5 px-4 font-bold text-stone-900">
                    {formatPrice(order.total)}
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(order.id, e.target.value as any)
                      }
                      className="text-[11px] font-semibold bg-stone-50 border border-stone-200 rounded-lg px-2 py-1 cursor-pointer"
                    >
                      <option value="pending">Gözləmədə</option>
                      <option value="confirmed">Təsdiqləndi</option>
                      <option value="shipped">Göndərildi</option>
                      <option value="delivered">Çatdırıldı</option>
                      <option value="cancelled">Ləğv edildi</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-stone-100 hover:bg-[#1A1A1A] hover:text-white rounded-lg text-[11px] font-semibold text-stone-700 transition"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Bax</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden divide-y divide-stone-100 p-4 space-y-3">
          {filtered.map((order) => (
            <div key={order.id} className="pt-3 first:pt-0 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="font-bold text-xs text-stone-900 hover:underline"
                  >
                    {order.id}
                  </Link>
                  <div className="text-[10px] text-stone-400">{order.date}</div>
                </div>
                <div>{getStatusBadge(order.status)}</div>
              </div>

              <div className="text-xs text-stone-700">
                <span className="font-semibold">{order.customer}</span> ({order.city})
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-stone-50">
                <span className="font-bold text-stone-900">
                  {formatPrice(order.total)} ({order.itemsCount} məhsul)
                </span>
                <Link
                  href={`/admin/orders/${order.id}`}
                  className="px-3 py-1 bg-stone-100 text-stone-800 font-semibold rounded-md text-[11px]"
                >
                  Detallar
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
