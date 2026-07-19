import Image from "next/image";
import Link from "next/link";

import { Icons } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import ChipContainer from "@/components/ui/chip-container";
import { ProjectInterface } from "@/config/projects";

interface ProjectCardProps {
  project: ProjectInterface;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const projectHref = `/projects/${project.id}`;

  return (
    <div className="relative p-6 w-full bg-background border border-border rounded-lg h-full flex flex-col">
      <Link
        href={projectHref}
        aria-label={`View ${project.companyName}`}
        className="relative block w-full h-[200px] flex-shrink-0 overflow-hidden rounded-lg border border-border"
      >
        <Image
          className="object-cover transition-transform duration-300 hover:scale-105"
          src={project.cardPreviewGif ?? project.companyLogoImg}
          alt={`${project.companyName} preview`}
          fill
          unoptimized={!!project.cardPreviewGif}
        />
      </Link>
      <div className="pt-5 space-y-3 flex flex-col flex-grow">
        <Link href={projectHref}>
          <h5 className="text-2xl font-bold tracking-tight text-foreground hover:underline">
            {project.companyName}
          </h5>
        </Link>
        <p className="line-clamp-3 font-normal text-muted-foreground flex-grow">
          {project.shortDescription}
        </p>
        <div className="flex gap-2 flex-wrap">
          <ChipContainer textArr={project.category} />
        </div>
        <Link href={projectHref} className="mt-auto">
          <Button variant={"default"} className="mt-2 w-full sm:w-auto">
            Read more
            <Icons.chevronRight className="w-4 ml-1" />
          </Button>
        </Link>
      </div>
      {/* Project-type badge (👤 Personal / 💼 Professional). Hidden for now
          since every project is Personal; uncomment if pro projects are added. */}
      {/* <div className="absolute bottom-4 right-4 p-3 rounded-full bg-background border border-border hidden md:block">
        {project.type === "Personal" ? (
          <Icons.userFill className="h-4 w-4" />
        ) : (
          <Icons.work className="h-4 w-4" />
        )}
      </div> */}
    </div>
  );
}
