"use server";

import { revalidatePath } from "next/cache";

import { createPost } from "@/lib/posts";

export type PublishResult = {
  success: boolean;
  message: string;
  slug?: string;
};

export async function publishPostAction(
  _prevState: PublishResult,
  formData: FormData,
): Promise<PublishResult> {
  const title = formData.get("title")?.toString().trim();
  const summary = formData.get("summary")?.toString().trim();
  const content = formData.get("content")?.toString().trim();
  const providedToken = formData.get("token")?.toString();

  if (!title || !content) {
    return { success: false, message: "Title and content are required." };
  }

  if (process.env.ADMIN_TOKEN && providedToken !== process.env.ADMIN_TOKEN) {
    return { success: false, message: "Invalid admin token." };
  }

  try {
    const post = await createPost({ title, summary, content });
    await Promise.all([
      revalidatePath("/"),
      revalidatePath("/posts/[slug]", "page"),
    ]);
    return { success: true, message: "Post published.", slug: post.slug };
  } catch (error) {
    console.error("Failed to publish post", error);
    return {
      success: false,
      message: "Failed to publish post. Check server logs for details.",
    };
  }
}
