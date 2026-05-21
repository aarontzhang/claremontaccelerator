import Link from "next/link";
import Image from "next/image";
import { getSortedPostsMetadata } from "@/lib/posts";

export const metadata = {
  title: "Blog — Claremont Accelerator",
  description: "Stories, updates, and insights from the CA community.",
};

export default function BlogPage() {
  const posts = getSortedPostsMetadata();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Publication header */}
      <div className="border-b border-[var(--border)] pt-28 pb-10 px-6 text-center">
        <h1 className="font-black text-4xl md:text-5xl text-white tracking-tight mb-3">
          Claremont Accelerator
        </h1>
        <p className="text-[var(--muted)] text-base max-w-md mx-auto">
          Stories, updates, and insights from the CA community.
        </p>
      </div>

      {/* Post list */}
      <div className="max-w-4xl mx-auto px-6">
        {posts.length === 0 && (
          <p className="text-center text-[var(--muted)] py-16">No posts yet.</p>
        )}
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
            <article className="py-8 border-b border-[var(--border)] flex gap-6 items-start">
              {/* Text */}
              <div className="flex-1 min-w-0">
                {/* Author + date */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="relative w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={post.authorImage}
                      alt={post.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-[var(--muted)] text-sm">
                    <span className="text-white/80 font-medium">{post.author}</span>
                    {" · "}
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      timeZone: "UTC",
                    })}
                  </span>
                </div>

                <h2 className="font-black text-xl md:text-2xl text-white tracking-tight leading-snug mb-2 group-hover:text-[var(--accent-light)] transition-colors">
                  {post.title}
                </h2>
                <p className="text-[var(--muted)] text-sm leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex gap-2 mt-3 flex-wrap">
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

              {/* Thumbnail */}
              <div className="relative w-28 h-20 md:w-36 md:h-24 flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={post.banner}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
