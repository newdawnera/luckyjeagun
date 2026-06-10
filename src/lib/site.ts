/**
 * Site-wide identity, navigation, and social links.
 */
export const site = {
  name: "Lucky Jeagun Daniel",
  initials: "LJD",
  role: "Software Developer & Data Analyst",
  email: "jeagundaniel@gmail.com",
  url: "https://luckyjeagun.com",
  /** Path to the downloadable CV, served from public/. */
  cvPath: "/cv.pdf",
  /** Formspree form ID for the contact form. Empty = falls back to a mailto draft. */
  formspreeId: "xlgkldwl",
  /** Cloudflare Web Analytics beacon token. Empty = analytics off. */
  cloudflareAnalyticsToken: "",
  taglines: [
    "things for the web & mobile",
    "AI-powered products",
    "data-driven applications",
    "experiences people rely on",
  ],
  summary:
    "I build data-driven web and mobile applications with a focus on accessibility, performance, and real-world impact — blending software engineering, analytics, and applied AI/ML.",
  location: "Available worldwide · Remote",
  status: "Open to new opportunities",
  nav: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Lab", href: "/lab" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/newdawnera" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jeagun-lucky/" },
  ],
} as const;

export type Site = typeof site;
