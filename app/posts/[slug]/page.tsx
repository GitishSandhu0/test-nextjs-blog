import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { findPostBySlug } from "@/lib/posts";

export const revalidate = 0;

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: PostPageProps): Promise<Metadata> {
  const { slug } = await props.params;
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

export default async function PostPage(props: PostPageProps) {
  const { slug } = await props.params;
  const post = await findPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8 text-center">
        <Link
          href="/"
          className="mb-6 inline-flex items-center text-sm font-medium text-slate-500 transition-colors hover:text-blue-600"
        >
          &larr; Back to home
        </Link>
        <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          {post.title}
        </h1>
        <time className="text-sm text-slate-500">
          {new Intl.DateTimeFormat("en", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(post.createdAt))}
        </time>
      </div>

      <div className="mx-auto text-lg leading-relaxed text-slate-700">
        {post.content.split(/\r?\n\s*\r?\n/).map((paragraph, index) => (
          <p key={index} className="mb-6">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
