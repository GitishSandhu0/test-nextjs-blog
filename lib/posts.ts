import client from "@/lib/mongodb";
import type { Collection, WithId } from "mongodb";

export type BlogPost = {
  title: string;
  slug: string;
  summary: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

const COLLECTION = "blogposts";
const preferredDb = process.env.MONGODB_DB || process.env.MONGODB_DATABASE;

async function getCollection(): Promise<Collection<BlogPost>> {
  const mongoClient = await client.connect();
  const db = preferredDb ? mongoClient.db(preferredDb) : mongoClient.db();
  return db.collection<BlogPost>(COLLECTION);
}

export async function listPosts(): Promise<WithId<BlogPost>[]> {
  const collection = await getCollection();
  return collection
    .find()
    .sort({ createdAt: -1 })
    .toArray();
}

export async function findPostBySlug(
  slug: string,
): Promise<WithId<BlogPost> | null> {
  const collection = await getCollection();
  return collection.findOne({ slug });
}

type CreatePostInput = {
  title: string;
  content: string;
  summary?: string;
  slug?: string;
};

export async function createPost(input: CreatePostInput) {
  const collection = await getCollection();
  const now = new Date();
  const slug = await ensureUniqueSlug(
    input.slug?.trim() || slugify(input.title),
    collection,
  );
  const summary =
    input.summary?.trim() || buildSummaryFromContent(input.content.trim());

  const doc: BlogPost = {
    title: input.title.trim(),
    slug,
    content: input.content.trim(),
    summary,
    createdAt: now,
    updatedAt: now,
  };

  await collection.insertOne(doc);
  return doc;
}

async function ensureUniqueSlug(
  baseSlug: string,
  collection: Collection<BlogPost>,
) {
  let candidate = baseSlug;
  let suffix = 1;
  // Add numeric suffix until slug is unique
  while (await collection.findOne({ slug: candidate })) {
    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
  return candidate;
}

function slugify(source: string) {
  return source
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "post";
}

function buildSummaryFromContent(content: string) {
  const compact = content.replace(/\s+/g, " ").trim();
  return compact.length > 180 ? `${compact.slice(0, 177)}...` : compact;
}
