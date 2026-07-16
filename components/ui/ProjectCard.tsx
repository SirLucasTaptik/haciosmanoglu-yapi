import Image from "next/image";
import Link from "next/link";
import type { ProjectCardData } from "@/types/project";
import { ProgressBar } from "@/components/ui/ProgressBar";

export function ProjectCard({ project }: { project: ProjectCardData }) {
  return (
    <Link href={`/projeler/${project.slug}`} className="fade-up group block">
      <div className="overflow-hidden rounded-3xl bg-white shadow-sm transition-shadow group-hover:shadow-md">
        <div className="relative h-48 w-full">
          <Image
            src={project.heroImageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-obsidian ${
              project.status === "ongoing" ? "bg-gold/90" : "bg-white/90"
            }`}
          >
            {project.status === "ongoing" ? "Devam Ediyor" : "Tamamlandı"}
          </span>
        </div>
        <div className="p-5">
          <p className="font-semibold text-ink">{project.title}</p>
          <p className="mt-0.5 text-xs text-inkMuted">{project.district}</p>
          {project.status === "ongoing" && (
            <>
              <ProgressBar value={project.progressPercentage} />
              <p className="mt-1 font-mono text-[11px] text-gold-dark">
                %{project.progressPercentage} tamamlandı
              </p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
