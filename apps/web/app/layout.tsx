import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "My Official Site",
  description: "Next.js + NestJS + Vercel practice"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
        {/* 顶部导航 */}
        <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur">
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-white">
                M
              </span>
              <span>My Official Site</span>
            </Link>

            <nav className="flex items-center gap-2">
              <Link
                href="/"
                className="rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                首页
              </Link>
              <Link
                href="/records"
                className="rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                购买记录
              </Link>
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
              >
                Live Demo
              </a>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>

        <footer className="border-t border-slate-200/60">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-500">
            © {new Date().getFullYear()} My Official Site. Built with Next.js + NestJS.
          </div>
        </footer>
      </body>
    </html>
  );
}
