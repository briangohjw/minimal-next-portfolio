import { ValidSkills } from "./constants";

export interface ExperienceInterface {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: Date;
  endDate: Date | "Present";
  description: string[];
  achievements: string[];
  skills: ValidSkills[];
  companyUrl?: string;
  logo?: string;
}

export const experiences: ExperienceInterface[] = [
  {
    id: "squirro",
    position: "Presales Engineer",
    company: "Squirro",
    logo: "/experience/squirro-logo.png",
    location: "Singapore",
    startDate: new Date("2025-12-01"),
    endDate: "Present",
    description: [
      "Drive technical discovery, solutioning, custom POCs, and SOW drafting for 12+ enterprise AI accounts across APAC.",
      "Build custom technical demos — agentic workflows, RAG, and MCP — for enterprise accounts.",
      "Lead bilingual (Mandarin/English) technical workshops and POC engagements across the region.",
    ],
    achievements: [
      "Drove end-to-end presales for enterprise AI deployments across APAC — technical discovery, solution architecture, infrastructure sizing, and SOW drafting — across 12+ opportunities in government, financial services, energy, and industrial verticals spanning Singapore, Malaysia, Taiwan, and Hong Kong.",
      "Built custom technical demos per account, including knowledge-graph-driven agentic incident triage workflows, ACL-aware RAG with SharePoint/Excel RBAC, and MCP server integrations for complex structured data querying; presented to C-suite and senior management across enterprise accounts.",
      "Led bilingual (Mandarin/English) technical workshops and POC engagements with enterprise clients across the region.",
    ],
    skills: ["Presales", "RAG", "MCP"],
    companyUrl: "https://www.squirro.com",
  },
  {
    id: "paypal-se2",
    position: "Software Engineer 2",
    company: "PayPal",
    logo: "/experience/paypal-logo.png",
    location: "Singapore",
    startDate: new Date("2024-05-01"),
    endDate: new Date("2025-12-01"),
    description: [
      "Built fiat/crypto escheatment, restriction, and reconciliation features on PayPal's dormancy platform (5.5M+ users, 4 components).",
      "Designed idempotency controls and cache-based process locks to prevent losses in Brazil's unclaimed money workflow.",
      "Built a dormancy prediction model and championed it through PayPal's internal AI hackathon.",
    ],
    achievements: [
      "Built and shipped fiat and crypto escheatment, account closure and restriction, and reconciliation features on PayPal's dormancy compliance platform — production rollouts across the US and Brazil, spanning 4 integrated components and 5.5M+ users.",
      "Prevented potential financial losses exceeding $1M/cycle by designing idempotency controls and cache-based process locks for Brazil's unclaimed money workflow (800K+ users).",
      "Built a dormancy prediction model (85% F1-score) and pitched it to business leadership and sales teams — emerged champion in PayPal's internal AI hackathon (Code.AI).",
      "Architected a dynamic account restriction system using an ANTLR4 expression parser for configurable rule-based validation across fiat and crypto balances, achieving a 100% production rollout success rate.",
    ],
    skills: ["Java", "Spring Boot", "ANTLR4", "SQL"],
    companyUrl: "https://www.paypal.com",
  },
  {
    id: "paypal-se1",
    position: "Software Engineer 1",
    company: "PayPal",
    logo: "/experience/paypal-logo.png",
    location: "Singapore",
    startDate: new Date("2022-06-01"),
    endDate: new Date("2024-05-01"),
    description: [
      "Built a content moderation platform from scratch, processing 5.5M items/month, and onboarded 10+ client teams onto it.",
      "Fine-tuned LLaMA and other ML models, building end-to-end training-to-production pipelines on GCP.",
    ],
    achievements: [
      "Led cross-team integrations and onboarded 10+ client engineering teams with API documentation and hands-on support, achieving ~2 successful production integrations per month.",
      "Built a content moderation platform from scratch processing 5.5M items/month across 10+ internal products; optimised for scale through ML result caching (reducing latency from ~1s to ~1.5ms) and bulk parallel processing APIs.",
      "Fine-tuned LLaMA and other ML models on 5K+ labelled samples using TensorFlow on GCP GPU infrastructure, building end-to-end pipelines from training to production deployment.",
      "Designed an AMQ daemon for automated reprocessing of ~4K failed screenings/month, ensuring regulatory compliance for sensitive content detection.",
    ],
    skills: ["Java", "Python", "TensorFlow", "Google Cloud", "LLM"],
    companyUrl: "https://www.paypal.com",
  },
  {
    id: "paypal-intern",
    position: "Software Engineer Intern",
    company: "PayPal",
    logo: "/experience/paypal-logo.png",
    location: "Singapore",
    startDate: new Date("2021-05-01"),
    endDate: new Date("2021-08-01"),
    description: [
      "Built information extraction pipelines for subpoena documents, hitting >80% entity accuracy.",
      "Built a model and demo API to validate customer identification documents using OCR and NER.",
      "Tested and analysed multiprocessing performance on model inference tasks.",
    ],
    achievements: [
      "Built information extraction pipelines and a data labelling tool to extract key entities from subpoena documents, achieving accuracy rates of >80%.",
      "Built a model and demo API to validate the legitimacy of customers' identification details using OCR, bounding box coordinates, and named entity recognition.",
      "Conducted tests and analysed the performance of multiprocessing and parallel processing on model inference tasks.",
    ],
    skills: ["Python", "OCR"],
    companyUrl: "https://www.paypal.com",
  },
  {
    id: "stashaway",
    position: "Business Intelligence Intern",
    company: "StashAway",
    logo: "/experience/stashaway-logo.png",
    location: "Singapore",
    startDate: new Date("2020-08-01"),
    endDate: new Date("2020-12-01"),
    description: [
      "Managed the end-to-end data pipeline for high-net-worth clients using SQL and dbt.",
      "Conducted a deep-dive SQL analysis of COVID-19's impact on 100,000 platform users.",
      "Built dashboards for the Marketing, Client Engagement, and Product teams.",
    ],
    achievements: [
      "Managed the end-to-end data pipeline for high-net-worth clients by maintaining data warehouse (dbt) code, lead allocation logic, and generating daily pulses to wealth advisors in Singapore, Malaysia, and UAE.",
      "Conducted a deep-dive analysis (SQL) on COVID-19's impact on 100,000 platform users, analysing behavioural patterns across the market pre-crash, crash, and post-crash stages.",
      "Built dashboards (Metabase) for the Marketing, Client Engagement, and Product teams, including viewership analytics for mobile app videos and impact analysis of interest rate cuts.",
    ],
    skills: ["SQL", "dbt", "Metabase"],
    companyUrl: "https://www.stashaway.sg",
  },
  {
    id: "uob",
    position: "Data Analyst Intern",
    company: "UOB",
    logo: "/experience/uob-logo.png",
    location: "Singapore",
    startDate: new Date("2020-06-01"),
    endDate: new Date("2020-08-01"),
    description: [
      "Built a dashboard to track monthly SME portfolio performance for a 5-market pilot rollout.",
      "Built a Python web crawler to acquire and analyse business data on 5,000+ companies.",
      "Automated weekly COVID-19 relief plan reporting with VBA, cutting compilation time by 99%.",
    ],
    achievements: [
      "Built a dashboard to track monthly SME portfolio performance, used as the standard during pilot rollout to 5 regional markets.",
      "Built a web crawler (Python) to acquire and analyse (Tableau) business data such as contact information and customer sentiment for over 5,000 companies for data modelling and scrubbing.",
      "Wrote VBA scripts to automate the weekly reporting process for COVID-19 relief plans, reducing compilation time by 99% (from 1 hour to 10 seconds).",
    ],
    skills: ["Python", "Tableau", "VBA", "SQL"],
    companyUrl: "https://www.uob.com.sg",
  },
  {
    id: "shopee",
    position: "Business Development Intern",
    company: "Shopee",
    logo: "/experience/shopee-logo.png",
    location: "Singapore",
    startDate: new Date("2019-05-01"),
    endDate: new Date("2019-08-01"),
    description: [
      "Built a Python web crawler to automate competitor intelligence gathering, growing category assortment of key sellers by 140%.",
      "Analysed campaign performance, market trends, and potential fraudulent transactions.",
      "Automated repetitive daily tasks using VBA scripts and Chrome extensions.",
    ],
    achievements: [
      "Conducted data analysis and generated reports on campaign performance, market trends, and potential fraudulent transactions.",
      "Automated repetitive daily tasks such as campaign curation and discount setting using VBA scripts and Google Chrome extensions.",
      "Built a web crawler (Python) to acquire competitor intelligence, increasing product assortment of category key sellers by 140%.",
      "Built a dashboard that categorises, tracks, and sets monthly targets for sellers across all categories.",
    ],
    skills: ["Python", "VBA"],
    companyUrl: "https://shopee.sg",
  },
  {
    id: "code-gakko",
    position: "Business Development Intern",
    company: "Code Gakko",
    logo: "/experience/codegakko-logo.png",
    location: "Singapore",
    startDate: new Date("2018-02-01"),
    endDate: new Date("2018-06-01"),
    description: [
      "Independently ran ASPIREAlpha (Data Science Boot Camp) end to end, growing participation by 70% and revenue by 30% year-on-year.",
      "Managed sales, communication, and logistics for the program, hosting 55 stakeholders.",
    ],
    achievements: [
      "Independently ran ASPIREAlpha (Data Science Boot Camp), managing sales, communication, and logistics end to end, hosting a total of 55 stakeholders.",
      "Increased the boot camp's participation rate by 70% and revenue by 30% from the previous year.",
    ],
    skills: [],
  },
];
