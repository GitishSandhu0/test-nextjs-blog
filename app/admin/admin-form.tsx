"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { publishPostAction, type PublishResult } from "@/app/actions";

const initialState: PublishResult = { success: false, message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:bg-blue-400"
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
  const [state, formAction] = useActionState(publishPostAction, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label
          className="block text-sm font-medium leading-6 text-slate-900"
          htmlFor="title"
        >
          Title
        </label>
        <div className="mt-2">
          <input
            id="title"
            name="title"
            type="text"
            required
            placeholder="Enter post title"
            className="block w-full rounded-md border-0 px-3 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label
          className="block text-sm font-medium leading-6 text-slate-900"
          htmlFor="summary"
        >
          Summary
        </label>
        <div className="mt-2">
          <textarea
            id="summary"
            name="summary"
            placeholder="Short description shown on the homepage"
            rows={3}
            className="block w-full rounded-md border-0 px-3 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label
          className="block text-sm font-medium leading-6 text-slate-900"
          htmlFor="content"
        >
          Content
        </label>
        <div className="mt-2">
          <textarea
            id="content"
            name="content"
            required
            placeholder="Write your post content here..."
            rows={12}
            className="block w-full rounded-md border-0 px-3 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
        <p className="mt-2 text-xs text-slate-500">
          Markdown is not supported yet, but paragraphs are preserved.
        </p>
      </div>

      {requireToken && (
        <div>
          <label
            className="block text-sm font-medium leading-6 text-slate-900"
            htmlFor="token"
          >
            Admin token
          </label>
          <div className="mt-2">
            <input
              id="token"
              name="token"
              type="password"
              required
              placeholder="Enter admin token"
              className="block w-full rounded-md border-0 px-3 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      )}

      <div className="pt-2">
        <SubmitButton />
      </div>

      {state.message && (
        <div
          className={`rounded-md p-4 ${
            state.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          <p className="text-sm font-medium">{state.message}</p>
          {state.success && state.slug && (
            <p className="mt-2 text-sm">
              <Link
                href={`/posts/${state.slug}`}
                className="font-semibold underline hover:text-green-800"
              >
                View published post &rarr;
              </Link>
            </p>
          )}
        </div>
      )}
    </form>
  );
}
