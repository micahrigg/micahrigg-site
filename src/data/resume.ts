// Single source of truth for the resume page, its print view, and its structured data.
// Placeholder copy is marked TODO — replace with real details.

export type Experience = {
  company: string;
  title: string;
  location: string;
  start: string;
  end: string;
  summary?: string;
  highlights: string[];
  stack?: string[];
};

export type Education = {
  school: string;
  credential: string;
  location?: string;
  year?: string;
  detail?: string;
};

export const summary =
  "I have worked for the past eighteen years in web development, focusing on frontend technologies and user experience. I have worked on small but, nimble teams taking care of multiple outside clients to large marketing teams internally focused on a single corporation. I have a track record of effective collaboration with other team members to accomplish set goals. Despite my years in the industry, I am coachable and eager to learn new skills.";

export const competencies: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["JavaScript", "TypeScript", "PHP", "SQL", "HTML", "CSS", "AI development"] },
  { group: "Frontend Frameworks", items: ["React", "Next.js", "Tailwind CSS", "Nuxt.js", "Vue JS"] },
//   { group: "Backend", items: ["TODO: Node.js", "REST", "GraphQL"] },
//   { group: "Data", items: ["TODO: PostgreSQL", "MySQL", "Redis"] },
//   { group: "Cloud & DevOps", items: ["TODO: AWS", "Docker", "CI/CD", "GitHub Actions"] },
//   { group: "Testing", items: ["TODO: Vitest", "Playwright", "Testing Library"] },
//   {
//     group: "Practices",
//     items: [
//       "TODO: Accessibility (WCAG 2.2)",
//       "Performance & Core Web Vitals",
//       "Architecture & technical strategy",
//       "Mentoring & code review",
//     ],
//   },
];

export const experience: Experience[] = [
  {
    company: "Lippert",
    title: "Marketing Developer",
    location: "Elkhart, IN",
    start: "2015",
    end: "Present",
    summary: "Lippert supplies a wide array of components for the leading manufacturers of recreational vehicles, automobiles, watercraft and prefab homes. My role has been to develop and maintain marketing websites and digital experiences across the various brands in the Lippert family.",
    highlights: [
      "Assisting in the launch of multiple new marketing websites across the Lippert brands using various platforms including MODX, Hugo, Nuxt, and Magento.",
      "Working with key stakeholders to build and maintain forms for lead generation and customer feedback across multiple websites.",
      "Keeping up to date with the latest introduced platforms as technologies and company needs shift. Examples include starting with MODX which is a PHP-based CMS, and later adopting Hugo and Nuxt.js.",
      "Working with key stakeholders to define project requirements and ensure successful delivery of product webpages across multiple brands and industries.",
    ],
    stack: ["HTML/CSS", "MODX", "TypeScript", "Nuxt.js", "Magento", "Tailwind", "Hugo", "Cursor", "Claude Code and other AI tools"],
  },
  {
    company: "BANG! Website Design",
    title: "Web Developer",
    location: "South Bend, IN",
    start: "2007",
    end: "2015",
    highlights: [
      "Lead in efforts to modernize the company's frontend tech stack. Taking websites from the legacy table-based layouts to responsive, component-driven designs. This greatly decreased development time and improved maintainability.",
      "Built a blog platform in Coldfusion from scratch to meet the needs of clients.",
      "Built an image gallery component in Coldfusion to enhance client websites.",
    ],
    stack: ["Coldfusion", "JavaScript", "HTML/CSS", "Bootstrap"],
  },
  
];

// Roles older than roughly a decade read better compressed into a single line each.
export const earlierExperience: { company: string; title: string; period: string }[] = [
//   { company: "TODO: Early Company", title: "TODO: Frontend Developer", period: "20XX – 20XX" },
//   { company: "TODO: First Company", title: "TODO: Junior Web Developer", period: "2007 – 20XX" },
];

export const education: Education[] = [
  {
    school: "Andrews University",
    credential: "Bachelor of Technology",
    location: "Berrien Springs, MI",
    year: "2000 - 2004",
  },
];

export const certifications: { name: string; issuer: string; year: string }[] = [
  { name: "TODO: Certification name", issuer: "TODO: Issuing body", year: "20XX" },
];

export const speaking: { title: string; venue: string; year: string; url?: string }[] = [
  {
    title: "TODO: Talk, workshop, or article title",
    venue: "TODO: Conference or publication",
    year: "20XX",
  },
];

export const awards: { name: string; issuer: string; year: string }[] = [
  { name: "TODO: Award or recognition", issuer: "TODO: Issuing body", year: "20XX" },
];

export const community: { role: string; organization: string; period: string }[] = [
  { role: "Board Member", organization: "Community Evangelical Free Church", period: "2019 – Present" },
  { role: "Volunteer Instructor", organization: "Life for Christ Kenpo Martial Arts", period: "2004 – Present" },
];

export const resumeSections = [
  { id: "summary", label: "Summary" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "community", label: "Community" },
  //{ id: "certifications", label: "Certifications" },
  //{ id: "speaking", label: "Speaking & Writing" },
  //{ id: "recognition", label: "Recognition" },
] as const;
