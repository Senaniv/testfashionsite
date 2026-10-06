"use client";

import { useState, useEffect, useCallback } from "react";

export interface WishlistItem {
  id: string;
  name: { az: string; en: string };
  price: number;
  salePrice?: number | null;
  image: string;
  category: string;
}

const WISHLIST_KEY = "lunora-wishlist";

function loadWishlist(): WishlistItem[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(WISHLIST_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveWishlist(items: WishlistItem[]) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
}

export function useWishlist() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setItems(loadWishlist());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveWishlist(items);
    }
  }, [items, isLoaded]);

  const addItem = useCallback((item: WishlistItem) => {
    setItems((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const isInWishlist = useCallback(
    (id: string) => items.some((item) => item.id === id),
    [items]
  );

  const toggleWishlist = useCallback(
    (item: WishlistItem) => {
      if (isInWishlist(item.id)) {
        removeItem(item.id);
      } else {
        addItem(item);
      }
    },
    [isInWishlist, removeItem, addItem]
  );

  return {
    items,
    addItem,
    removeItem,
    isInWishlist,
    toggleWishlist,
    isLoaded,
  };
}
