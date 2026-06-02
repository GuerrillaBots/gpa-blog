import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-5xl px-6 py-14">
      {/* Hero */}
      <div className="mb-12">
        <p
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          className="text-xs font-semibold tracking-widest uppercase text-[#8b9b6a] mb-3"
        >
          The GPA Files
        </p>
        <h1
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          className="text-4xl font-bold tracking-tight text-[#e8e4d8] leading-tight mb-4"
        >
          Automation built for<br className="hidden sm:block" /> the people RPA forgot.
        </h1>
        <p className="text-[#8a9a72] text-base max-w-lg">
          Writing on Guerrilla Process Automation — the last mile, the CoE backlog, and where intelligent automation is actually heading.
        </p>
      </div>

      {/* Two-column on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12">

        {/* Posts */}
        <div className="flex flex-col gap-9">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="flex items-center gap-3 mb-2">
                  <time className="text-xs text-[#6b7a55] tabular-nums">
                    {new Date(post.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                  <span className="text-[#2d4020]">·</span>
                  <span className="text-xs text-[#6b7a55]">{post.readTime} min read</span>
                </div>
                <h2
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  className="text-xl font-semibold text-[#e8e4d8] group-hover:text-[#c8d94b] transition-colors leading-snug mb-2"
                >
                  {post.title}
                </h2>
                <p className="text-sm text-[#8a9a72] leading-relaxed">{post.excerpt}</p>
                <span className="mt-3 inline-block text-xs text-[#8b9b6a] group-hover:text-[#c8d94b] transition-colors">
                  Read →
                </span>
              </Link>
              <div className="mt-5 h-px bg-[#2d4020]" />
            </article>
          ))}
          {posts.length === 0 && (
            <p className="text-[#6b7a55] text-sm">First post coming soon.</p>
          )}
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col gap-6">
          {/* About */}
          <div className="rounded-xl border border-[#2d4020] bg-[#141f0e] p-5">
            <p
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              className="text-xs font-semibold tracking-widest uppercase text-[#8b9b6a] mb-3"
            >
              About
            </p>
            <p className="text-sm text-[#8a9a72] leading-relaxed">
              Guerrilla Process Automation (GPA) is a new category of automation — for business users, backed by IT, without the 18-month wait.
            </p>
            <a
              href="/blog/what-is-gpa"
              className="mt-3 inline-block text-xs text-[#8b9b6a] hover:text-[#c8d94b] transition-colors"
            >
              Start here: What is GPA? →
            </a>
          </div>

          {/* Subscribe */}
          <div className="rounded-xl border border-[#2d4020] bg-[#141f0e] p-5">
            <p
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              className="text-xs font-semibold tracking-widest uppercase text-[#8b9b6a] mb-3"
            >
              Stay in the loop
            </p>
            <p className="text-sm text-[#8a9a72] leading-relaxed mb-4">
              Longer essays, case studies, and developer notes — on Substack.
            </p>
            <a
              href="https://guerrillabots.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-xs font-semibold py-2.5 px-4 rounded-lg bg-[#1b2f1a] border border-[#2d4020] text-[#a8b885] hover:border-[#8b9b6a] hover:text-[#c8d94b] transition-all"
            >
              Subscribe on Substack
            </a>
          </div>

          {/* Built by */}
          <div className="rounded-xl border border-[#2d4020] bg-[#141f0e] p-5">
            <p
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              className="text-xs font-semibold tracking-widest uppercase text-[#8b9b6a] mb-3"
            >
              Built by
            </p>
            <p className="text-sm text-[#8a9a72] leading-relaxed">
              Pranav Neeli — 12 years enterprise RPA, now building Guerrilla Bots.
            </p>
            <a
              href="https://guerrillabots.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-xs text-[#8b9b6a] hover:text-[#c8d94b] transition-colors"
            >
              guerrillabots.com →
            </a>
          </div>
        </aside>

      </div>
    </div>
  );
}
