import fs from "fs";
import path from "path";

import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

import { fetchMediumPosts } from "./medium";

const BLOGS_DIR = path.join(process.cwd(), "content/blogs");

export interface BlogFrontmatter {
  title: string;
  date: string;
  description: string;
  tags: string[];
  coverImage?: string;
  readingTime?: number;
  featured?: boolean;
  /** If set, the blog card links out to this URL (e.g. a Medium post) instead of an internal page. */
  externalUrl?: string;
}

export interface BlogMeta extends BlogFrontmatter {
  slug: string;
}

export interface BlogPost extends BlogMeta {
  contentHtml: string;
}

function ensureBlogsDir() {
  if (!fs.existsSync(BLOGS_DIR)) {
    fs.mkdirSync(BLOGS_DIR, { recursive: true });
  }
}

/** Returns all blog slugs (file names without .md) */
export function getAllBlogSlugs(): string[] {
  ensureBlogsDir();
  return fs
    .readdirSync(BLOGS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

/** Returns metadata for all blogs, sorted newest first */
export function getAllBlogsMeta(): BlogMeta[] {
  ensureBlogsDir();
  const slugs = getAllBlogSlugs();

  const blogs = slugs.map((slug) => {
    const filePath = path.join(BLOGS_DIR, `${slug}.md`);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data } = matter(raw);
    return {
      slug,
      ...(data as BlogFrontmatter),
    } as BlogMeta;
  });

  return blogs.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/** Returns full blog post (metadata + parsed HTML content) for a given slug */
export async function getBlogPost(slug: string): Promise<BlogPost> {
  const filePath = path.join(BLOGS_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content);

  const contentHtml = processed.toString();

  return {
    slug,
    ...(data as BlogFrontmatter),
    contentHtml,
  };
}

/** Returns local posts plus posts pulled live from the Medium RSS feed, sorted newest first */
export async function getAllBlogsWithMedium(): Promise<BlogMeta[]> {
  const [local, medium] = await Promise.all([
    getAllBlogsMeta(),
    fetchMediumPosts(),
  ]);

  return [...local, ...medium].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/** Returns the featured blogs (marked featured: true), falling back to the latest 3 */
export async function getFeaturedBlogs(): Promise<BlogMeta[]> {
  const all = await getAllBlogsWithMedium();
  const featured = all.filter((b) => b.featured);
  return featured.length > 0 ? featured.slice(0, 3) : all.slice(0, 3);
}

/** Estimates reading time from raw markdown content */
export function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
