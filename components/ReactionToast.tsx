"use client";
import { useEffect, useState } from "react";

export default function ReactionToast({ slug }: { slug: string }) {
  const [visible, setVisible] = useState(false);
  const [done, setDone] = useState(false);
  const [reacted, setReacted] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    const key = `reacted:${slug}`;
    if (localStorage.getItem(key)) { setDone(true); return; }

    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.body.scrollHeight;
      if (scrolled / total > 0.75) {
        setVisible(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  async function react(type: "up" | "down") {
    setReacted(type);
    setDone(true);
    localStorage.setItem(`reacted:${slug}`, type);
    await fetch(`/api/react?slug=${slug}&type=${type}`, { method: "POST" });
    setTimeout(() => setVisible(false), 1800);
  }

  if (!visible || (done && !reacted)) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-[#2a3a1a] bg-[#0f1a0a] px-5 py-3 shadow-xl transition-all">
      {done ? (
        <span className="text-sm text-[#8B9B6A]">
          {reacted === "up" ? "Glad it helped." : "Noted. We'll do better."}
        </span>
      ) : (
        <>
          <span className="text-sm text-[#c8c8b8]">Was this useful?</span>
          <button
            onClick={() => react("up")}
            className="rounded-lg px-3 py-1.5 text-lg transition hover:bg-[#1B2F1A]"
            aria-label="Thumbs up"
          >
            👍
          </button>
          <button
            onClick={() => react("down")}
            className="rounded-lg px-3 py-1.5 text-lg transition hover:bg-[#1B2F1A]"
            aria-label="Thumbs down"
          >
            👎
          </button>
          <button
            onClick={() => setVisible(false)}
            className="ml-1 text-xs text-[#555] hover:text-[#888]"
          >
            ✕
          </button>
        </>
      )}
    </div>
  );
}
