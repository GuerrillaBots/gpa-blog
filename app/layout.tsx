import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Guerrilla Process Automation — The GPA Blog",
  description:
    "Category-defining writing on GPA, automation's last mile, and the future of intelligent automation CoEs.",
  openGraph: {
    siteName: "Guerrilla Bots",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-[#0a0f07] text-[#e8e4d8]">
        <header className="border-b border-[#1e2e12] px-6 py-4">
          <div className="mx-auto max-w-2xl flex items-center justify-between">
            <a href="/" className="font-['Space_Grotesk',sans-serif] text-sm font-600 tracking-wide text-[#8b9b6a] uppercase">
              Guerrilla Process Automation
            </a>
            <a
              href="https://guerrillabots.com"
              className="text-xs text-[#6b7a5a] hover:text-[#8b9b6a] transition"
            >
              guerrillabots.com →
            </a>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-[#1e2e12] px-6 py-6 mt-16">
          <div className="mx-auto max-w-2xl text-xs text-[#4a5a3a]">
            © {new Date().getFullYear()} Guerrilla Bots. Built for the last mile.
          </div>
        </footer>
      </body>
    </html>
  );
}
