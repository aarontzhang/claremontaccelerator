import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

export interface PostFrontmatter {
  title: string;
  date: string;
  author: string;
  authorImage: string;
  banner: string;
  excerpt: string;
  tags?: string[];
  urlOverrides?: string[];
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
}

export interface Post extends PostMeta {
  contentHtml: string;
}

export function getAllPostSlugs(): string[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getSortedPostsMetadata(): PostMeta[] {
  const slugs = getAllPostSlugs();
  const posts = slugs.map((slug) => {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    return { slug, ...(data as PostFrontmatter) };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  return {
    slug,
    contentHtml,
    ...(data as PostFrontmatter),
  };
}

// Returns a map of urlOverride → post slug for all posts that define urlOverrides.
export function getUrlOverrideMap(): Record<string, string> {
  const slugs = getAllPostSlugs();
  const map: Record<string, string> = {};
  for (const slug of slugs) {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const { data } = matter(fs.readFileSync(fullPath, "utf8"));
    const overrides = (data as PostFrontmatter).urlOverrides ?? [];
    for (const override of overrides) {
      map[override] = slug;
    }
  }
  return map;
}
