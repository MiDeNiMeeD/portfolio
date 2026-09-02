"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function ShowMore({
  children,
  collapsedHeight = 220,
  moreLabel,
  lessLabel,
  className,
}: {
  children: ReactNode;
  collapsedHeight?: number;
  moreLabel: string;
  lessLabel: string;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={className}>
      <div className="relative">
        <div
          className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
          style={{ maxHeight: expanded ? 2000 : collapsedHeight }}
        >
          {children}
        </div>
        {!expanded && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--background)] to-transparent" />
        )}
      </div>
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] hover:underline"
      >
        {expanded ? lessLabel : moreLabel}
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", expanded && "rotate-180")} />
      </button>
    </div>
  );
}
