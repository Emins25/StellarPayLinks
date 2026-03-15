import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StellarPay Links",
  description: "Generate Stellar payment links and QR codes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-950 text-gray-100 font-sans antialiased">
        <header className="border-b border-gray-800 px-6 py-4">
          <a href="/" className="text-xl font-semibold tracking-tight text-indigo-400 hover:text-indigo-300">
            ✦ StellarPay Links
          </a>
        </header>
        <main className="max-w-2xl mx-auto px-6 py-10">{children}</main>
      </body>
    </html>
  );
}
