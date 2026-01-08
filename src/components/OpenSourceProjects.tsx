import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { useRef } from 'react';

interface OpenSourceProjectProps {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  language: string;
  delay: number;
}

const OpenSourceProjectCard: React.FC<OpenSourceProjectProps> = ({ 
  title, 
  description,
  technologies, 
  githubUrl,
  language,
  delay 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className="group relative"
    >
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-card border border-border rounded-xl p-8 h-full relative overflow-hidden"
      >
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Language Badge - Top Right */}
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-md text-xs font-mono text-accent">
          <span className="uppercase font-semibold">{language}</span>
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          {/* Open Source Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary rounded-full text-sm font-mono text-secondary-foreground mb-4">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            Open Source
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed mb-6">
            {description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-6">
            {technologies.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: delay + 0.1 + index * 0.05 }}
                className="tech-tag text-xs"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* CTA */}
          <motion.a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all duration-300"
            whileHover={{ x: 5 }}
          >
            <Github size={16} />
            <span>View Repository</span>
            <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
          </motion.a>
        </div>

        {/* Hover Border Effect */}
        <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/20 rounded-xl transition-colors duration-300" />
      </motion.div>
    </motion.div>
  );
};

const OpenSourceProjects: React.FC = () => {
  const projects = [
    {
      title: "TaskWeave - AI Conversation Manager",
      description: "Multi-LLM workflow orchestration platform with visual workflow builder. Chain GPT-4, Gemini, and Claude together for complex tasks. Features Chrome extension for one-click conversation capture from ChatGPT and Claude with semantic search via pgvector.",
      technologies: ["Node.js", "Fastify", "PostgreSQL", "pgvector", "WebSocket", "React", "Chrome Extension"],
      language: "JavaScript",
      githubUrl: "https://github.com/Abhinav-SU/TaskWeave"
    },
    {
      title: "Car Review Analytics with ChromaDB",
      description: "AI-powered semantic search system that analyzes automotive customer reviews using vector embeddings and RAG architecture. Leverages ChromaDB for efficient similarity search and OpenAI GPT for generating actionable business insights from positive and negative feedback patterns.",
      technologies: ["ChromaDB", "OpenAI", "RAG", "Polars", "Vector Search", "Python"],
      language: "Python",
      githubUrl: "https://github.com/Abhinav-SU/car-review-analyze"
    },
    {
      title: "Hospital Knowledge Graph ETL",
      description: "Enterprise-grade ETL pipeline loading healthcare data into Neo4j graph database. Implements comprehensive graph schema with 6 node types and 6 relationship types, featuring retry logic, uniqueness constraints, and Docker deployment for scalable hospital data management.",
      technologies: ["Neo4j", "Graph Database", "Docker", "ETL", "Healthcare Data", "Python"],
      language: "Python",
      githubUrl: "https://github.com/Abhinav-SU/Hospital-chatbot"
    },
    {
      title: "Embeddings & Vector Database Fundamentals",
      description: "Comprehensive implementation of vector operations, word/text embeddings, and vector database concepts using ChromaDB. Demonstrates semantic similarity search, cosine distance calculations, and efficient embedding storage with practical examples using Spacy and Sentence Transformers.",
      technologies: ["ChromaDB", "Embeddings", "Spacy", "Sentence Transformers", "Vector DB", "Python"],
      language: "Python",
      githubUrl: "https://github.com/Abhinav-SU/Embeddings-and-Vector-Database"
    },
    {
      title: "Applied NLP/LLM Mastery",
      description: "Comprehensive repository showcasing advanced Natural Language Processing and Large Language Model implementations, demonstrating cutting-edge techniques in AI and deep learning.",
      technologies: ["Advanced NLP/LLM", "Deep Learning", "Python", "PyTorch", "Transformers"],
      language: "Python",
      githubUrl: "https://github.com/Abhinav-SU/applied_nlp_llm_mastery"
    }
  ];

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Open-Source <span className="text-primary">Contributions</span> & Deep Dives
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Production-ready repositories demonstrating advanced AI/ML implementations and system architecture patterns.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <OpenSourceProjectCard
              key={project.title}
              {...project}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OpenSourceProjects;
