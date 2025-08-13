"use client";

interface StatCounterProps {
  value: number;
  suffix: string;
  label: string;
}

export function StatCounter({ value, suffix, label }: StatCounterProps) {
  return (
    <div>
      <div className="text-3xl font-medium mb-1">
        {value.toLocaleString()}
        {suffix}
      </div>
      <div className="text-sm text-neutral-400">{label}</div>
    </div>
  );
}
