import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "sale" | "new" | "default" | "accent";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const variantStyles = {
    sale: "bg-rose-600 text-white font-bold",
    new: "bg-[#1A1A1A] text-white font-semibold",
    default: "bg-stone-200 text-stone-800 font-medium",
    accent: "bg-[#C4A882] text-white font-semibold",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] tracking-wider uppercase ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
