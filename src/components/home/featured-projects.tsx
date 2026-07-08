import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal } from "@/components/common/reveal";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/projects/project-card";
import { InProgressCard } from "@/components/projects/in-progress-card";
import type { Project, InProgressProject } from "@/types/project";

export function FeaturedProjects({
  projects,
  inProgress = [],
}: {
  projects: Project[];
  inProgress?: InProgressProject[];
}) {
  const t = useTranslations("FeaturedProjects");
  const tp = useTranslations("ProjectsPage");

  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          className="max-w-xl"
        />
        <Reveal delay={0.15}>
          <Button href="/projects" variant="outline">
            {t("viewAll")}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Reveal>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.1}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      {inProgress.length > 0 && (
        <div className="mt-20">
          <SectionHeading eyebrow={tp("upcomingEyebrow")} title={tp("upcomingTitle")} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {inProgress.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.1}>
                <InProgressCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
