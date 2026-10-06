import HeroBanner from "@/components/home/HeroBanner";
import CategoryCircles from "@/components/home/CategoryCircles";
import CategoryCards from "@/components/home/CategoryCards";
import PromoBanners from "@/components/home/PromoBanners";
import BestSellers from "@/components/home/BestSellers";
import TrustBadges from "@/components/home/TrustBadges";
import Newsletter from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section with Carousel & Top Badges */}
      <HeroBanner />

      {/* 2. Circular Category Bar */}
      <CategoryCircles />

      {/* 3. Featured Categories (Find Your Perfect Style) */}
      <CategoryCards />

      {/* 4. Side-by-side Promo Banners */}
      <PromoBanners />

      {/* 5. Best Sellers Section (Our Most Loved Picks) */}
      <BestSellers />

      {/* 6. Bottom Service Badges */}
      <TrustBadges />

      {/* 7. Newsletter Subscription */}
      <Newsletter />
    </div>
  );
}
