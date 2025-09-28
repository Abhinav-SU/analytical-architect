import React from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ExternalLink, TrendingUp } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

interface ProjectProps {
  title: string;
  company: string;
  description: string;
  impact: string;
  technologies: string[];
  delay: number;
}

const ProjectCard: React.FC<ProjectProps> = ({ 
  title, 
  company, 
  description, 
  impact, 
  technologies, 
  delay 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  // Create slug from title for routing
  const slug = title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className="group relative"
    >
      <Link
        to={`/work/${slug}`}
        className="block"
      >
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-card border border-border rounded-xl p-8 h-full cursor-pointer relative overflow-hidden"
        >
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Company Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 px-3 py-1 bg-secondary rounded-full text-sm font-mono text-secondary-foreground mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            {company}
          </motion.div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed mb-6">
            {description}
          </p>

          {/* Impact Metric */}
          <motion.div 
            className="flex items-center gap-3 mb-6 p-4 bg-success/10 border border-success/20 rounded-lg"
            whileHover={{ scale: 1.02 }}
          >
            <TrendingUp className="text-success flex-shrink-0" size={20} />
            <span className="text-success font-semibold">{impact}</span>
          </motion.div>

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
          <motion.div
            className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all duration-300"
            whileHover={{ x: 5 }}
          >
            <span>View Case Study</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </motion.div>
        </div>

        {/* Hover Border Effect */}
        <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/20 rounded-xl transition-colors duration-300" />
        </motion.div>
      </Link>
    </motion.div>
  );
};

const FeaturedProjects: React.FC = () => {
  const projects = [
    {
      title: "LLM-Powered Codebase Explainer",
      company: "Syracuse University",
      description: "Designed and implemented a semantic search system that ingests repository code, generates embeddings, and provides intelligent code explanations using RAG architecture with FastAPI and LlamaIndex.",
      impact: "30-40% reduction in developer onboarding time",
      technologies: ["FastAPI", "Streamlit", "LlamaIndex", "OpenAI", "Gemini", "PostgreSQL", "AWS"]
    },
    {
      title: "Scalable IoT Device Workflow",
      company: "Meltek Inc.",
      description: "Built enterprise-grade microservices architecture for IoT device management with SOC 2 compliance, implementing automated workflows and real-time monitoring systems.",
      impact: "30-60% reduction in operational costs and deployment time",
      technologies: ["Java", "Spring Boot", "Azure Logic Apps", "Microservices", "Docker", "Jenkins"]
    },
    {
      title: "High-Throughput Microservices Refactor",
      company: "TCS",
      description: "Led architectural refactoring of monolithic reporting system into distributed microservices with blue-green deployment strategy and advanced caching mechanisms.",
      impact: "80% improvement in report generation speed",
      technologies: ["Java", "Spring Batch", "Microservices", "Kafka", "Docker", "Linux", "Git"]
    }
  ];

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section id="work" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Featured <span className="text-primary">Case Studies</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Scalable systems and AI integrations that deliver quantifiable business results through strategic architectural decisions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              {...project}
              delay={index * 0.2}
            />
          ))}
        </div>

        {/* View All Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/work"
              className="hero-button-secondary inline-flex items-center gap-2"
            >
              <span>View All Projects</span>
              <ExternalLink size={16} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;