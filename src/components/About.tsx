import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, Code, Brain, Cloud } from 'lucide-react';
import profilePhoto from '../assets/profile-photo.png';

const About: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  const skillCategories = [
    {
      title: "Languages",
      icon: Code,
      color: "primary",
      skills: ["Python", "JavaScript", "TypeScript", "SQL", "Shell Scripting"],
      description: "Core programming languages for backend and database development"
    },
    {
      title: "Backend & Databases",
      icon: Brain,
      color: "accent",
      skills: ["FastAPI", "Node.js (Fastify)", "PostgreSQL", "MySQL", "Redis", "Neo4j", "pgvector", "Elasticsearch"],
      description: "Backend frameworks and database systems expertise"
    },
    {
      title: "Cloud & DevOps",
      icon: Cloud,
      color: "success",
      skills: ["AWS (Lambda, EC2, RDS, S3, CloudWatch)", "Azure (Functions, Event Hubs, Logic Apps)", "Docker", "Git", "Pydantic"],
      description: "Cloud platforms and DevOps tools"
    }
  ];

  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Building High-Performance <span className="text-primary">Infrastructure</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Personal Bio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Profile Image */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-48 h-48 mx-auto lg:mx-0 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-border overflow-hidden mb-8"
            >
              <img 
                src={profilePhoto} 
                alt="Abhinav Bajpai - Software Developer"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I am a <strong className="text-foreground">Software Engineer</strong> with MS in Computer Science from Syracuse University and <strong className="text-primary">4+ years of experience</strong> specializing in database infrastructure and backend API development.
              </p>
              
              <p>
                My professional experience includes 4 years at <strong className="text-primary">Tata Consultancy Services (TCS)</strong> managing PostgreSQL database infrastructure for 400,000+ employees, reducing response times from 8 seconds to under 2 seconds through primary-replica architecture and query optimization.
              </p>
              
              <p>
                I combine enterprise-scale <strong className="text-primary">database expertise</strong> with modern API development skills. My work focuses on building high-performance database systems, implementing zero-downtime migrations, and developing <strong className="text-accent">Python FastAPI applications</strong> with intelligent caching strategies.
              </p>
              
              <p>
                <strong className="text-primary">Core Focus:</strong> Building robust database infrastructure and backend APIs that deliver measurable performance improvements while maintaining 99.9% uptime for 24/7 operations.
              </p>
            </div>

          <motion.div className="pt-6">
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-button inline-flex items-center gap-3"
            >
              <Download size={20} />
              Download Full Resume
            </motion.a>
          </motion.div>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold text-foreground mb-8">Technical Expertise</h3>
            
            {skillCategories.map((category, categoryIndex) => {
              const IconComponent = category.icon;
              
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + categoryIndex * 0.2 }}
                  className="group"
                >
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-card border border-border rounded-xl p-6 hover:shadow-elegant transition-all duration-300"
                  >
                    {/* Category Header */}
                    <div className="flex items-center gap-4 mb-4">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className={`p-3 rounded-lg bg-${category.color}/10 border border-${category.color}/20`}
                      >
                        <IconComponent className={`text-${category.color}`} size={24} />
                      </motion.div>
                      <div>
                        <h4 className="text-xl font-bold text-foreground">{category.title}</h4>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                    </div>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ 
                            duration: 0.3, 
                            delay: 0.8 + categoryIndex * 0.2 + skillIndex * 0.05 
                          }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className="tech-tag text-xs font-mono"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Education & Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-foreground mb-10 text-center">Education & Experience</h3>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {/* REVA University - First */}
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:shadow-[var(--shadow-card)] transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-primary">REVA University</h4>
                  <p className="text-foreground font-semibold">Bachelor of Technology in Computer Science & Engineering</p>
                  <p className="text-muted-foreground text-sm">CGPA: 8.42/10.0</p>
                </div>
                <span className="text-sm font-mono text-muted-foreground whitespace-nowrap">Jul 2015 - Jun 2019</span>
              </div>
            </motion.div>

            {/* Tata Consultancy Services */}
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:shadow-[var(--shadow-card)] transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-primary">Tata Consultancy Services (TCS)</h4>
                  <p className="text-foreground font-semibold">Software Developer</p>
                  <p className="text-muted-foreground text-sm">Full-time</p>
                </div>
                <span className="text-sm font-mono text-muted-foreground whitespace-nowrap">May 2019 - Jul 2023</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Managed PostgreSQL database infrastructure for 400,000+ employees, reducing database load by 40% and improving system response times from 8 seconds to under 2 seconds through primary-replica architecture and query optimization.
              </p>
            </motion.div>

            {/* Syracuse University - MS Degree */}
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:shadow-[var(--shadow-card)] transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-primary">Syracuse University</h4>
                  <p className="text-foreground font-semibold">Master of Science in Computer Science</p>
                  <p className="text-muted-foreground text-sm">GPA: 3.64/4.0</p>
                </div>
                <span className="text-sm font-mono text-muted-foreground whitespace-nowrap">Aug 2023 - May 2025</span>
              </div>
              <p className="text-muted-foreground text-sm">
                <strong className="text-foreground">Relevant Coursework:</strong> Design & Analysis of Algorithms, Social Media & Data Mining, Database Management Systems
              </p>
            </motion.div>

            {/* Syracuse University Internship */}
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:shadow-[var(--shadow-card)] transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-primary">Syracuse University</h4>
                  <p className="text-foreground font-semibold">Software Engineer Intern</p>
                  <p className="text-muted-foreground text-sm">Part-time</p>
                </div>
                <span className="text-sm font-mono text-muted-foreground whitespace-nowrap">Jul 2024 - Present</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Architected codebase analysis platform using Python FastAPI reducing external API costs by 85% through intelligent caching strategy, processing 50-file codebases in under 500ms with 99.5% cache hit rate saving approximately $2,000 monthly.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20 text-center"
        >
          <div className="bg-card border border-border rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Let's Build Something Exceptional
            </h3>
            <p className="text-muted-foreground mb-6">
              Interested in discussing scalable architecture, AI integration, or system optimization? 
              I'm always open to connecting with fellow developers and technical leaders.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:abhinavbajpai0296@gmail.com"
                className="hero-button"
              >
                Get In Touch
              </motion.a>
              
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://linkedin.com/in/abhinavbajpai96"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-button-secondary"
              >
                LinkedIn Profile
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;