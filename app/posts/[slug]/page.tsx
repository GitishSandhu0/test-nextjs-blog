import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { findPostBySlug } from "@/lib/posts";

export const revalidate = 0;

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await findPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: `${post.title} | Simple Blog`,
    description: post.summary,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await findPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-4 py-16">
      <div>
        <Link href="/" className="text-sm font-semibold text-blue-600">
          ← Back to all posts
        </Link>
        <p className="mt-6 text-sm uppercase tracking-[0.25em] text-gray-400">
          {new Intl.DateTimeFormat("en", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(post.createdAt))}
        </p>
        <h1 className="mt-3 text-4xl font-bold text-gray-900">{post.title}</h1>
        <p className="mt-4 text-xl text-gray-600">{post.summary}</p>
      </div>

      <div className="space-y-4 text-lg leading-relaxed text-gray-800">
        {post.content.split(/\r?\n\s*\r?\n/).map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
