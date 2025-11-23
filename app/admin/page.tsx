import type { Metadata } from "next";

import AdminForm from "./admin-form";

export const metadata: Metadata = {
  title: "Blog Admin",
  description: "Publish new posts for the demo blog.",
};

export default function AdminPage() {
  const requireToken = Boolean(process.env.ADMIN_TOKEN);

  return (
    <section className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-4 py-16">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
          Admin
        </p>
        <h1 className="mt-2 text-4xl font-bold">Publish a new post</h1>
        <p className="mt-3 text-base text-gray-600">
          {requireToken
            ? "An admin token is required with each submission. Set ADMIN_TOKEN in your .env file and share the value only with trusted people."
            : "No admin token is set. Anyone that can open this page will be able to publish posts."}
        </p>
      </div>

      <AdminForm requireToken={requireToken} />
    </section>
  );
}
