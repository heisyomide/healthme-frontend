// components/GlassCard.tsx
import React from "react";
import clsx from "clsx";

export default function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx("glass", "transition-transform", "duration-300", className)}>
      {children}
    </div>
  );
}