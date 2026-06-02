"use client";
import { useEffect, useState } from "react";

export default function ViewCounter({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/views?slug=${slug}`, { method: "POST" })
      .then((r) => r.json())
      .then((d) => setViews(d.views));
  }, [slug]);

  if (views === null) return null;
  return (
    <span className="text-xs text-[#8b9b6a]">
      {views.toLocaleString()} {views === 1 ? "view" : "views"}
    </span>
  );
}
