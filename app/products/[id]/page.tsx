"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  Plus,
  Minus,
  Check,
  Share2,
} from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useToast } from "@/components/ui/Toast";
import Rating from "@/components/ui/Rating";
import Badge from "@/components/ui/Badge";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ProductCard from "@/components/products/ProductCard";
import {
  getProductById,
  getProductsByCategory,
  getCategoryById,
  formatPrice,
  getDiscountPercentage,
} from "@/lib/utils";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const product = getProductById(id);
  const { locale, t } = useLocale();
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  if (!product) {
    notFound();
  }

  const category = getCategoryById(product.category);
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(
    product.sizes.length > 0 ? product.sizes[0] : ""
  );
  const [selectedColor, setSelectedColor] = useState(
    product.colors.length > 0 ? product.colors[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "shipping" | "reviews">("desc");

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      image: selectedImage,
      size: selectedSize || undefined,
      color: selectedColor ? selectedColor.name[locale] : undefined,
      colorHex: selectedColor ? selectedColor.hex : undefined,
      quantity,
    });

    showToast(`${quantity}x ${product.name[locale]} ${t("products.addToCart")}!`, "success");
  };

  const handleToggleWishlist = () => {
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
    <div className="bg-[#FAF8F5] min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: t("nav.products"), href: "/products" },
            {
              label: category ? category.name[locale] : t("nav.products"),
              href: category ? `/category/${category.slug}` : "/products",
            },
            { label: product.name[locale] },
          ]}
        />

        {/* Product Showcase */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-xs mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
            {/* Gallery (Left Col) */}
            <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4">
              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-16 h-20 rounded-xl overflow-hidden border-2 transition shrink-0 cursor-pointer ${
                        selectedImage === img
                          ? "border-[#1A1A1A] scale-105"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Main Image */}
              <div className="relative flex-1 aspect-3/4 rounded-2xl overflow-hidden bg-stone-100 shadow-xs">
                <img
                  src={selectedImage}
                  alt={product.name[locale]}
                  className="w-full h-full object-cover object-center"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                  {product.salePrice && (
                    <Badge variant="sale" className="text-xs px-3 py-1">
                      -{getDiscountPercentage(product.price, product.salePrice)}% ENDİRİM
                    </Badge>
                  )}
                  {product.isNewArrival && (
                    <Badge variant="new" className="text-xs px-3 py-1">
                      NEW
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Product Details (Right Col) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Category tag & Wishlist */}
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#C4A882]">
                    {category?.name[locale]}
                  </span>
                  <button
                    onClick={handleToggleWishlist}
                    className="p-2 rounded-full hover:bg-stone-100 text-stone-600 hover:text-rose-500 transition cursor-pointer"
                    aria-label="Wishlist"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isFavorited ? "fill-rose-500 text-rose-500" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Title */}
                <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-[#1A1A1A]">
                  {product.name[locale]}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3">
                  <Rating value={product.rating} reviews={product.reviews} size="md" />
                  <span className="text-stone-300">|</span>
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> {t("products.inStock")}
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 pt-1">
                  <span className="text-2xl sm:text-3xl font-bold text-stone-900">
                    {formatPrice(product.salePrice ?? product.price)}
                  </span>
                  {product.salePrice && (
                    <span className="text-lg text-stone-400 line-through">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-stone-600 text-sm leading-relaxed border-t border-b border-stone-100 py-4">
                  {product.description[locale]}
                </p>

                {/* Color Selector */}
                {product.colors.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-stone-800">
                        {t("products.color")}:
                      </span>
                      <span className="text-stone-500">
                        {selectedColor?.name[locale]}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      {product.colors.map((c, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedColor(c)}
                          style={{ backgroundColor: c.hex }}
                          className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer ${
                            selectedColor?.hex === c.hex
                              ? "ring-2 ring-offset-2 ring-stone-900 scale-110"
                              : "border-stone-300 hover:scale-105"
                          }`}
                          title={c.name[locale]}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                {product.sizes.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-stone-800">
                        {t("products.size")}:
                      </span>
                      <span className="text-[#C4A882] underline cursor-pointer">
                        {t("products.sizeChart")}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`min-w-11 py-2 px-3 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                            selectedSize === sz
                              ? "bg-[#1A1A1A] text-white border-black"
                              : "bg-white text-stone-700 border-stone-200 hover:border-stone-400"
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity & CTA */}
                <div className="pt-4 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                  {/* Quantity Counter */}
                  <div className="flex items-center border border-stone-300 rounded-full px-3 py-2 bg-stone-50 shrink-0 justify-between sm:justify-start w-32">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-1 hover:text-black text-stone-500 cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-bold text-stone-800 px-3">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-1 hover:text-black text-stone-500 cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 px-6 rounded-full bg-[#1A1A1A] text-white hover:bg-stone-800 text-xs sm:text-sm font-semibold tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-98 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{t("products.addToCart")}</span>
                  </button>
                </div>
              </div>

              {/* Trust perks */}
              <div className="pt-6 border-t border-stone-100 grid grid-cols-2 gap-4 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#C4A882]" />
                  <span>{t("trustBadges.freeShipping")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-[#C4A882]" />
                  <span>{t("trustBadges.easyReturns")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Details Tabs */}
          <div className="mt-14 pt-10 border-t border-stone-200">
            <div className="flex border-b border-stone-200 gap-8">
              <button
                onClick={() => setActiveTab("desc")}
                className={`pb-3 text-sm font-semibold tracking-wider cursor-pointer border-b-2 transition ${
                  activeTab === "desc"
                    ? "border-[#1A1A1A] text-[#1A1A1A]"
                    : "border-transparent text-stone-400 hover:text-stone-700"
                }`}
              >
                {t("products.description")}
              </button>
              <button
                onClick={() => setActiveTab("shipping")}
                className={`pb-3 text-sm font-semibold tracking-wider cursor-pointer border-b-2 transition ${
                  activeTab === "shipping"
                    ? "border-[#1A1A1A] text-[#1A1A1A]"
                    : "border-transparent text-stone-400 hover:text-stone-700"
                }`}
              >
                {t("footer.shippingDelivery")}
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`pb-3 text-sm font-semibold tracking-wider cursor-pointer border-b-2 transition ${
                  activeTab === "reviews"
                    ? "border-[#1A1A1A] text-[#1A1A1A]"
                    : "border-transparent text-stone-400 hover:text-stone-700"
                }`}
              >
                {t("products.reviews")} ({product.reviews})
              </button>
            </div>

            <div className="py-6 text-sm text-stone-600 leading-relaxed max-w-3xl">
              {activeTab === "desc" && (
                <div className="space-y-3">
                  <p>{product.description[locale]}</p>
                  <p>
                    Kolleksiyanın hər bir parçası premium keyfiyyətli materiallardan, gündəlik rahatlıq və zərifliyi birləşdirmək məqsədi ilə hazırlanmışdır.
                  </p>
                </div>
              )}
              {activeTab === "shipping" && (
                <div className="space-y-2">
                  <p>• Bakı daxili çatdırılma 24 saat ərzində həyata keçirilir.</p>
                  <p>• ₼50-dən yuxarı bütün sifarişlərdə çatdırılma tamamilə PULSUZDUR.</p>
                  <p>• 30 gün ərzində asan dəyişdirmə və qaytarma imkanı.</p>
                </div>
              )}
              {activeTab === "reviews" && (
                <div className="space-y-4">
                  <div className="p-4 bg-stone-50 rounded-xl">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-stone-900 text-xs">Aysel M.</span>
                      <Rating value={5} />
                    </div>
                    <p className="text-xs text-stone-600">Materialı və kəsimi çox gözəldir, tam ölçüdə oturdu. Çox razı qaldım!</p>
                  </div>
                  <div className="p-4 bg-stone-50 rounded-xl">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-stone-900 text-xs">Elmir K.</span>
                      <Rating value={4} />
                    </div>
                    <p className="text-xs text-stone-600">Keyfiyyəti əladır, çatdırılma da vaxtında gəldi. Tövsiyə edirəm.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-14">
            <h2 className="font-heading text-2xl sm:text-3xl text-[#1A1A1A] mb-6">
              {t("products.relatedProducts")}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
