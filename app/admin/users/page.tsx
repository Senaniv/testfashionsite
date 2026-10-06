"use client";

import React, { useState } from "react";
import { Search, UserCheck, Mail, Phone, Calendar } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { formatPrice } from "@/lib/utils";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  registeredDate: string;
  totalOrders: number;
  totalSpent: number;
  status: "active" | "inactive";
}

const mockUsers: User[] = [
  { id: "USR-001", name: "Aygün Əliyeva", email: "aygun@gmail.com", phone: "+994 50 123 45 67", registeredDate: "12 Yan 2026", totalOrders: 5, totalSpent: 489.90, status: "active" },
  { id: "USR-002", name: "Rəşad Məmmədov", email: "reshad@mail.ru", phone: "+994 55 987 65 43", registeredDate: "03 Fev 2026", totalOrders: 3, totalSpent: 245.50, status: "active" },
  { id: "USR-003", name: "Nərgiz Qasımova", email: "nargiz.q@yahoo.com", phone: "+994 70 333 22 11", registeredDate: "18 Mar 2026", totalOrders: 8, totalSpent: 890.20, status: "active" },
  { id: "USR-004", name: "Kamran Həsənov", email: "kamran@gmail.com", phone: "+994 51 555 44 33", registeredDate: "22 May 2026", totalOrders: 2, totalSpent: 119.98, status: "active" },
  { id: "USR-005", name: "Leyla Cəfərova", email: "leyla.c@gmail.com", phone: "+994 50 777 88 99", registeredDate: "05 İyn 2026", totalOrders: 4, totalSpent: 350.00, status: "active" },
  { id: "USR-006", name: "Murad Quliyev", email: "murad.q@gmail.com", phone: "+994 55 444 33 22", registeredDate: "14 İyl 2026", totalOrders: 1, totalSpent: 45.99, status: "inactive" },
  { id: "USR-007", name: "Fərid Babayev", email: "farid.b@gmail.com", phone: "+994 50 666 55 44", registeredDate: "29 Avq 2026", totalOrders: 6, totalSpent: 620.00, status: "active" },
  { id: "USR-008", name: "Sevinc Məmmədli", email: "sevinc.m@mail.ru", phone: "+994 77 111 22 33", registeredDate: "11 Sen 2026", totalOrders: 2, totalSpent: 179.90, status: "active" },
];

export default function AdminUsersPage() {
  const { t } = useLocale();
  const [search, setSearch] = useState("");

  const filtered = mockUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl text-stone-900 font-bold">
          {t("admin.users")}
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Qeydiyyatdan keçmiş müştərilər və onların sifariş tarixçəsi ({filtered.length} istifadəçi)
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-xs flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="İstifadəçi adı və ya e-poçt..."
            className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#C4A882]"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-600">
            <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-200">
              <tr>
                <th className="py-3.5 px-4">İstifadəçi</th>
                <th className="py-3.5 px-4">Əlaqə</th>
                <th className="py-3.5 px-4">Qeydiyyat Tarixi</th>
                <th className="py-3.5 px-4">Sifariş Sayı</th>
                <th className="py-3.5 px-4">Ümumi Xərclənən</th>
                <th className="py-3.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((user) => {
                const initials = user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2);

                return (
                  <tr key={user.id} className="hover:bg-stone-50/50 transition">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center font-bold text-xs shrink-0">
                          {initials}
                        </div>
                        <div>
                          <div className="font-semibold text-stone-900">
                            {user.name}
                          </div>
                          <div className="text-[10px] text-stone-400">
                            ID: {user.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-stone-800">{user.email}</div>
                      <div className="text-[10px] text-stone-400">{user.phone}</div>
                    </td>
                    <td className="py-3.5 px-4 text-stone-500">
                      {user.registeredDate}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-stone-800">
                      {user.totalOrders} sifariş
                    </td>
                    <td className="py-3.5 px-4 font-bold text-stone-900">
                      {formatPrice(user.totalSpent)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          user.status === "active"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-stone-100 text-stone-600"
                        }`}
                      >
                        {user.status === "active" ? "Aktiv" : "Deaktiv"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
