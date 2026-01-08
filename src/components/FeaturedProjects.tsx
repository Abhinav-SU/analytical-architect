import React from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ExternalLink, TrendingUp, Sparkles, Play } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

interface ProjectProps {
  title: string;
  company: string;
  description: string;
  impact: string;
  technologies: string[];
  delay: number;
  size: 'large' | 'medium' | 'small';
  featured?: boolean;
  videoUrl?: string;
}

const ProjectCard: React.FC<ProjectProps> = ({ 
  title, 
  company, 
  description, 
  impact, 
  technologies, 
  delay,
  size,
  featured = false,
  videoUrl
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [showVideo, setShowVideo] = React.useState(false);

  // Create slug from title for routing
  const slug = title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  // Size variants for Bento Grid
  const sizeClasses = {
    large: 'lg:col-span-2 lg:row-span-2',
    medium: 'lg:col-span-1 lg:row-span-2',
    small: 'lg:col-span-1 lg:row-span-1'
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className={`group relative ${sizeClasses[size]}`}
    >
      <Link to={`/work/${slug}`} className="block h-full">
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={`bg-card/60 backdrop-blur-xl border border-border/50 rounded-2xl ${size === 'large' ? 'p-10' : 'p-8'} h-full cursor-pointer relative overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all duration-500`}
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Glow effect on hover */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-primary/0 to-accent/0 group-hover:from-primary/20 group-hover:via-accent/20 group-hover:to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-10" />
          
          {/* Content */}
          <div className="relative z-10 h-full flex flex-col">
            {/* Video Thumbnail/Preview for large cards */}
            {size === 'large' && videoUrl && (
              <motion.div 
                className="relative mb-6 rounded-xl overflow-hidden bg-secondary/30 cursor-pointer group/video"
                whileHover={{ scale: 1.02 }}
                onClick={(e) => {
                  e.preventDefault();
                  setShowVideo(!showVideo);
                }}
              >
                {!showVideo ? (
                  <div className="relative aspect-video flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                    <motion.div 
                      className="absolute inset-0 bg-black/40 group-hover/video:bg-black/20 transition-colors duration-300"
                      whileHover={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
                    />
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="relative z-10 w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
                    >
                      <Play className="text-primary-foreground ml-1" size={28} fill="currentColor" />
                    </motion.div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                      <p className="text-white text-sm font-medium">▶ Watch Demo Video</p>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={videoUrl}
                      title={title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg"
                    />
                  </div>
                )}
              </motion.div>
            )}

            {/* Header */}
            <div className="mb-4">
              <div className="flex items-start justify-between gap-4 mb-3">
                <motion.div 
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary/60 backdrop-blur-md rounded-full text-xs font-mono text-secondary-foreground border border-primary/10"
                  whileHover={{ scale: 1.05, borderColor: 'hsl(var(--primary) / 0.3)' }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_6px_hsl(var(--primary))]" />
                  {company}
                </motion.div>
                
                {featured && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: delay + 0.3 }}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-accent/10 border border-accent/30 rounded-full text-xs font-semibold text-accent"
                  >
                    <Sparkles size={12} />
                    Featured
                  </motion.div>
                )}
              </div>

              {/* Title */}
              <h3 className={`font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 ${size === 'large' ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
                {title}
              </h3>

              {/* Description */}
              <p className={`text-muted-foreground leading-relaxed ${size === 'large' ? 'text-base md:text-lg mb-6' : 'text-sm mb-4'}`}>
                {description}
              </p>
            </div>

            {/* Impact Metric */}
            <motion.div 
              className={`flex items-center gap-3 p-4 bg-success/5 border border-success/20 rounded-xl backdrop-blur-sm ${size === 'small' ? 'mb-4' : 'mb-6'}`}
              whileHover={{ scale: 1.03, backgroundColor: 'hsl(var(--success) / 0.1)' }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              <TrendingUp className="text-success flex-shrink-0" size={size === 'large' ? 24 : 20} />
              <span className={`text-success font-semibold ${size === 'large' ? 'text-base' : 'text-sm'}`}>{impact}</span>
            </motion.div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-auto">
              {technologies.slice(0, size === 'small' ? 4 : technologies.length).map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: delay + 0.1 + index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-3 py-1.5 rounded-lg bg-secondary/50 border border-border/50 text-xs font-medium text-foreground hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all duration-200 cursor-pointer"
                >
                  {tech}
                </motion.span>
              ))}
              {size === 'small' && technologies.length > 4 && (
                <span className="px-3 py-1.5 rounded-lg bg-secondary/30 border border-border/30 text-xs font-medium text-muted-foreground">
                  +{technologies.length - 4}
                </span>
              )}
            </div>

            {/* CTA */}
            <motion.div
              className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all duration-300 mt-6"
              whileHover={{ x: 6 }}
            >
              <span className={size === 'large' ? 'text-base' : 'text-sm'}>View Case Study</span>
              <ArrowRight size={size === 'large' ? 20 : 16} className="group-hover:translate-x-2 transition-transform duration-300" />
            </motion.div>
          </div>

          {/* Enhanced Hover Border */}
          <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/30 rounded-2xl transition-all duration-500 pointer-events-none" />
        </motion.div>
      </Link>
    </motion.div>
  );
};

const FeaturedProjects: React.FC = () => {
  const projects = [
    {
      title: "AI-Powered Codebase Analysis Platform",
      company: "Syracuse University",
      description: "Built intelligent codebase comparison system enabling developers to analyze code differences across projects. Implemented content-based caching using SHA256 hashing achieving 99.5% cache hit rate, processing 50-file codebases in under 500ms.",
      impact: "85% reduction in API costs, saving $2,000 monthly",
      technologies: ["Python", "FastAPI", "AST Parsing", "SHA256", "Google Gemini", "Streamlit"],
      size: 'large' as const,
      featured: true,
      videoUrl: "https://www.youtube.com/embed/G1oCQZctVqo"
    },
    {
      title: "TaskWeave - AI Conversation Manager",
      company: "Personal Project",
      description: "Built intelligent multi-LLM workflow orchestration platform with visual workflow builder. Chain GPT-4, Gemini, and Claude models together for complex tasks. Features Chrome extension for one-click conversation capture from ChatGPT and Claude.",
      impact: "11 production-ready cost-optimized templates",
      technologies: ["Node.js", "Fastify", "PostgreSQL", "pgvector", "WebSocket", "React"],
      size: 'large' as const,
      videoUrl: "https://www.youtube.com/embed/RxV2DxpXp8Q" // YouTube video embed URL
    },
    {
      title: "Healthcare Knowledge Graph Chatbot",
      company: "Personal Project",
      description: "Built intelligent chatbot for medical query processing with Neo4j graph database. Enables relationship-based navigation across 6 healthcare entity types using natural language queries and RAG architecture.",
      impact: "Enables semantic search across healthcare entities",
      technologies: ["Python", "LangChain", "Neo4j", "RAG Architecture"],
      size: 'large' as const,
      videoUrl: "https://www.youtube.com/embed/GilfsApr93o" // YouTube demo
    },

  ];

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section id="work" className="py-24 bg-gradient-to-b from-background via-background/50 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[var(--gradient-mesh)] opacity-20 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-6"
          >
            <Sparkles size={16} className="text-primary" />
            <span className="text-sm font-mono text-primary">Portfolio Highlights</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              Featured Work
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Scalable systems and AI integrations delivering <span className="text-primary font-semibold">quantifiable results</span> through strategic architecture.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-fr">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              {...project}
              delay={index * 0.15}
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
          <motion.div 
            whileHover={{ scale: 1.05, y: -3 }} 
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/work"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-secondary/60 backdrop-blur-md border-2 border-border hover:border-primary text-foreground font-semibold transition-all duration-300 relative overflow-hidden"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-primary/10 to-transparent transition-transform duration-700" />
              <span className="relative z-10">View All Projects</span>
              <ExternalLink size={18} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;