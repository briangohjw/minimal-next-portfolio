import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Icons } from "@/components/common/icons";
import ProjectDescription from "@/components/projects/project-description";
import { buttonVariants } from "@/components/ui/button";
import ChipContainer from "@/components/ui/chip-container";
import CustomTooltip from "@/components/ui/custom-tooltip";
import { Projects } from "@/config/projects";
import { siteConfig } from "@/config/site";
import { findMediumPostByUrl } from "@/lib/medium";
import { cn, formatDateFromObj } from "@/lib/utils";
import profileImg from "@/public/profile-img.jpg";

interface ProjectPageProps {
  params: Promise<{
    projectId: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { projectId } = await params;
  const project = Projects.find((val) => val.id === projectId);
  if (!project) return {};

  const url = `${siteConfig.url}/projects/${project.id}`;
  const title = project.companyName;
  const description = project.shortDescription;
  const image =
    typeof project.companyLogoImg === "string"
      ? project.companyLogoImg
      : siteConfig.ogImage;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

const githubUsername = "namanbarkiya";

export default async function Project({ params }: ProjectPageProps) {
  const { projectId } = await params;
  let project = Projects.find((val) => val.id === projectId);
  if (!project) {
    redirect("/projects");
  }

  const articlePost = project.articleLink
    ? await findMediumPostByUrl(project.articleLink)
    : null;

  return (
    <article className="container relative max-w-3xl py-6 lg:py-10">
      <Link
        href="/projects"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-[-200px] top-14 hidden xl:inline-flex"
        )}
      >
        <Icons.chevronLeft className="mr-2 h-4 w-4" />
        All Projects
      </Link>
      <div>
        <time
          dateTime={Date.now().toString()}
          className="block text-sm text-muted-foreground"
        >
          {formatDateFromObj(project.startDate)}
        </time>
        <h1 className="flex items-center justify-between mt-2 font-heading text-4xl leading-tight lg:text-5xl">
          {project.companyName}
          <div className="flex items-center">
            {project.githubLink && (
              <CustomTooltip text="Link to the source code.">
                <Link href={project.githubLink} target="_blank">
                  <Icons.gitHub className="w-6 ml-4 text-muted-foreground hover:text-foreground" />
                </Link>
              </CustomTooltip>
            )}
            {project.websiteLink && (
              <CustomTooltip text="Please note that some project links may be temporarily unavailable.">
                <Link href={project.websiteLink} target="_blank">
                  <Icons.externalLink className="w-6 ml-4 text-muted-foreground hover:text-foreground " />
                </Link>
              </CustomTooltip>
            )}
          </div>
        </h1>
        <ChipContainer textArr={project.category} />
        <div className="mt-4 flex space-x-4">
          <Link
            href={siteConfig.links.github}
            className="flex items-center space-x-2 text-sm"
          >
            <Image
              src={profileImg}
              alt={"naman"}
              width={42}
              height={42}
              className="rounded-full bg-background"
            />

            <div className="flex-1 text-left leading-tight">
              <p className="font-medium">{"Brian Goh"}</p>
              <p className="text-[12px] text-muted-foreground">
                @{siteConfig.username}
              </p>
            </div>
          </Link>
        </div>
      </div>

      {project.demoVideoUrl ? (
        <div
          className="relative my-8 w-full overflow-hidden rounded-md border bg-muted"
          style={{ height: 0, paddingBottom: "58.002148227712134%" }}
        >
          <iframe
            src={project.demoVideoUrl}
            allow="autoplay; fullscreen"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      ) : (
        <Image
          src={project.companyLogoImg}
          alt={project.companyName}
          width={720}
          height={405}
          className="my-8 rounded-md border bg-muted transition-colors"
          priority
        />
      )}

      <div className="mb-7 ">
        <h2 className="inline-block font-heading text-3xl leading-tight lg:text-3xl mb-2">
          Tech Stack
        </h2>
        <ChipContainer textArr={project.techStack} />
      </div>

      <div className="mb-7 ">
        <h2 className="inline-block font-heading text-3xl leading-tight lg:text-3xl mb-2">
          Description
        </h2>
        {/* {<project.descriptionComponent />} */}
        <ProjectDescription
          paragraphs={project.descriptionDetails.paragraphs}
          bullets={project.descriptionDetails.bullets}
        />
      </div>

      {project.implementationDetails && (
        <div className="mb-7 ">
          <h2 className="inline-block font-heading text-3xl leading-tight lg:text-3xl mb-2">
            Implementation
          </h2>
          <ProjectDescription
            paragraphs={project.implementationDetails.paragraphs}
            bullets={project.implementationDetails.bullets}
          />
        </div>
      )}

      <div className="mb-7 ">
        <h2 className="inline-block font-heading text-3xl leading-tight lg:text-3xl mb-5">
          Page Info
        </h2>
        {project.pagesInfoArr.map((page, ind) => (
          <div key={ind}>
            <h3 className="flex items-center font-heading text-xl leading-tight lg:text-xl mt-3">
              <Icons.star className="h-5 w-5 mr-2" /> {page.title}
            </h3>
            <div>
              <p>{page.description}</p>
              {page.imgArr.map((img, ind) => (
                <Image
                  src={img}
                  key={ind}
                  alt={img}
                  width={720}
                  height={405}
                  className="my-4 rounded-md border bg-muted transition-colors"
                  priority
                />
              ))}
              {page.videoArr?.map((video, ind) => (
                <div
                  key={ind}
                  className="relative my-4 aspect-video w-full max-w-[720px] overflow-hidden rounded-md border bg-muted"
                >
                  <iframe
                    src={video}
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {project.futureImprovementsDetails && (
        <div className="mb-7 ">
          <h2 className="inline-block font-heading text-3xl leading-tight lg:text-3xl mb-2">
            Future Improvements
          </h2>
          <ProjectDescription
            paragraphs={project.futureImprovementsDetails.paragraphs}
            bullets={project.futureImprovementsDetails.bullets}
          />
        </div>
      )}

      {project.articleLink && (
        <div className="mb-7">
          <h2 className="inline-block font-heading text-3xl leading-tight lg:text-3xl mb-2">
            Further Reading
          </h2>
          {project.articleNote && (
            <p className="mb-4 text-muted-foreground">{project.articleNote}</p>
          )}
          <a
            href={project.articleLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col overflow-hidden rounded-lg border border-border transition-colors hover:bg-muted sm:flex-row"
          >
            {articlePost?.coverImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={articlePost.coverImage}
                alt={articlePost.title ?? "Article preview"}
                className="h-44 w-full object-cover sm:h-auto sm:w-56 sm:flex-shrink-0"
              />
            )}
            <div className="flex flex-1 flex-col justify-center gap-1.5 p-4">
              <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <Icons.post className="h-3.5 w-3.5" />
                Medium
              </span>
              <p className="font-semibold leading-snug">
                {articlePost?.title ?? "Read the full write-up"}
              </p>
              {articlePost?.description && (
                <p className="line-clamp-3 text-sm text-muted-foreground">
                  {articlePost.description}
                </p>
              )}
              <span className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                Read on Medium
                <Icons.externalLink className="h-3.5 w-3.5" />
              </span>
            </div>
          </a>
        </div>
      )}

      <hr className="mt-12" />
      <div className="flex justify-center py-6 lg:py-10">
        <Link
          href="/projects"
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          All Projects
        </Link>
      </div>
    </article>
  );
}
