import { ValidPages } from "./constants";

type PagesConfig = {
  [key in ValidPages]: {
    title: string;
    description: string;
    metadata: {
      title: string;
      description: string;
    };
    // featuredDescription: string;
  };
};

export const pagesConfig: PagesConfig = {
  home: {
    title: "Home",
    description: "Welcome to my portfolio website.",
    metadata: {
      title: "Home",
      description: "Brian Goh's portfolio website.",
    },
  },
  skills: {
    title: "Skills",
    description: "Key skills that define my professional identity.",
    metadata: {
      title: "Skills",
      description:
        "Brian Goh's key skills that define his professional identity.",
    },
  },
  projects: {
    title: "Projects",
    description:
      "Personal projects I've tinkered with, out of curiosity or to solve a pain point in my life.",
    metadata: {
      title: "Projects",
      description: "Brian Goh's projects in building web applications.",
    },
  },
  contact: {
    title: "Contact",
    description: "Let's connect and explore collaborations.",
    metadata: {
      title: "Contact",
      description: "Contact Brian Goh.",
    },
  },
  contributions: {
    title: "Contributions",
    description: "Open-source contributions and community involvement.",
    metadata: {
      title: "Contributions",
      description:
        "Brian Goh's open-source contributions and community involvement.",
    },
  },
  resume: {
    title: "Resume",
    description: "Brian Goh's resume.",
    metadata: {
      title: "Resume",
      description: "Brian Goh's resume.",
    },
  },
  blogs: {
    title: "Blogs",
    description:
      "Thoughts on AI, software engineering, and interesting events I've attended.",
    metadata: {
      title: "Blogs",
      description:
        "Brian Goh's blog — thoughts on AI, software engineering, and interesting events he's attended.",
    },
  },
  experience: {
    title: "Experience",
    description: "Professional journey and career timeline.",
    metadata: {
      title: "Experience",
      description:
        "Brian Goh's professional journey and experience timeline.",
    },
  },
};
