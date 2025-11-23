import Link from "next/link";

import { listPosts } from "@/lib/posts";

export const revalidate = 0;

const dateFormatter = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export default async function HomePage() {
  const posts = await listPosts();

  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col gap-12 px-4 py-16">
      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
          Simple blog
        </p>
        <h1 className="text-4xl font-bold leading-tight md:text-5xl">
          Blog Site
        </h1>
        <p className="text-lg text-gray-600">
          This is a blog page in Next.js with MongoDB and Tailwind
        </p>
        <div className="flex gap-3">
          <Link
            href="/admin"
            className="rounded-md px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Open admin panel
          </Link>
          <a
            href="#posts"
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 transition hover:border-gray-900"
          >
            Read posts
          </a>
        </div>
      </header>

      <section id="posts" className="space-y-6">
        <h2 className="text-2xl font-bold">Latest posts</h2>
        {posts.length === 0 ? (
          <p className="text-gray-600">
            No posts yet. Be the first to publish something from the admin page.
          </p>
        ) : (
          <ol className="space-y-6">
            {posts.map((post) => (
              <li key={post._id.toString()} className="rounded-xl border border-gray-200 p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-gray-400">
                  {dateFormatter.format(new Date(post.createdAt))}
                </p>
                <h3 className="mt-2 text-2xl font-semibold">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="transition hover:text-blue-600"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-3 text-gray-600">{post.summary}</p>
                <div className="mt-4">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-sm font-semibold text-blue-600"
                  >
                    Read more →
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}
