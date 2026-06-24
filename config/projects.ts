import { ValidCategory, ValidExpType, ValidSkills } from "./constants";

interface PagesInfoInterface {
  title: string;
  imgArr: string[];
  description?: string;
}

interface DescriptionDetailsInterface {
  paragraphs: string[];
  bullets: string[];
}

export interface ProjectInterface {
  id: string;
  type: ValidExpType;
  companyName: string;
  category: ValidCategory[];
  shortDescription: string;
  websiteLink?: string;
  githubLink?: string;
  techStack: ValidSkills[];
  startDate: Date;
  endDate: Date;
  companyLogoImg: any;
  descriptionDetails: DescriptionDetailsInterface;
  pagesInfoArr: PagesInfoInterface[];
}

// Template — copy this shape when adding a new project below.
// {
//   id: "portfolio-template",
//   companyName: "Portfolio Website (130+ GitHub stars)",
//   type: "Personal",
//   category: ["Web Dev", "Frontend", "UI/UX"],
//   shortDescription:
//     "Open-source Next.js portfolio template recognized and forked by developers worldwide, optimized for SEO/AEO and performance.",
//   websiteLink: "https://nbarkiya.xyz",
//   githubLink: "https://github.com/namanbarkiya/minimal-next-portfolio",
//   techStack: [
//     "Next.js",
//     "React",
//     "Typescript",
//     "Tailwind CSS",
//     "Framer Motion",
//     "Vercel",
//   ],
//   startDate: new Date("2024-01-01"),
//   endDate: new Date("2025-12-01"),
//   companyLogoImg: "/projects/portfolio/logo.png",
//   pagesInfoArr: [
//     {
//       title: "Landing & Sections",
//       description:
//         "A clean, minimal landing page with sections for skills, projects, contributions, and experience.",
//       imgArr: ["/profile-img.jpg"],
//     },
//   ],
//   descriptionDetails: {
//     paragraphs: [
//       "I created an open-source Next.js portfolio template to help developers ship a modern, responsive portfolio quickly.",
//       "The project focuses heavily on performance, clean typography, and strong SEO/AEO foundations, and it has been adopted and forked by developers globally.",
//     ],
//     bullets: [
//       "Created an open-source Next.js portfolio template recognized and forked by developers worldwide.",
//       "Ranked #1 on ChatGPT search for “best Next.js portfolio template GitHub” through AEO/GEO optimization.",
//       "Maintained a fast, responsive UI with a minimal, themeable design system.",
//     ],
//   },
// },

export const Projects: ProjectInterface[] = [
  {
    id: "spirit-island-multiplayer-monitor",
    companyName: "Spirit Island Multiplayer Monitor",
    type: "Personal",
    category: ["Backend"],
    shortDescription:
      "Python background utility that watches Spirit Island's multiplayer log file and pings my phone over Telegram the moment someone joins my lobby, so I don't have to sit waiting in front of the PC.",
    githubLink:
      "https://github.com/briangohjw/Spirit-Island-Multiplayer-Monitor",
    techStack: ["Python"],
    startDate: new Date("2025-09-09"),
    endDate: new Date("2025-09-09"),
    companyLogoImg: "/projects/spirit-island/si1.png",
    pagesInfoArr: [
      {
        title: "Lobby Join Monitoring",
        description:
          "Watches Spirit Island's local log file for multiplayer join events and pings my phone over Telegram, so I can rest away from the PC until someone actually joins.",
        imgArr: [
          "/projects/spirit-island/si1.png",
          "/projects/spirit-island/si2.png",
          "/projects/spirit-island/si3.png",
        ],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "Spirit Island is a multiplayer board game with so few active players that lobbies can sit open for ages before anyone joins. My pain point was having to sit in front of the PC the whole time just to catch the moment someone finally joined.",
        "Spirit Island Multiplayer Monitor solves that by tailing the game's local log file for join events and pushing a Telegram notification straight to my phone, so I can rest in bed and still know instantly when a lobby fills up.",
      ],
      bullets: [
        "Built a log-tailing detector for Spirit Island's local Player.log to identify multiplayer join events in real time.",
        "Implemented smart filtering to avoid false alerts from unrelated log entries.",
        "Integrated Telegram Bot API notifications (plus native Windows desktop alerts) so joins reach my phone without needing to watch the PC.",
        "Added persistent configuration so user settings are saved across runs.",
        "Runs entirely locally with no external data collection beyond the optional Telegram integration.",
      ],
    },
  },
];

export const featuredProjects = Projects.slice(0, 3);
