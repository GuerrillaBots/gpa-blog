import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Guerrilla Process Automation — The GPA Blog",
  description:
    "Category-defining writing on GPA, automation's last mile, and the future of intelligent automation CoEs.",
  openGraph: { siteName: "Guerrilla Bots", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-[#f0ede5] text-[#2e3a20]">
        <header className="border-b border-[#d0cbbf] bg-[#f0ede5] px-6 py-4">
          <div className="mx-auto max-w-5xl flex items-center justify-between">
            <a
              href="/"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              className="text-sm font-bold tracking-widest text-[#1a2a12] uppercase"
            >
              Guerrilla Bots
            </a>
            <nav className="flex items-center gap-6">
              <a href="/" className="text-sm text-[#6b7a55] hover:text-[#1a2a12] transition-colors">
                Blog
              </a>
              <a
                href="https://guerrillabots.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-[#1a2a12] hover:text-[#1b2f1a] transition-colors"
              >
                guerrillabots.com →
              </a>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-[#d0cbbf] px-6 py-6 mt-16 bg-[#e8e4d8]">
          <div className="mx-auto max-w-5xl flex items-center justify-between">
            <span className="text-xs text-[#6b7a55]">
              © {new Date().getFullYear()} Guerrilla Bots. Built for the last mile.
            </span>
            <a
              href="https://guerrillabots.com"
              className="text-xs text-[#8b9b6a] hover:text-[#1a2a12] transition-colors"
            >
              guerrillabots.com
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
