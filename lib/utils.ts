import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";

export interface ProductColor {
  name: { az: string; en: string };
  hex: string;
}

export interface Product {
  id: string;
  name: { az: string; en: string };
  description: { az: string; en: string };
  price: number;
  salePrice: number | null;
  currency: string;
  category: string;
  images: string[];
  sizes: string[];
  colors: ProductColor[];
  rating: number;
  reviews: number;
  inStock: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: { az: string; en: string };
  slug: string;
  image: string;
  icon: string;
  order: number;
}

export function getProducts(): Product[] {
  return productsData as Product[];
}

export function getProductById(id: string): Product | undefined {
  return (productsData as Product[]).find((p) => p.id === id);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return (productsData as Product[]).filter((p) => p.category === categoryId);
}

export function getBestSellers(): Product[] {
  return (productsData as Product[]).filter((p) => p.isBestSeller);
}

export function getNewArrivals(): Product[] {
  return (productsData as Product[]).filter((p) => p.isNewArrival);
}

export function getSaleProducts(): Product[] {
  return (productsData as Product[]).filter((p) => p.salePrice !== null);
}

export function getCategories(): Category[] {
  return (categoriesData as Category[]).sort((a, b) => a.order - b.order);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return (categoriesData as Category[]).find((c) => c.slug === slug);
}

export function getCategoryById(id: string): Category | undefined {
  return (categoriesData as Category[]).find((c) => c.id === id);
}

export function searchProducts(query: string, locale: "az" | "en"): Product[] {
  const lowerQuery = query.toLowerCase();
  return (productsData as Product[]).filter(
    (p) =>
      p.name[locale].toLowerCase().includes(lowerQuery) ||
      p.description[locale].toLowerCase().includes(lowerQuery)
  );
}

export function formatPrice(price: number): string {
  return `₼${price.toFixed(2)}`;
}

export function getDiscountPercentage(price: number, salePrice: number): number {
  return Math.round(((price - salePrice) / price) * 100);
}
