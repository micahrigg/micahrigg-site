export const site = {
  name: "Micah Riggenbach",
  shortName: "Micah Riggenbach",
  role: "Web Developer",
  tagline: "Eighteen years building for the web.",
  description:
    "Micah Riggenbach is a web developer with eighteen years of experience building fast, accessible, maintainable web applications.",
  url: "https://micahriggenbach.com",
  locale: "en_US",
  location: "United States",
  links: {
    github: "https://github.com/micahrigg",
  },
  // Set NEXT_PUBLIC_FORMSPREE_ID to the form hash from your Formspree dashboard.
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/resume", label: "Resume" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;
