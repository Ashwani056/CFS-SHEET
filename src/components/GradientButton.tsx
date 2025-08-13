"use client";

interface GradientButtonProps {
  href: string;
  children: React.ReactNode;
}

export function GradientButton({ href, children }: GradientButtonProps) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 px-5 py-3 text-sm font-medium text-black hover:opacity-90 transition"
    >
      {children}
    </a>
  );
}
