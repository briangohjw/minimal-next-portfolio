export interface OgData {
  title?: string;
  image?: string;
  description?: string;
  siteName?: string;
}

function decodeHtmlEntities(input: string): string {
  return input
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

// Fetches Open Graph / Twitter card metadata for a URL, server-side.
// Cached for an hour so edits on the source (e.g. a Medium description) show up
// within ~an hour. Returns null on any failure (blocked, offline, no tags) so
// callers can fall back gracefully.
export async function fetchOgData(url: string): Promise<OgData | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const html = await res.text();

    const pick = (property: string): string | undefined => {
      const patterns = [
        new RegExp(
          `<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']*)["']`,
          "i"
        ),
        new RegExp(
          `<meta[^>]+content=["']([^"']*)["'][^>]+(?:property|name)=["']${property}["']`,
          "i"
        ),
      ];
      for (const re of patterns) {
        const match = html.match(re);
        if (match?.[1]) return decodeHtmlEntities(match[1]);
      }
      return undefined;
    };

    const data: OgData = {
      title: pick("og:title") ?? pick("twitter:title"),
      image: pick("og:image") ?? pick("twitter:image"),
      description: pick("og:description") ?? pick("twitter:description"),
      siteName: pick("og:site_name"),
    };

    if (!data.title && !data.image) return null;
    return data;
  } catch {
    return null;
  }
}
