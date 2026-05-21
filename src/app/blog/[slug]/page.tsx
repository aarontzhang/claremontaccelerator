import Image from "next/image";
import Link from "next/link";
import { getPostBySlug, getAllPostSlugs, getUrlOverrideMap } from "@/lib/posts";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = getAllPostSlugs().map((slug) => ({ slug }));
  const overrides = Object.keys(getUrlOverrideMap()).map((o) => ({ slug: o }));
  return [...slugs, ...overrides];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const post = await resolvePost(slug);
    return { title: `${post.title} — Claremont Accelerator` };
  } catch {
    return { title: "Post not found" };
  }
}

async function resolvePost(slug: string) {
  try {
    return await getPostBySlug(slug);
  } catch {
    const map = getUrlOverrideMap();
    if (map[slug]) return await getPostBySlug(map[slug]);
    throw new Error("not found");
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = await resolvePost(slug);
  } catch {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Cover image — full width, above everything */}
      <div className="relative w-full aspect-[4/1] mt-16">
        <Image
          src={post.banner}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-24">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-[var(--muted)] hover:text-white transition-colors text-sm mt-10 mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Blog
        </Link>

        {/* Title */}
        <h1 className="font-black text-4xl md:text-6xl text-white tracking-tight leading-tight mb-4">
          {post.title}
        </h1>

        {/* Excerpt */}
        <p className="text-[var(--muted-light)] text-xl leading-relaxed mb-8">
          {post.excerpt}
        </p>

        {/* Author row */}
        <div className="flex items-center gap-3 pb-8 border-b border-[var(--border)]">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[var(--border)] flex-shrink-0">
            <Image src={post.authorImage} alt={post.author} fill className="object-cover" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-none mb-1">{post.author}</p>
            <p className="text-[var(--muted)] text-xs">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                timeZone: "UTC",
              })}
            </p>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2 ml-4 flex-wrap">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-2.5 py-0.5 rounded-full border border-[var(--border)] text-[var(--muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Markdown content */}
        <div
          className="prose-blog mt-10"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </div>
    </div>
  );
}
