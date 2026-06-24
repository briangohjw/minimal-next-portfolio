import Parser from "rss-parser";

import { siteConfig } from "@/config/site";

import { BlogMeta } from "./blogs";

const MEDIUM_FEED_URL = `${siteConfig.links.medium}/feed`;

type MediumItem = {
  title?: string;
  link?: string;
  guid?: string;
  pubDate?: string;
  contentEncoded?: string;
};

const parser = new Parser<unknown, MediumItem>({
  customFields: {
    item: [["content:encoded", "contentEncoded"]],
  },
});

function slugFromLink(link: string): string {
  // Medium links look like .../post-title-<12-char-hex-id>?source=...
  const path = link.split("?")[0];
  const last = path.split("/").pop() ?? path;
  return `medium-${last}`;
}

function firstImage(html: string): string | undefined {
  const match = html.match(/<img[^>]+src="([^"]+)"/);
  return match?.[1];
}

/** Plain-text first paragraph's first sentence, used as the card preview blurb. */
function firstSentence(html: string): string {
  const withBreaks = html.replace(/<\/(p|h[1-6]|li|blockquote)>/gi, "\n");
  const text = withBreaks.replace(/<[^>]+>/g, "");
  const firstParagraph = text.split("\n").map((s) => s.trim()).find(Boolean) ?? "";

  const sentenceMatch = firstParagraph.match(/^.*?[.!?](?=\s|$)/);
  const sentence = (sentenceMatch ? sentenceMatch[0] : firstParagraph).trim();

  return sentence.length > 240 ? `${sentence.slice(0, 237).trimEnd()}…` : sentence;
}

function estimateReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, " ");
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

function toBlogMeta(item: MediumItem): BlogMeta | undefined {
  if (!item.link || !item.title) return undefined;

  const html = item.contentEncoded ?? "";

  return {
    slug: slugFromLink(item.link),
    title: item.title,
    date: item.pubDate ?? new Date().toISOString(),
    description: firstSentence(html),
    tags: [],
    coverImage: firstImage(html),
    readingTime: estimateReadingTime(html),
    externalUrl: item.link,
  };
}

/** Fetches and parses posts from the Medium RSS feed. Returns [] on any failure. */
export async function fetchMediumPosts(): Promise<BlogMeta[]> {
  try {
    const res = await fetch(MEDIUM_FEED_URL, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];

    const xml = await res.text();
    const feed = await parser.parseString(xml);

    return (feed.items ?? [])
      .map(toBlogMeta)
      .filter((post): post is BlogMeta => Boolean(post));
  } catch {
    return [];
  }
}
