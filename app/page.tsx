import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <div className="mb-14">
        <h1
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          className="text-3xl font-bold tracking-tight text-[#e8e4d8] mb-3"
        >
          The GPA Files
        </h1>
        <p className="text-[#6b7a5a] text-base">
          Writing on Guerrilla Process Automation — what it is, why it matters, and where the industry is heading.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {posts.map((post) => (
          <article key={post.slug} className="group">
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="flex items-center gap-3 mb-2">
                <time className="text-xs text-[#4a5a3a] tabular-nums">
                  {new Date(post.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </time>
                <span className="text-[#2a3a1a] text-xs">·</span>
                <span className="text-xs text-[#4a5a3a]">{post.readTime} min read</span>
              </div>
              <h2
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                className="text-lg font-600 text-[#e8e4d8] group-hover:text-[#c8d94b] transition-colors leading-snug mb-2"
              >
                {post.title}
              </h2>
              <p className="text-sm text-[#6b7a5a] leading-relaxed line-clamp-2">{post.excerpt}</p>
            </Link>
            <div className="mt-3 h-px bg-[#1e2e12]" />
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-[#4a5a3a] text-sm">First post coming soon.</p>
      )}
    </div>
  );
}
