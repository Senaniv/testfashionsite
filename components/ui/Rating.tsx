import React from "react";
import { Star } from "lucide-react";

interface RatingProps {
  value: number;
  reviews?: number;
  size?: "sm" | "md";
}

export default function Rating({ value, reviews, size = "sm" }: RatingProps) {
  const iconSize = size === "sm" ? "w-3 h-3" : "w-4 h-4";

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center text-amber-500">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${iconSize} ${
              star <= Math.round(value)
                ? "fill-amber-400 text-amber-400"
                : "text-stone-300"
            }`}
          />
        ))}
      </div>
      {reviews !== undefined && (
        <span className="text-[11px] text-stone-500 font-medium ml-1">
          ({reviews})
        </span>
      )}
    </div>
  );
}
