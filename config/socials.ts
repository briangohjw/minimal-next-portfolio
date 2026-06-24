import { Icons } from "@/components/common/icons";

interface SocialInterface {
  name: string;
  username: string;
  icon: any;
  link: string;
}

export const SocialLinks: SocialInterface[] = [
  {
    name: "Github",
    username: "@briangohjw",
    icon: Icons.gitHub,
    link: "https://github.com/briangohjw",
  },
  {
    name: "LinkedIn",
    username: "Brian Goh",
    icon: Icons.linkedin,
    link: "https://www.linkedin.com/in/briangohjw",
  },
  {
    name: "Gmail",
    username: "briangoh.junw",
    icon: Icons.gmail,
    link: "mailto:briangoh.junw@gmail.com",
  },
];
