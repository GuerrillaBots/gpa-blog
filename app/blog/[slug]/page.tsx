import { getPost, getAllPosts } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import ViewCounter from "@/components/ViewCounter";
import ReactionToast from "@/components/ReactionToast";
import AuthorBadge from "@/components/AuthorBadge";
import { notFound } from "next/navigation";
import Image from "next/image";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return { title: `${post.title} — GPA Blog`, description: post.excerpt };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post;
  try { post = getPost(slug); } catch { notFound(); }

  return (
    <div className="mx-auto max-w-5xl px-6 py-14">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-12">

        {/* Article */}
        <article>
          <a href="/" className="inline-block mb-8 text-xs font-semibold text-[#8b9b6a] hover:text-[#1a2a12] transition-colors">
            ← All posts
          </a>

          {/* Tag + meta */}
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex items-center border border-[#c8c3b8] rounded-full px-3 py-0.5">
              <span
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                className="text-xs font-semibold tracking-widest uppercase text-[#8b9b6a]"
              >
                GPA Files
              </span>
            </div>
          </div>

          {/* Title */}
          <h1
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            className="text-3xl sm:text-4xl font-bold leading-tight text-[#1a2a12] tracking-tight mb-4"
          >
            {post.title}
          </h1>
          <p className="text-[#6b7a55] text-base leading-relaxed mb-4">{post.excerpt}</p>

          {/* Meta row */}
          <div className="flex items-center gap-3 text-xs text-[#8b9b6a] mb-2">
            <time>
              {new Date(post.date).toLocaleDateString("en-IN", {
                day: "numeric", month: "long", year: "numeric",
              })}
            </time>
            <span className="text-[#c8c3b8]">·</span>
            <span>{post.readTime} min read</span>
            <span className="text-[#c8c3b8]">·</span>
            <ViewCounter slug={slug} />
          </div>

          <div className="h-px bg-[#d0cbbf] mb-6" />

          {/* Author */}
          <AuthorBadge />

          {/* Hero image */}
          {post.hasHero && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <Image
                src={`/images/posts/${slug}/hero.png`}
                alt={post.title}
                width={1200}
                height={630}
                className="w-full"
                priority
              />
            </div>
          )}

          {/* Body */}
          <div className="prose max-w-none">
            <MDXRemote source={post.content} />
          </div>

          {/* Footer */}
          <div className="mt-14 pt-6 border-t border-[#d0cbbf] flex items-center justify-between">
            <a href="/" className="text-sm font-semibold text-[#8b9b6a] hover:text-[#1a2a12] transition-colors">
              ← All posts
            </a>
            <a
              href="https://guerrillabots.com"
              className="text-sm font-semibold text-[#8b9b6a] hover:text-[#1a2a12] transition-colors"
            >
              guerrillabots.com →
            </a>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col gap-5 pt-16">
          <div className="sticky top-8 flex flex-col gap-5">
            <div className="rounded-xl border border-[#d0cbbf] bg-[#e8e4d8] p-4">
              <p
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                className="text-xs font-bold tracking-widest uppercase text-[#8b9b6a] mb-3"
              >
                About GPA
              </p>
              <p className="text-xs text-[#6b7a55] leading-relaxed">
                Business-driven automation, governed by IT, without the 18-month wait.
              </p>
              <a
                href="https://guerrillabots.com"
                className="mt-3 inline-block text-xs font-semibold text-[#1a2a12] hover:text-[#5a7a3a] transition-colors"
              >
                Learn more →
              </a>
            </div>

            <div className="rounded-xl border border-[#d0cbbf] bg-[#e8e4d8] p-4">
              <p
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                className="text-xs font-bold tracking-widest uppercase text-[#8b9b6a] mb-3"
              >
                Subscribe
              </p>
              <p className="text-xs text-[#6b7a55] leading-relaxed mb-3">Longer essays. Free.</p>
              <a
                href="https://guerrillabots.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-xs font-bold py-2 px-3 rounded-lg bg-[#1b2f1a] text-[#f0ede5] hover:bg-[#243d22] transition-colors"
              >
                Substack →
              </a>
            </div>
          </div>
        </aside>

      </div>

      <ReactionToast slug={slug} />
    </div>
  );
}
