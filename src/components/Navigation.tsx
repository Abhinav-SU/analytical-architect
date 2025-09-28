import React from 'react';
import { motion } from 'framer-motion';
import { Download, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="font-mono font-semibold text-xl text-primary cursor-glow"
          >
            <Link to="/">Abhinav Bajpai</Link>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/work"
                className="text-foreground hover:text-primary transition-colors duration-200 cursor-glow"
              >
                Work
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/about"
                className="text-foreground hover:text-primary transition-colors duration-200 cursor-glow"
              >
                About
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className="text-foreground hover:text-primary transition-colors duration-200 cursor-glow"
              >
                Contact
              </Link>
            </motion.div>
          </div>

          {/* Resume CTA */}
          <motion.a
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-button-secondary flex items-center gap-2"
          >
            <Download size={16} />
            Resume
            <ExternalLink size={14} />
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;