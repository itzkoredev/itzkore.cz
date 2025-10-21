import AIPageClient from "../../components/pages/AIPageClient";
import StructuredData from "../../components/StructuredData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Development | RAG, Chatbots & ML Solutions",
  description:
    "Specializace na RAG systémy, AI agenty, chatboty a machine learning. Full-stack AI development s Python, TypeScript a moderními frameworky.",
  keywords: [
    "RAG systémy",
    "AI agent development",
    "chatbot development",
    "machine learning",
    "LangChain",
    "OpenAI API",
    "vector databases",
    "NLP",
    "Python AI",
    "TypeScript AI",
    "GitHub Copilot",
    "MCP protocol",
  ],
  alternates: {
    canonical: "/ai",
    languages: {
      cs: "/ai",
      en: "/ai",
    },
  },
  openGraph: {
    title: "AI Development & Consulting | itzKORE",
    description:
      "RAG systémy, AI agenti, chatboty a ML řešení. Full-stack AI development s plnou asistencí.",
    url: "https://itzkore.cz/ai",
    type: "website",
    images: ["/og-ai.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Development & Consulting | itzKORE",
    description: "RAG systémy, AI agenti, chatboty a ML řešení.",
    images: ["/og-ai.png"],
  },
};

const aiStructuredData = {
  name: "itzKORE AI Development & Consulting",
  description:
    "Specializing in RAG systems, AI agents, chatbots, and machine learning. Full-stack AI development with Python, TypeScript, and modern frameworks.",
  url: "https://itzkore.cz/ai",
  creator: {
    "@type": "Person",
    name: "itzKORE",
  },
  knowsAbout: [
    "RAG Systems",
    "AI Agents",
    "Chatbot Development",
    "Machine Learning",
    "LangChain",
    "OpenAI API",
    "Vector Databases",
    "Natural Language Processing",
    "Python AI Development",
    "TypeScript",
    "Full-Stack Development",
    "GitHub Copilot",
    "Model Context Protocol",
  ],
};

export default function AIPage() {
  return (
    <>
      <StructuredData type="CreativeWork" data={aiStructuredData} />
      <AIPageClient />
    </>
  );
}
