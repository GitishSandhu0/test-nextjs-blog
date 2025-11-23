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
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Blogs &amp; Articles
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-600">
          A Demo Blog for my interview!!! Please give me job. Thanks
        </p>
      </div>

      <section id="posts" className="space-y-8">
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center">
            <p className="text-slate-500">
              No posts yet. Be the first to publish something from the{" "}
              <Link href="/admin" className="font-semibold text-blue-600 hover:underline">
                admin page
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post._id.toString()}
                className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex items-center gap-x-4 text-xs text-slate-500">
                  <time dateTime={post.createdAt.toISOString()}>
                    {dateFormatter.format(new Date(post.createdAt))}
                  </time>
                </div>
                <h3 className="mb-2 text-xl font-semibold leading-6 text-slate-900 transition-colors group-hover:text-blue-600">
                  <Link href={`/posts/${post.slug}`}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </Link>
                </h3>
                <p className="flex-1 text-sm leading-6 text-slate-600 line-clamp-3">
                  {post.summary}
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-blue-600">
                  Read article{" "}
                  <span aria-hidden="true" className="ml-1">
                    &rarr;
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
