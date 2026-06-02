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
  try {
    post = getPost(slug);
  } catch {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-14">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-12">

        {/* Article */}
        <article>
          {/* Back */}
          <a
            href="/"
            className="inline-block mb-8 text-xs text-[#6b7a55] hover:text-[#8b9b6a] transition-colors"
          >
            ← All posts
          </a>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4 text-xs text-[#6b7a55]">
              <time>
                {new Date(post.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <span className="text-[#2d4020]">·</span>
              <span>{post.readTime} min read</span>
              <span className="text-[#2d4020]">·</span>
              <ViewCounter slug={slug} />
            </div>

            <h1
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              className="text-3xl font-bold leading-tight text-[#e8e4d8] tracking-tight mb-4"
            >
              {post.title}
            </h1>
            <p className="text-[#8a9a72] text-base leading-relaxed">{post.excerpt}</p>
            <div className="mt-6 h-px bg-[#2d4020]" />
          </div>

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
          <div className="mt-14 pt-6 border-t border-[#2d4020] flex items-center justify-between">
            <a href="/" className="text-sm text-[#6b7a55] hover:text-[#8b9b6a] transition-colors">
              ← All posts
            </a>
            <a
              href="https://guerrillabots.com"
              className="text-sm text-[#6b7a55] hover:text-[#8b9b6a] transition-colors"
            >
              guerrillabots.com →
            </a>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col gap-5 pt-14">
          <div className="sticky top-8 flex flex-col gap-5">
            <div className="rounded-xl border border-[#2d4020] bg-[#141f0e] p-4">
              <p
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                className="text-xs font-semibold tracking-widest uppercase text-[#8b9b6a] mb-3"
              >
                About GPA
              </p>
              <p className="text-xs text-[#8a9a72] leading-relaxed">
                Guerrilla Process Automation — business-driven automation, governed by IT, without the 18-month wait.
              </p>
              <a
                href="https://guerrillabots.com"
                className="mt-3 inline-block text-xs text-[#8b9b6a] hover:text-[#c8d94b] transition-colors"
              >
                Learn more →
              </a>
            </div>

            <div className="rounded-xl border border-[#2d4020] bg-[#141f0e] p-4">
              <p
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                className="text-xs font-semibold tracking-widest uppercase text-[#8b9b6a] mb-3"
              >
                Subscribe
              </p>
              <p className="text-xs text-[#8a9a72] leading-relaxed mb-3">
                Longer essays on Substack. Free.
              </p>
              <a
                href="https://guerrillabots.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-xs font-semibold py-2 px-3 rounded-lg bg-[#1b2f1a] border border-[#2d4020] text-[#a8b885] hover:border-[#8b9b6a] hover:text-[#c8d94b] transition-all"
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
