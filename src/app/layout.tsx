"use client";

import { usePathname } from "next/navigation";
import Header from "./components/Header"; // adjust if your Header path is different
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Show header only on home page
  const showHeader = pathname === "/";

  return (
    <html lang="en">
      <body className="bg-white text-slate-800">
        {showHeader && <Header />}
        <main className={showHeader ? "pt-20" : ""}>{children}</main>
      </body>
    </html>
  );
}