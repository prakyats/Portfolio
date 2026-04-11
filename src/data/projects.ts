import moneyMentorImg from "../assets/money-mentor.png";
import safarSaathiImg from "../assets/safar-saathi.png";
import leadlinkCrmImg from "../assets/leadlink-crm.png";

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
    slug: "leadlink-crm",
    title: "LeadLink CRM",
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
        "Secure role-based visibility controls"
      ]
    }
  },
  {
    slug: "safar-saathi",
    title: "Safar Saathi",
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
        "Real-time schedule delay alerts"
      ]
    }
  },
  {
    slug: "money-mentor",
    title: "Money Mentor",
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
        "Secure registration and login with JWT"
      ]
    }
  }
];
