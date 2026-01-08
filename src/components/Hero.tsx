import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Download, Code2, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import SystemDiagram from './SystemDiagram';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  
  // Magnetic cursor effect
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-screen flex items-center justify-center system-bg pt-20 overflow-hidden">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 bg-[var(--gradient-mesh)] opacity-40" />
      
      <SystemDiagram />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          {/* Animated greeting badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Code2 size={16} className="text-primary" />
            </motion.div>
            <span className="text-sm font-mono text-primary">Database Engineer & Backend Developer</span>
          </motion.div>

          {/* Title - Enhanced with gradient */}
          <div className="mb-10 max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4"
            >
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight">
                <motion.div 
                  className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent mb-2"
                  initial={{ backgroundPosition: '0% 50%' }}
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                  style={{ 
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Building High-Performance
                </motion.div>
                <div className="text-foreground mb-2">Database Infrastructure</div>
                <div className="text-accent flex items-center justify-center gap-3">
                  <Zap className="inline" size={48} />
                  Proven Results
                </div>
              </h1>
            </motion.div>
          </div>

          {/* Subtitle - More concise */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Software Engineer with <span className="text-primary font-semibold">MS in Computer Science</span> and 
            <span className="text-accent font-semibold"> 4+ years</span> specializing in 
            <span className="text-primary font-semibold"> database infrastructure</span> and 
            <span className="text-accent font-semibold"> backend API development</span>. Expert in PostgreSQL optimization and Python FastAPI.
          </motion.p>

          {/* Interactive Tech Badges - Enhanced with magnetic effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-14"
          >
            <p className="text-xs text-muted-foreground mb-6 font-mono uppercase tracking-wider">Core Stack</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { name: 'Python', desc: 'FastAPI, Backend Development', icon: '🐍' },
                { name: 'PostgreSQL', desc: 'Optimization, Primary-Replica', icon: '🗄️' },
                { name: 'Azure', desc: 'Event Hubs, Logic Apps, Functions', icon: '☁️' },
                { name: 'Docker', desc: 'Containerization', icon: '🐳' },
                { name: 'Node.js', desc: 'Fastify, REST APIs', icon: '⚡' },
                { name: 'SQL', desc: 'Query Optimization, Partitioning', icon: '💾' }
              ].map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.08 }}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -4,
                    boxShadow: '0 10px 30px -10px hsl(var(--primary) / 0.5)'
                  }}
                  className="group relative"
                >
                  <div className="relative px-5 py-2.5 rounded-xl bg-secondary/50 backdrop-blur-md border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{tech.icon}</span>
                      <span className="font-semibold text-sm">{tech.name}</span>
                    </div>
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
                  </div>
                  {/* Enhanced Tooltip */}
                  <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 bg-popover/95 backdrop-blur-md text-popover-foreground px-4 py-2 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-primary/20 shadow-lg">
                    {tech.desc}
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-popover/95 border-r border-b border-primary/20 rotate-45" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons - Enhanced with premium effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <motion.div 
              whileHover={{ scale: 1.05, y: -3 }} 
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/work"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-primary-glow text-primary-foreground font-semibold shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 overflow-hidden"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700" />
                <span className="relative z-10">View Case Studies</span>
                <ArrowRight 
                  size={20} 
                  className="relative z-10 group-hover:translate-x-1 transition-transform duration-200" 
                />
              </Link>
            </motion.div>

            <motion.a
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-secondary/80 backdrop-blur-md border-2 border-border hover:border-primary text-foreground font-semibold transition-all duration-300"
            >
              <Download size={18} className="group-hover:translate-y-0.5 transition-transform duration-200" />
              Download Resume
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-xl bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.6 }}
        style={{ opacity: scrollIndicatorOpacity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 cursor-pointer group"
        onClick={() => {
          const nextSection = document.getElementById('work');
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-7 h-11 border-2 border-primary/50 group-hover:border-primary rounded-full flex justify-center transition-colors duration-300"
        >
          <motion.div
            animate={{ y: [0, 14, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-3 bg-primary rounded-full mt-2 shadow-[0_0_10px_hsl(var(--primary))]"
          />
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
        <p className="text-xs text-muted-foreground mt-3 font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Scroll
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;