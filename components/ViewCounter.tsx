"use client";
import { useEffect, useState } from "react";

export default function ViewCounter({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const sessionKey = `viewed:${slug}`;
    const alreadyCounted = sessionStorage.getItem(sessionKey);

    if (alreadyCounted) {
      // Already counted this session — just fetch the current count
      fetch(`/api/views?slug=${slug}`)
        .then((r) => r.json())
        .then((d) => setViews(d.views));
    } else {
      // First visit this session — increment
      sessionStorage.setItem(sessionKey, "1");
      fetch(`/api/views?slug=${slug}`, { method: "POST" })
        .then((r) => r.json())
        .then((d) => setViews(d.views));
    }
  }, [slug]);

  if (views === null) return null;
  return (
    <span className="text-xs text-[#8b9b6a]">
      {views.toLocaleString()} {views === 1 ? "view" : "views"}
    </span>
  );
}
