"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal } from "@/components/common/reveal";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { ExperienceEntry } from "@/types/experience";

export function Experience({ items }: { items: ExperienceEntry[] }) {
  const t = useTranslations("Experience");

  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
      <div className="relative mt-14">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--card-border)]" aria-hidden />

        <div className="flex flex-col gap-8">
          {items.map((item, i) => (
            <ExperienceCard key={item.id} item={item} delay={i * 0.05} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  item,
  delay,
  t,
}: {
  item: ExperienceEntry;
  delay: number;
  t: ReturnType<typeof useTranslations<"Experience">>;
}) {
  const [expanded, setExpanded] = useState(item.current);

  return (
    <Reveal delay={delay} className="relative pl-10">
      <span
        className={cn(
          "absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 bg-[var(--background)]",
          item.current ? "border-[var(--accent)]" : "border-[var(--card-border)]"
        )}
      />
      {item.current && (
        <span className="absolute left-0 top-1.5 h-3.5 w-3.5 animate-ping rounded-full bg-[var(--accent)] opacity-40" />
      )}

      <div className="rounded-[var(--radius-lg)] border border-[var(--card-border)] bg-[var(--card)] p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-semibold">{item.title}</h3>
              {item.current && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 text-xs font-medium text-[var(--accent)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  {t("current")}
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">
              {item.company ?? t("selfDirected")}
              {item.location && ` · ${item.location}`}
            </p>
          </div>
          <span className="whitespace-nowrap text-sm text-[var(--muted-foreground)]">{item.period}</span>
        </div>

        {expanded && (
          <>
            <ul className="mt-4 flex flex-col gap-2">
              {item.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2.5 text-sm leading-relaxed text-[var(--muted-foreground)]">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                  {bullet}
                </li>
              ))}
            </ul>

            {item.projectSlug && (
              <Link
                href={`/projects/${item.projectSlug}`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)] hover:underline"
              >
                {t("viewCaseStudy")}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </>
        )}

        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] hover:underline"
        >
          {expanded ? t("hideDetails") : t("showDetails")}
          <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", expanded && "rotate-180")} />
        </button>
      </div>
    </Reveal>
  );
}
