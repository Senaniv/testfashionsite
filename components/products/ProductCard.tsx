"use client";

import React from "react";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useToast } from "@/components/ui/Toast";
import Rating from "@/components/ui/Rating";
import Badge from "@/components/ui/Badge";
import { Product, formatPrice, getDiscountPercentage } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { locale, t } = useLocale();
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      image: product.images[0],
      size: product.sizes.length > 0 ? product.sizes[0] : undefined,
      color: product.colors.length > 0 ? product.colors[0].name[locale] : undefined,
      colorHex: product.colors.length > 0 ? product.colors[0].hex : undefined,
      quantity: 1,
    });

    showToast(`${product.name[locale]} ${t("products.addToCart")}!`, "success");
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      image: product.images[0],
      category: product.category,
    });

    showToast(
      isFavorited
        ? `${product.name[locale]} ${t("products.removeFromWishlist")}`
        : `${product.name[locale]} ${t("products.addToWishlist")}`,
      "info"
    );
  };

  return (
    <div className="group flex flex-col bg-white rounded-xl overflow-hidden transition-all duration-300">
      {/* Image Container with Badges & Wishlist */}
      <div className="relative aspect-3/4 rounded-xl overflow-hidden bg-stone-100 mb-3.5">
        <Link href={`/products/${product.id}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.name[locale]}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.salePrice && (
            <Badge variant="sale">
              -{getDiscountPercentage(product.price, product.salePrice)}%
            </Badge>
          )}
          {product.isNewArrival && (
            <Badge variant="new">NEW</Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          aria-label="Wishlist"
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-stone-700 hover:text-rose-500 hover:scale-110 active:scale-95 transition-all shadow-xs z-10 cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorited ? "fill-rose-500 text-rose-500" : ""
            }`}
          />
        </button>

        {/* Quick Add to Cart button sliding up on hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-10 hidden sm:block">
          <button
            onClick={handleQuickAdd}
            className="w-full py-2.5 px-4 bg-[#1A1A1A]/95 text-white hover:bg-black text-xs font-semibold rounded-lg shadow-md flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{t("products.addToCart")}</span>
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col flex-1 px-1">
        <Link
          href={`/products/${product.id}`}
          className="text-xs sm:text-sm font-medium text-stone-800 hover:text-black line-clamp-1 mb-1 transition-colors"
        >
          {product.name[locale]}
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-sm sm:text-base font-bold text-stone-900">
            {formatPrice(product.salePrice ?? product.price)}
          </span>
          {product.salePrice && (
            <span className="text-xs sm:text-sm text-stone-400 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="mt-auto flex items-center justify-between">
          <Rating value={product.rating} reviews={product.reviews} size="sm" />

          {/* Mobile direct add to cart icon */}
          <button
            onClick={handleQuickAdd}
            className="sm:hidden p-1.5 rounded-full bg-stone-100 text-stone-700 hover:bg-stone-200 transition"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
