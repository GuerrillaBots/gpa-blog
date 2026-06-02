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
      <body className="min-h-full flex flex-col bg-[#0d1509] text-[#e8e4d8]">
        <header className="border-b border-[#2d4020] px-6 py-4">
          <div className="mx-auto max-w-5xl flex items-center justify-between">
            <a
              href="/"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              className="text-sm font-semibold tracking-widest text-[#8b9b6a] uppercase"
            >
              Guerrilla Process Automation
            </a>
            <a
              href="https://guerrillabots.com"
              className="text-xs text-[#6b7a55] hover:text-[#8b9b6a] transition-colors"
            >
              guerrillabots.com →
            </a>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-[#2d4020] px-6 py-6 mt-16">
          <div className="mx-auto max-w-5xl text-xs text-[#4a5a35]">
            © {new Date().getFullYear()} Guerrilla Bots. Built for the last mile.
          </div>
        </footer>
      </body>
    </html>
  );
}
