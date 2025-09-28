import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import TypewriterText from './TypewriterText';
import SystemDiagram from './SystemDiagram';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center system-bg pt-20">
      <SystemDiagram />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Title with Typewriter Effect */}
          <div className="mb-8 max-w-4xl md:max-w-5xl mx-auto text-center">
            <TypewriterText
              text="The Systemic Developer: I build scalable microservices and LLM applications that turn architectural complexity into quantifiable business efficiency and product innovation."
              delay={1000}
              speed={8}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-snug text-foreground"
            />
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 4.5 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto"
          >
            Software Developer specializing in backend systems, AI integration, and cloud architecture that delivers measurable business impact.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/work"
                className="hero-button flex items-center gap-3 group"
              >
                View Case Studies
                <ArrowRight 
                  size={20} 
                  className="group-hover:translate-x-1 transition-transform duration-200" 
                />
              </Link>
            </motion.div>

            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-button-secondary flex items-center gap-2"
            >
              <Download size={18} />
              Download Resume
            </motion.a>
          </motion.div>

          {/* Tech Stack Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 5.5 }}
            className="mt-16 mb-20"
          >
            <p className="text-sm text-muted-foreground mb-4 font-mono">CORE TECHNOLOGIES</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {['Java', 'Spring Boot', 'Python', 'FastAPI', 'LLMs', 'AWS', 'Microservices', 'Docker'].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 5.5 + index * 0.1 }}
                  className="tech-tag"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 6 }}
        style={{ opacity: scrollIndicatorOpacity }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-primary rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;