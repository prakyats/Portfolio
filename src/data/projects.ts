import moneyMentorImg from "../assets/money-mentor.png";
import safarSaathiImg from "../assets/safar-saathi.png";
import leadlinkCrmImg from "../assets/leadlink-crm.png";
import echoesImg      from "../assets/echoes-app.png";

export interface Project {
  slug: string;
  title: string;
  description: string;
  technicalImpact: string;
  impact: string;
  tech: string[];
  image: string;
  live?: string;
  github?: string;
  badge?: string;          // optional "NEW" / "Featured" label
  color?: string;          // custom accent color for glow (hsl value)
  details: {
    overview: string;
    problem: string;
    approach: string;
    solution: string;
    impact: string;
    features: string[];
  };
}

export const projects: Project[] = [
  {
    slug: "echoes",
    title: "Echoes",
    color: "248, 100%, 75%",
    description: "A private memory-resurfacing app for friend groups — surfaces emotionally resonant memories on anniversaries using a weighted scoring algorithm.",
    technicalImpact: "Multi-signal ranking engine · Firebase real-time feed · deep link growth loop",
    impact: "Demonstrates algorithmic design, mobile architecture, real-time data, and a full share-to-sign-up growth funnel.",
    tech: ["React Native", "Expo", "Firebase", "Firestore", "Zustand", "TypeScript"],
    image: echoesImg,
    github: "https://github.com/prakyats/Echoes-GMV",
    details: {
      overview: "Echoes is a private mobile app for small friend groups (3–15 people) to store and relive shared memories. The core innovation is a Memory Resurfacing Engine that automatically picks the most emotionally resonant memory to surface each day.",
      problem: "Friend groups lose their shared memories across WhatsApp chats, Instagram archives, and Google Photos with no structured way to revisit or resurface meaningful moments on the days that matter.",
      approach: "Designed a 4-signal weighted scoring algorithm: date proximity (50%), reaction engagement (25%), contributor diversity (15%), and recency (10%). Scoring runs as a pure function with no Firestore calls — fully testable in isolation.",
      solution: "Built with React Native (Expo SDK 54) + Firebase: real-time Firestore feed with onSnapshot listeners, cursor-based pagination, hierarchical deduplication across 4 discovery buckets, and a share-to-preview growth funnel with universal deep linking.",
      impact: "Resolved 8 feed-ordering bugs including cross-device clock skew. Implemented session-stable date-seeded shuffle (LCG algorithm), engagement streak tracking, and an adaptive interleaving system for unseen vs seen memories.",
      features: [
        "Weighted scoring engine: date proximity × 0.5, reactions × 0.25, diversity × 0.15, recency × 0.1",
        "Real-time Firestore feed — onSnapshot + startAfter cursor pagination",
        "4 discovery buckets: Anniversary, Nearby (±3–7 days), This Month, Random",
        "Universal deep links (gmv.app/memory/:vaultId/:memoryId) with dual-navigator auth routing",
        "Share-to-preview growth funnel — curiosity-gap truncation + social proof CTA",
        "Daily streak engagement system with write-guard and new-day detection",
        "Invite-only vault system with Firestore security rules + atomic transactions",
      ],
    },
  },
  {
    slug: "leadlink-crm",
    title: "LeadLink CRM",
    color: "210, 100%, 65%",
    description: "Prevents lead drop-off in sales funnels through automated inactivity triggers and centralized pipeline visibility.",
    technicalImpact: "Sales pipeline with stage tracking, inactivity alerts, and MySQL relations",
    impact: "Demonstrates complex state management, database schema design, and automated triggers.",
    tech: ["React", "Node.js", "Express", "MySQL", "JWT"],
    image: leadlinkCrmImg,
    github: "https://github.com/prakyats/lead-link-crm",
    live: "https://leadlink-app.onrender.com/",
    details: {
      overview: "Streamlined sales management tool for lead prioritization.",
      problem: "Fragmented lead tracking causing missed follow-ups and lack of pipeline visibility.",
      approach: "Kanban-style pipeline providing high-level view of lead stages.",
      solution: "MySQL/Express system with automated aging-based follow-up triggers.",
      impact: "Automation of sales stage transitions and conversion metric tracking.",
      features: [
        "Visual drag-and-drop Kanban pipeline",
        "Automated inactivity-based follow-up alerts",
        "Direct sales stage conversion analytics",
        "Secure role-based visibility controls",
      ],
    },
  },
  {
    slug: "safar-saathi",
    title: "Safar Saathi",
    color: "22, 90%, 62%",
    description: "Eliminates transit uncertainty by providing live, WebSocket-driven bus locations for passengers and drivers.",
    technicalImpact: "Live bus tracking using WebSockets with GPS updates and Supabase sync",
    impact: "Demonstrates real-time event handling, role-based access, and geospatial data distribution.",
    tech: ["React", "Node.js", "Fastify", "PostgreSQL", "Socket.IO", "Supabase"],
    image: safarSaathiImg,
    github: "https://github.com/prakyats/safar-saathi",
    live: "prakyats.me",
    details: {
      overview: "Real-time transit engine for public transport tracking.",
      problem: "High wait-time uncertainty due to lack of live bus location data.",
      approach: "WebSocket-based GPS distribution using Socket.IO for low-latency updates.",
      solution: "Real-time hub with Supabase/Fastify synchronizing Admin, Driver, and Passenger portals.",
      impact: "Efficient handling of high-frequency WebSocket location data synchronization.",
      features: [
        "Live GPS-based bus tracking",
        "Role-based dashboards for different users",
        "Administrative route and schedule management",
        "Real-time schedule delay alerts",
      ],
    },
  },
  {
    slug: "money-mentor",
    title: "Money Mentor",
    color: "160, 100%, 50%",
    description: "Tracks and analyzes spending patterns in real-time, helping maintain consistent budgeting without manual effort.",
    technicalImpact: "Real-time expense tracking with Chart.js visualization and JWT-based auth",
    impact: "Demonstrates data visualization, secure user authentication, and full-stack integration.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Chart.js"],
    image: moneyMentorImg,
    github: "https://github.com/prakyats/money-mentor",
    live: "https://money-mentor-landing.vercel.app/",
    details: {
      overview: "Financial dashboard consolidating transaction data into visual spending reports.",
      problem: "Fragmented expense tracking across platforms leads to manual budgeting errors.",
      approach: "Centralized hub using Chart.js for data visualization and pattern recognition.",
      solution: "Full-stack React/Node.js dashboard with automatic categorization and budget limit comparisons.",
      impact: "Implements secure JWT authentication and database encryption for sensitive financial data.",
      features: [
        "Daily expense and income categorization",
        "Monthly budget targets with visual progress",
        "Interactive spending reports via Chart.js",
        "Secure registration and login with JWT",
      ],
    },
  },
];
