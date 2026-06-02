import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "content/posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readTime: number;
  pillar?: string;
}

export interface Post extends PostMeta {
  content: string;
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(postsDir, file), "utf-8");
      const { data, content } = matter(raw);
      const wordCount = content.split(/\s+/).length;
      return {
        slug: file.replace(".mdx", ""),
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        readTime: Math.ceil(wordCount / 200),
        pillar: data.pillar,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post {
  const raw = fs.readFileSync(path.join(postsDir, `${slug}.mdx`), "utf-8");
  const { data, content } = matter(raw);
  const wordCount = content.split(/\s+/).length;
  return {
    slug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    readTime: Math.ceil(wordCount / 200),
    pillar: data.pillar,
    content,
  };
}
