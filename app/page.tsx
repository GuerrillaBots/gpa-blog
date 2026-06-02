import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-5xl px-6 py-14">
      {/* Hero */}
      <div className="mb-14">
        <div className="inline-flex items-center border border-[#c8c3b8] rounded-full px-3 py-1 mb-5">
          <span
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            className="text-xs font-semibold tracking-widest uppercase text-[#6b7a55]"
          >
            Guerrilla Process Automation
          </span>
        </div>
        <h1
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1a2a12] leading-tight mb-4 max-w-2xl"
        >
          Automation built for the last mile.
        </h1>
        <p className="text-[#6b7a55] text-base max-w-lg leading-relaxed">
          The people RPA forgot. The processes the CoE never reached. The 40% that's still manual.
        </p>
      </div>

      {/* Two-column */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12">

        {/* Posts */}
        <div className="flex flex-col gap-0">
          {posts.map((post, i) => (
            <article key={post.slug} className="group">
              <Link href={`/blog/${post.slug}`} className="block py-7">
                <div className="flex items-center gap-3 mb-2">
                  <time
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    className="text-xs font-medium text-[#8b9b6a] uppercase tracking-wide"
                  >
                    {new Date(post.date).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric",
                    })}
                  </time>
                  <span className="text-[#c8c3b8]">·</span>
                  <span className="text-xs text-[#8b9b6a]">{post.readTime} min read</span>
                </div>
                <h2
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  className="text-xl font-bold text-[#1a2a12] group-hover:text-[#1b2f1a] leading-snug mb-2 transition-colors"
                >
                  {post.title}
                </h2>
                <p className="text-sm text-[#6b7a55] leading-relaxed mb-3">{post.excerpt}</p>
                <span className="text-xs font-semibold text-[#8b9b6a] group-hover:text-[#1a2a12] transition-colors">
                  Read →
                </span>
              </Link>
              {i < posts.length - 1 && <div className="h-px bg-[#d0cbbf]" />}
            </article>
          ))}
          {posts.length === 0 && (
            <p className="text-[#8b9b6a] text-sm py-7">First post coming soon.</p>
          )}
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col gap-5">
          {/* About */}
          <div className="rounded-xl border border-[#d0cbbf] bg-[#e8e4d8] p-5">
            <p
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              className="text-xs font-bold tracking-widest uppercase text-[#8b9b6a] mb-3"
            >
              About GPA
            </p>
            <p className="text-sm text-[#6b7a55] leading-relaxed">
              Guerrilla Process Automation — business-driven automation, governed by IT, without the 18-month CoE wait.
            </p>
            <a
              href="/blog/what-is-gpa"
              className="mt-3 inline-block text-xs font-semibold text-[#1a2a12] hover:text-[#5a7a3a] transition-colors"
            >
              Start here: What is GPA? →
            </a>
          </div>

          {/* Subscribe */}
          <div className="rounded-xl border border-[#d0cbbf] bg-[#e8e4d8] p-5">
            <p
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              className="text-xs font-bold tracking-widest uppercase text-[#8b9b6a] mb-3"
            >
              Subscribe
            </p>
            <p className="text-sm text-[#6b7a55] leading-relaxed mb-4">
              Longer essays on Substack. Free.
            </p>
            <a
              href="https://guerrillabots.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-xs font-bold py-2.5 px-4 rounded-lg bg-[#1b2f1a] text-[#f0ede5] hover:bg-[#243d22] transition-colors"
            >
              Subscribe on Substack
            </a>
          </div>

          {/* Built by */}
          <div className="rounded-xl border border-[#d0cbbf] bg-[#e8e4d8] p-5">
            <p
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              className="text-xs font-bold tracking-widest uppercase text-[#8b9b6a] mb-3"
            >
              Built by
            </p>
            <p className="text-sm text-[#6b7a55] leading-relaxed">
              Pranav Neeli — 12 years enterprise RPA. Founder, Guerrilla Bots.
            </p>
            <a
              href="https://guerrillabots.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-xs font-semibold text-[#1a2a12] hover:text-[#5a7a3a] transition-colors"
            >
              guerrillabots.com →
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
