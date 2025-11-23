"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";

import { publishPostAction, type PublishResult } from "@/app/actions";

const initialState: PublishResult = { success: false, message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="w-full rounded-md bg-black px-4 py-2 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-wait disabled:bg-gray-500"
      disabled={pending}
    >
      {pending ? "Publishing..." : "Publish post"}
    </button>
  );
}

type AdminFormProps = {
  requireToken: boolean;
};

export default function AdminForm({ requireToken }: AdminFormProps) {
  const [state, formAction] = useFormState(publishPostAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="block text-sm font-medium" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          placeholder="Post title"
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-base"
        />
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="summary">
          Summary
        </label>
        <textarea
          id="summary"
          name="summary"
          placeholder="Short description shown on the homepage"
          rows={2}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-base"
        />
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="content">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          required
          placeholder="Write freely. Markdown is supported by most blog editors, but this form will render plain text."
          rows={10}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-base"
        />
      </div>

      {requireToken && (
        <div>
          <label className="block text-sm font-medium" htmlFor="token">
            Admin token
          </label>
          <input
            id="token"
            name="token"
            type="password"
            required
            placeholder="Enter the server-side admin token"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-base"
          />
        </div>
      )}

      <SubmitButton />

      {state.message && (
        <p className={state.success ? "text-green-600" : "text-red-600"}>
          {state.message}
        </p>
      )}

      {state.success && state.slug && (
        <p>
          <Link
            href={`/posts/${state.slug}`}
            className="text-sm font-semibold text-blue-600 underline"
          >
            View published post
          </Link>
        </p>
      )}
    </form>
  );
}
