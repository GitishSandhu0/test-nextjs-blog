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
      <body className={`${inter.className} bg-[#fafafa] text-[#0b0b0b]`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
