"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Truck,
  CheckCircle2,
  Clock,
  Package,
  User,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { formatPrice } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function AdminOrderDetailPage({ params }: OrderDetailPageProps) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const { t } = useLocale();
  const { showToast } = useToast();

  const [status, setStatus] = useState<
    "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  >("pending");

  const orderData = {
    id: id || "ORD-9421",
    date: "05 Oktyabr 2026, 14:30",
    customer: {
      name: "Aygün Əliyeva",
      email: "aygun@gmail.com",
      phone: "+994 50 123 45 67",
      address: "Nizami küçəsi 48, mənzil 12",
      city: "Bakı, Nəsimi rayonu",
      zip: "AZ1000",
      notes: "Zəhmət olmasa çatdırmazdan 1 saat əvvəl zəng edin.",
    },
    items: [
      {
        id: "prod_001",
        name: "Kətan Blazer (Linen Blend Blazer)",
        size: "M",
        color: "Bej",
        price: 89.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&auto=format&fit=crop&q=80",
      },
      {
        id: "prod_003",
        name: "Geniş Paçalı Şalvar (Wide Leg Trousers)",
        size: "S",
        color: "Bej",
        price: 49.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?w=400&auto=format&fit=crop&q=80",
      },
    ],
    subtotal: 139.98,
    shipping: 0,
    total: 139.98,
  };

  const handleUpdateStatus = (newStatus: any) => {
    setStatus(newStatus);
    showToast(`Sifariş statusu yeniləndi: ${newStatus}`, "success");
  };

  const steps = [
    { key: "pending", label: "Gözləmədə", icon: Clock },
    { key: "confirmed", label: "Təsdiqləndi", icon: Package },
    { key: "shipped", label: "Kuryerdə (Göndərildi)", icon: Truck },
    { key: "delivered", label: "Çatdırıldı", icon: CheckCircle2 },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/orders"
            className="p-2 rounded-xl bg-white border border-stone-200 text-stone-600 hover:text-black hover:bg-stone-50 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-heading text-2xl font-bold text-stone-900">
                Sifariş #{orderData.id}
              </h1>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 uppercase">
                {status}
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">{orderData.date}</p>
          </div>
        </div>

        {/* Change status control */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-500 font-semibold">Status:</span>
          <select
            value={status}
            onChange={(e) => handleUpdateStatus(e.target.value)}
            className="px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 cursor-pointer shadow-xs focus:ring-1 focus:ring-[#C4A882]"
          >
            <option value="pending">Gözləmədə</option>
            <option value="confirmed">Təsdiqləndi</option>
            <option value="shipped">Göndərildi</option>
            <option value="delivered">Çatdırıldı</option>
            <option value="cancelled">Ləğv edildi</option>
          </select>
        </div>
      </div>

      {/* Progress Timeline Tracker */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-6">
          Sifariş Mərhələsi
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            const isDone =
              status === "delivered" ||
              (status === "shipped" && idx <= 2) ||
              (status === "confirmed" && idx <= 1) ||
              (status === "pending" && idx === 0);

            return (
              <div
                key={st.key}
                className={`p-4 rounded-xl border flex items-center gap-3 transition ${
                  isDone
                    ? "bg-stone-900 text-white border-black"
                    : "bg-stone-50 text-stone-400 border-stone-200"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="text-xs font-semibold">{st.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid: Customer Info & Items */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Ordered Items List */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs space-y-4">
          <h3 className="font-heading text-base font-semibold text-stone-900 border-b border-stone-100 pb-3">
            Sifariş Olunan Məhsullar
          </h3>

          <div className="divide-y divide-stone-100">
            {orderData.items.map((item) => (
              <div key={item.id} className="py-3 first:pt-0 flex gap-4 items-center">
                <div className="w-14 h-18 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-xs sm:text-sm text-stone-900 truncate">
                    {item.name}
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    Ölçü: <strong>{item.size}</strong> • Rəng: <strong>{item.color}</strong>
                  </div>
                  <div className="text-xs text-stone-400 mt-0.5">
                    {item.quantity} ədəd × {formatPrice(item.price)}
                  </div>
                </div>
                <div className="font-bold text-xs sm:text-sm text-stone-900">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing summary */}
          <div className="pt-4 border-t border-stone-100 space-y-2 text-xs text-stone-600">
            <div className="flex justify-between">
              <span>Ara Cəm:</span>
              <span className="font-semibold text-stone-900">{formatPrice(orderData.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Çatdırılma:</span>
              <span className="text-emerald-600 font-bold">PULSUZ</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-100">
              <span>Cəmi:</span>
              <span className="text-lg">{formatPrice(orderData.total)}</span>
            </div>
          </div>
        </div>

        {/* Customer Information Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs space-y-4">
            <h3 className="font-heading text-base font-semibold text-stone-900 border-b border-stone-100 pb-3">
              Müştəri Məlumatı
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3 text-stone-800">
                <User className="w-4 h-4 text-stone-400 shrink-0" />
                <span className="font-semibold">{orderData.customer.name}</span>
              </div>

              <div className="flex items-center gap-3 text-stone-800">
                <Phone className="w-4 h-4 text-stone-400 shrink-0" />
                <a
                  href={`tel:${orderData.customer.phone}`}
                  className="text-stone-700 hover:underline"
                >
                  {orderData.customer.phone}
                </a>
              </div>

              <div className="flex items-center gap-3 text-stone-800">
                <Mail className="w-4 h-4 text-stone-400 shrink-0" />
                <span className="text-stone-700">{orderData.customer.email}</span>
              </div>

              <div className="flex items-start gap-3 text-stone-800 pt-2 border-t border-stone-100">
                <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">{orderData.customer.address}</div>
                  <div className="text-stone-500">
                    {orderData.customer.city}, {orderData.customer.zip}
                  </div>
                </div>
              </div>
            </div>

            {orderData.customer.notes && (
              <div className="p-3 bg-stone-50 rounded-xl text-[11px] text-stone-600 mt-2">
                <strong>Qeyd:</strong> {orderData.customer.notes}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
