import Link from "next/link";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    template: "%s | Simple Blog",
    default: "Simple Blog",
  },
  description:
    "A minimal blog powered by Next.js, MongoDB, and a tiny admin panel.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}>
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
              <Link href="/" className="text-xl font-bold tracking-tight">
                SimpleBlog
              </Link>
              <nav className="flex gap-6 text-sm font-medium text-slate-600">
                <Link
                  href="/"
                  className="transition-colors hover:text-slate-900"
                >
                  Home
                </Link>
                <Link
                  href="/admin"
                  className="transition-colors hover:text-slate-900"
                >
                  Admin
                </Link>
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="mt-12 border-t border-slate-200 py-8 text-center text-sm text-slate-400">
            &copy; {new Date().getFullYear()} Gitish Sandhu. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}
