export type Accent = "violet" | "pink" | "cyan" | "blue";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  /** Longer narrative paragraphs shown on the case-study page. */
  overview: string[];
  year: string;
  role: string;
  tags: string[];
  tech: string[];
  highlights: string[];
  accent: Accent;
  featured?: boolean;
  /** Set to the event name to list this under Hackathons (e.g. "June Solstice Game Jam 2026"). */
  hackathon?: string;
  links?: { live?: string; source?: string; demo?: string };
};

/**
 * The first 3 `featured` projects also appear on the home page.
 * Each project gets its own page at /projects/<slug>.
 */
export const projects: Project[] = [
  {
    slug: "ai-meeting-wizard",
    title: "AI Meeting Wizard",
    tagline: "Meetings that capture themselves",
    summary:
      "An AI-powered meeting assistant that transcribes discussions, writes role-based summaries, and tracks action items end to end.",
    overview: [
      "AI Meeting Wizard (OneVoice) turns raw conversations into structured, actionable records. It transcribes live discussions, then generates summaries tailored to each participant's role so everyone leaves with the context that matters to them.",
      "Beyond notes, it tracks action items and drives follow-through with automated and manual email reminders — complete with in-email status updates, so progress is visible without opening the app.",
      "The product is built on a modern full-stack architecture: a JavaScript front end, a FastAPI back end for the AI and transcription pipeline, Firebase for data and auth, and Render for deployment.",
    ],
    year: "2025",
    role: "Full-stack Developer",
    tags: ["Web App", "AI"],
    tech: ["JavaScript", "FastAPI", "Firebase", "Render"],
    highlights: [
      "Live transcription with role-based, AI-generated summaries",
      "Automated + manual email reminders with in-email status updates",
      "Action-item tracking across the full meeting lifecycle",
      "Full-stack architecture deployed on Render",
    ],
    accent: "violet",
    featured: true,
    links: {
      live: "https://ally-vimd.onrender.com",
      source: "https://github.com/newdawnera/onevoice",
      demo: "https://youtu.be/mCe9xzNM3VU",
    },
  },
  {
    slug: "intelligent-cooking-assistant",
    title: "Intelligent Cooking Assistant",
    tagline: "Cook by voice, photo, or text",
    summary:
      "A smart mobile cooking assistant (MyChef) with voice, image, and text recipe search powered by Groq AI and AssemblyAI.",
    overview: [
      "MyChef is a cross-platform mobile cooking companion built with React Native and Expo. It meets people however they cook — search by speaking, snapping a photo of ingredients, or typing — and returns recipes that actually fit what's on hand.",
      "Personalized suggestions are powered by AssemblyAI for speech understanding and Groq AI for fast, context-aware reasoning, while Firebase handles accounts and data and the Spoonacular API supplies a deep recipe catalog.",
      "The result is a low-friction kitchen assistant: hands busy, phone propped up, and the right recipe a sentence away.",
    ],
    year: "2025",
    role: "Mobile Developer",
    tags: ["Mobile App", "AI"],
    tech: ["React Native", "Expo", "Firebase", "Groq AI", "AssemblyAI"],
    highlights: [
      "Voice, image, and text input for recipe search",
      "Personalized suggestions via Groq AI + AssemblyAI",
      "Firebase auth/data and Spoonacular recipe integration",
      "Built with React Native + Expo for iOS and Android",
    ],
    accent: "pink",
    featured: true,
    links: {
      source: "https://github.com/newdawnera/MyChef",
      demo: "https://youtu.be/Rg_SUi5Ru7I",
    },
  },
  {
    slug: "retail-banking-risk-dashboard",
    title: "Retail Banking Risk Dashboard",
    tagline: "AI-driven credit risk, visualized",
    summary:
      "A professional-grade React dashboard visualizing credit risk and revenue, with a real-time AI Analyst that reads live metrics for executive insights.",
    overview: [
      "This dashboard presents simulated credit risk and revenue data in a responsive, bank-grade interface — the kind of clean, dense, trustworthy view a retail banking team would actually use.",
      "Its standout feature is a real-time AI Analyst powered by Groq and Llama 3.3. It reads the live chart metrics on screen and generates strategic, executive-level insights on demand, turning numbers into narrative.",
      "Built with React and Vite for speed, Tailwind CSS for the interface, and Recharts for the data visualizations.",
    ],
    year: "2025",
    role: "Frontend & AI Developer",
    tags: ["Dashboard", "FinTech", "AI"],
    tech: ["React + Vite", "Tailwind CSS", "Recharts", "Groq AI (Llama 3.3)"],
    highlights: [
      "Real-time AI Analyst reads live chart metrics for insights",
      "Bank-grade, responsive data-visualization interface",
      "Credit-risk and revenue analytics with Recharts",
      "Fast React + Vite build, styled with Tailwind",
    ],
    accent: "cyan",
    featured: true,
    links: {
      live: "https://dataform-bfw.pages.dev/",
      source: "https://github.com/newdawnera/datasite/tree/main/jpm-dashboard",
    },
  },
  {
    slug: "choralfux",
    title: "Choralfux",
    tagline: "Backend for healthcare staffing",
    summary:
      "Backend and database engineering for a healthcare staffing platform connecting hospitals with locum professionals.",
    overview: [
      "Choralfux (CURAFLUX) is a healthcare staffing platform that bridges hospitals and locums. I worked on the server side — designing the API and database layer that keeps shifts, providers, and facilities in sync.",
      "The backend is built on Node.js and Express with a SQL database, and was developed and verified with Postman against a full suite of endpoints.",
    ],
    year: "2024",
    role: "Backend Developer",
    tags: ["Backend", "Healthcare"],
    tech: ["Node.js", "Express", "SQL", "Postman"],
    highlights: [
      "API and database design for a multi-sided staffing platform",
      "Connects hospitals with locum professionals",
      "Endpoints built and verified with Postman",
    ],
    accent: "blue",
    links: {
      source: "https://github.com/TheCuraTeam/CURAFLUX-SERVER",
    },
  },
  {
    slug: "moodvie",
    title: "MoodVie",
    tagline: "Movies that match your mood",
    summary:
      "An AI-powered movie recommendation platform that turns emotion-based prompts into tailored picks using ML models.",
    overview: [
      "MoodVie recommends films based on how you feel, not just what you've watched. Users describe a mood in natural language and the platform maps it to recommendations using emotion-based prompting and ML models.",
      "It's built with JavaScript and Tailwind CSS on the front end, with Gemini AI handling the language understanding and recommendation reasoning.",
    ],
    year: "2024",
    role: "Full-stack Developer",
    tags: ["Web App", "AI"],
    tech: ["JavaScript", "Tailwind CSS", "Gemini AI"],
    highlights: [
      "Emotion-based prompts drive personalized recommendations",
      "Gemini AI for natural-language understanding",
      "Clean, responsive UI built with Tailwind",
    ],
    accent: "violet",
    links: {
      source: "https://github.com/newdawnera/MoodVie",
    },
  },
  {
    slug: "elite-career",
    title: "Elite Career",
    tagline: "AI that scores and sharpens your CV",
    summary:
      "A career platform that uses AI to analyze and score CVs against standards and specific job requirements, with actionable suggestions.",
    overview: [
      "Elite Career helps job seekers close the gap between their CV and the role they want. It analyzes and scores a CV against general standards and against a specific job's requirements, then returns concrete suggestions for improvement.",
      "It's built with JavaScript and Tailwind, uses Gemini AI for the analysis and scoring, and persists user data in MongoDB.",
    ],
    year: "2024",
    role: "Full-stack Developer",
    tags: ["Web App", "AI", "Careers"],
    tech: ["JavaScript", "Tailwind CSS", "Gemini AI", "MongoDB"],
    highlights: [
      "Scores CVs against standards and specific job requirements",
      "Actionable, AI-generated improvement suggestions",
      "Gemini AI analysis with MongoDB persistence",
    ],
    accent: "pink",
    links: {
      source: "https://github.com/newdawnera/elite-career",
    },
  },
  {
    slug: "the-longest-night",
    title: "The Longest Night",
    tagline: "Break four ciphers before sundown",
    summary:
      "A solstice codebreaking game where daylight is the resource: crack four ciphers before the sun sets, then face a playable Turing Test powered by Gemini.",
    overview: [
      "The Longest Night is my entry for the June Solstice Game Jam 2026 (dev.to). You play the night-shift cryptanalyst at a remote listening station on June 21: four encrypted transmissions must be broken before the sun goes down, and daylight drains in real time — wrong answers and hints cost precious seconds of sun.",
      "The ciphers rise in difficulty from a Caesar shift through Atbash and Vigenère to a rotor cipher — an Enigma nod. Between levels you talk to C, a colleague on the teletype line who never says what it is; at dawn you answer Turing's question yourself: was C human, or machine?",
      "C runs on the Gemini API behind an origin-locked, rate-limited Cloudflare Worker proxy, with a bring-your-own-key option and a fully scripted fallback so the game is always playable. A procedural soundtrack dims in tone as daylight fades. The whole game ships as a single static HTML file on GitHub Pages — no build, no dependencies.",
    ],
    year: "2026",
    role: "Solo Developer & Designer",
    tags: ["Game", "AI", "Hackathon"],
    tech: ["JavaScript", "Gemini API", "Cloudflare Workers", "GitHub Pages"],
    highlights: [
      "Daylight as a real-time resource — mistakes literally cost sunlight",
      "Four ciphers of rising difficulty: Caesar, Atbash, Vigenère, rotor",
      "A playable Turing Test: an AI character you must judge at dawn",
      "Three-tier AI design: secured proxy, bring-your-own-key, scripted fallback",
    ],
    accent: "blue",
    hackathon: "June Solstice Game Jam 2026",
    links: {
      live: "https://newdawnera.github.io/solsticegame/",
      source: "https://github.com/newdawnera/solsticegame",
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = projects.filter((p) => p.featured);

/** Regular client/personal work shown in the main Projects grid. */
export const mainProjects = projects.filter((p) => !p.hackathon);

/** Time-boxed event builds shown in the Hackathons section. */
export const hackathonProjects = projects.filter((p) => p.hackathon);
