import type { Metadata } from "next";

import AdminForm from "./admin-form";

export const metadata: Metadata = {
  title: "Blog Admin",
  description: "Publish new posts for the demo blog.",
};

export default function AdminPage() {
  const requireToken = Boolean(process.env.ADMIN_TOKEN);

  return (
    <section className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Admin Panel
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          Publish a new post
        </h1>
        <p className="mt-2 text-slate-600">
          {requireToken
            ? "An admin token is required. Please ensure you have the correct permissions."
            : "No admin token is set. Anyone can publish posts."}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <AdminForm requireToken={requireToken} />
      </div>
    </section>
  );
}
