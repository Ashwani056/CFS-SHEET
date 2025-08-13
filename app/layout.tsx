import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeForSuccess – DSA & System Design",
  description: "Learn DSA, System Design, and Java with structured tracks.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-neutral-950 text-white">{children}</body>
    </html>
  );
}
