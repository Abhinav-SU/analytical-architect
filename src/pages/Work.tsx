import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Navigation from '../components/Navigation';
import { getAllCaseStudies } from '../data/caseStudies';
import { ArrowRight, Filter, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

const Work: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  
  const allCaseStudies = getAllCaseStudies();
  
  // Extract unique technologies
  const allTechnologies = Array.from(
    new Set(allCaseStudies.flatMap(study => study.technologies))
  ).sort();
  
  const filters = ['all', 'Python', 'PostgreSQL', 'Node.js', 'AI/ML', 'Backend', 'Database'];
  
  const filteredProjects = selectedFilter === 'all' 
    ? allCaseStudies 
    : allCaseStudies.filter(study => 
        study.technologies.some(tech => 
          tech.toLowerCase().includes(selectedFilter.toLowerCase())
        ) ||
        study.role.toLowerCase().includes(selectedFilter.toLowerCase())
      );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-mesh)] opacity-20 pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            ref={sectionRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-6"
            >
              <Sparkles size={16} className="text-primary" />
              <span className="text-sm font-mono text-primary">Complete Portfolio</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                All Projects
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive collection of case studies showcasing <span className="text-primary font-semibold">database infrastructure</span>, 
              <span className="text-accent font-semibold"> AI/ML systems</span>, and <span className="text-primary font-semibold">backend development</span>.
            </p>
          </motion.div>

          {/* Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-3 mb-12 flex-wrap"
          >
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Filter size={16} />
              <span>Filter by:</span>
            </div>
            {filters.map((filter) => (
              <motion.button
                key={filter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedFilter === filter
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-secondary/60 text-secondary-foreground hover:bg-secondary border border-border'
                }`}
              >
                {filter}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((study, index) => (
              <motion.div
                key={study.slug}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative"
              >
                <Link to={`/work/${study.slug}`} className="block h-full">
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="bg-card/60 backdrop-blur-xl border border-border/50 rounded-2xl p-8 h-full cursor-pointer relative overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all duration-500"
                  >
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Company Badge */}
                    <div className="relative z-10 mb-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary/60 backdrop-blur-md rounded-full text-xs font-mono text-secondary-foreground border border-primary/10">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_6px_hsl(var(--primary))]" />
                        {study.company}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="relative z-10 text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {study.title}
                    </h3>

                    {/* Summary */}
                    <p className="relative z-10 text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                      {study.summary}
                    </p>

                    {/* Impact Metric */}
                    <div className="relative z-10 flex items-center gap-3 p-4 bg-success/5 border border-success/20 rounded-xl mb-6">
                      <div className="text-3xl font-bold text-success">{study.impactMetric}%</div>
                      <span className="text-sm text-success font-semibold">{study.impactUnit}</span>
                    </div>

                    {/* Technologies */}
                    <div className="relative z-10 flex flex-wrap gap-2 mb-6">
                      {study.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 rounded-lg bg-secondary/50 border border-border/50 text-xs font-medium text-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                      {study.technologies.length > 4 && (
                        <span className="px-3 py-1.5 rounded-lg bg-secondary/30 border border-border/30 text-xs font-medium text-muted-foreground">
                          +{study.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="relative z-10 flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all duration-300">
                      <span className="text-sm">View Case Study</span>
                      <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
                    </div>

                    {/* Enhanced Hover Border */}
                    <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/30 rounded-2xl transition-all duration-500 pointer-events-none" />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-xl text-muted-foreground">No projects found for "{selectedFilter}"</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Work;