import { getPost, getAllPosts } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import ViewCounter from "@/components/ViewCounter";
import ReactionToast from "@/components/ReactionToast";
import { notFound } from "next/navigation";

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
    <article className="mx-auto max-w-2xl px-6 py-16">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4 text-xs text-[#4a5a3a]">
          <time>
            {new Date(post.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          <span>·</span>
          <span>{post.readTime} min read</span>
          <span>·</span>
          <ViewCounter slug={slug} />
        </div>
        <h1
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          className="text-2xl font-bold leading-tight text-[#e8e4d8] tracking-tight mb-4"
        >
          {post.title}
        </h1>
        <p className="text-[#6b7a5a] text-base leading-relaxed">{post.excerpt}</p>
        <div className="mt-6 h-px bg-[#1e2e12]" />
      </div>

      {/* Body */}
      <div className="prose max-w-none">
        <MDXRemote source={post.content} />
      </div>

      {/* Footer */}
      <div className="mt-14 pt-6 border-t border-[#1e2e12]">
        <a
          href="/"
          className="text-sm text-[#6b7a5a] hover:text-[#8b9b6a] transition"
        >
          ← All posts
        </a>
      </div>

      <ReactionToast slug={slug} />
    </article>
  );
}
