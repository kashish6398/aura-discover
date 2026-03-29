"use client";

import { useState, useEffect } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const loadFavorites = () => {
      try {
        const stored = localStorage.getItem("aura_favorites");
        if (stored) {
          setFavorites(JSON.parse(stored));
        } else {
          setFavorites([]);
        }
      } catch (e) {
        setFavorites([]);
      }
    };

    loadFavorites();

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "aura_favorites") {
        loadFavorites();
      }
    };

    const handleCustomEvent = () => loadFavorites();

    window.addEventListener("storage", handleStorage);
    window.addEventListener("aura_favorites_changed", handleCustomEvent);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("aura_favorites_changed", handleCustomEvent);
    };
  }, []);

  const toggleFavorite = (id: string) => {
    try {
      const stored = localStorage.getItem("aura_favorites");
      const current = stored ? JSON.parse(stored) : [];
      let next;
      if (current.includes(id)) {
        next = current.filter((favId: string) => favId !== id);
      } else {
        next = [...current, id];
      }
      localStorage.setItem("aura_favorites", JSON.stringify(next));
      setFavorites(next);
      window.dispatchEvent(new Event("aura_favorites_changed"));
    } catch(e) {
      console.error("Error toggling favorite", e);
    }
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return { favorites, toggleFavorite, isFavorite, isMounted };
}
