"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Shield,
  ArrowRight,
} from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLocale();
  const { itemCount } = useCart();
  const { items: wishlistItems } = useWishlist();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Listen to scroll to add backdrop blur and shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // If in admin panel, do not render main site Header
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.products"), href: "/products" },
    { label: t("nav.women"), href: "/category/women" },
    { label: t("nav.men"), href: "/category/men" },
    { label: t("nav.sale"), href: "/products?sale=true", highlight: true },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#FAF8F5]/95 backdrop-blur-md shadow-xs py-3 border-b border-stone-200/60"
            : "bg-[#F5F0EB] py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Mobile Hamburger & Desktop Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-full hover:bg-stone-200/60 text-stone-800 transition cursor-pointer"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <Link href="/" className="flex flex-col items-start group">
                <span className="font-heading text-xl sm:text-2xl tracking-[0.25em] font-bold text-[#1A1A1A] group-hover:text-[#C4A882] transition-colors">
                  LUNORA
                </span>
                <span className="text-[9px] tracking-[0.35em] text-stone-500 font-semibold -mt-1 group-hover:text-[#1A1A1A] transition-colors">
                  FASHION
                </span>
              </Link>
            </div>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm tracking-wider uppercase transition-colors relative py-1 ${
                      link.highlight
                        ? "text-rose-600 font-bold hover:text-rose-700"
                        : isActive
                        ? "text-[#1A1A1A] font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#1A1A1A]"
                        : "text-stone-600 hover:text-[#1A1A1A]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Actions (Search, Wishlist, Cart, Language, Admin) */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-full text-stone-700 hover:text-black hover:bg-stone-200/60 transition cursor-pointer"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative p-2 rounded-full text-stone-700 hover:text-black hover:bg-stone-200/60 transition"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 rounded-full text-stone-700 hover:text-black hover:bg-stone-200/60 transition"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#1A1A1A] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* Language Switcher */}
              <div className="hidden sm:block">
                <LanguageSwitcher />
              </div>

              {/* Admin Panel Quick Link */}
              <Link
                href="/admin"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#1A1A1A] text-white hover:bg-[#C4A882] transition shadow-xs"
                title="Admin Panel"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Search Bar Drawer/Overlay */}
        {searchOpen && (
          <div className="border-t border-stone-200/60 bg-white shadow-md animate-slideDown">
            <div className="max-w-4xl mx-auto px-4 py-4">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-stone-400" />
                <input
                  type="text"
                  placeholder={t("search.placeholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-12 pr-24 py-3 bg-stone-50 border border-stone-200 rounded-full text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#C4A882] focus:bg-white transition"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-4 py-2 bg-[#1A1A1A] text-white rounded-full text-xs font-medium hover:bg-stone-800 transition flex items-center gap-1 cursor-pointer"
                >
                  <span>{t("nav.search")}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        cartCount={itemCount}
        wishlistCount={wishlistItems.length}
      />
    </>
  );
}
