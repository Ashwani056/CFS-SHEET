"use client";
import React from "react";

type Props = React.ComponentProps<"a"> & { href: string };

export default function MintButton({
  href,
  className = "",
  children,
  ...rest
}: Props) {
  return (
    <a
      href={href}
      className={
        [
          "inline-flex items-center justify-center rounded-xl",
          "bg-emerald-400 text-neutral-900",
          "px-6 py-3 font-medium",
          "border border-emerald-300/40",
          "shadow-[0_10px_30px_-12px_rgba(16,185,129,0.65)]",
          "transition-colors transition-transform",
          "hover:bg-emerald-300 active:scale-[0.99]",
          "focus:outline-none focus:ring-2 focus:ring-emerald-300/60",
        ].join(" ") + (className ? " " + className : "")
      }
      {...rest}
    >
      {children}
    </a>
  );
}
