import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { useRef } from 'react';

interface OpenSourceProjectProps {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  delay: number;
}

const OpenSourceProjectCard: React.FC<OpenSourceProjectProps> = ({ 
  title, 
  description,
  technologies, 
  githubUrl,
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
        
        {/* Content */}
        <div className="relative z-10">
          {/* GitHub Icon */}
          <motion.div 
            className="flex items-center justify-between mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary rounded-full text-sm font-mono text-secondary-foreground">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              Open Source
            </div>
            
            <motion.a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors duration-300 group/github"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="text-primary group-hover/github:text-accent transition-colors duration-300" size={24} />
            </motion.a>
          </motion.div>

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
      title: "AI Resume Matcher",
      description: "Full-stack application leveraging LLM and NLP technologies to intelligently match resumes with job descriptions, featuring advanced text processing and semantic analysis capabilities.",
      technologies: ["LLM", "NLP", "FastAPI", "Full-Stack", "Python", "React"],
      githubUrl: "https://github.com/Abhinav-SU/resume-matcher-app"
    },
    {
      title: "Applied NLP/LLM Mastery",
      description: "Comprehensive repository showcasing advanced Natural Language Processing and Large Language Model implementations, demonstrating cutting-edge techniques in AI and deep learning.",
      technologies: ["Advanced NLP/LLM", "Deep Learning", "Python", "PyTorch", "Transformers"],
      githubUrl: "https://github.com/Abhinav-SU/applied_nlp_llm_mastery"
    },
    {
      title: "Privacy-Preserving ML",
      description: "Healthcare-focused machine learning system implementing federated learning techniques to ensure data privacy while maintaining model performance in sensitive medical applications.",
      technologies: ["Healthcare ML", "Data Privacy", "Federated Learning", "Python", "TensorFlow"],
      githubUrl: "https://github.com/Abhinav-SU/privacy-preserving-ml-healthcare"
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