import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ExternalLink, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/work', label: 'Work' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-[var(--shadow-elegant)]"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Name - Enhanced with gradient */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative group"
          >
            <Link to="/" onClick={closeMobileMenu} className="font-mono font-bold text-xl bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
              Abhinav Bajpai
            </Link>
            {/* Underline effect */}
            <motion.div 
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Desktop Navigation Links - Enhanced */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.div 
                key={link.to}
                whileHover={{ scale: 1.05, y: -2 }} 
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Link
                  to={link.to}
                  className={`text-sm font-medium transition-colors duration-300 relative
                    ${location.pathname === link.to ? 'text-primary' : 'text-foreground/80 hover:text-primary'}`}
                >
                  {link.label}
                  {location.pathname === link.to && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {/* Hover effect */}
                  {location.pathname !== link.to && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary/30 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop Resume CTA - Premium design */}
          <motion.a
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
            href="/Abhinav_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 hover:border-primary/40 text-primary font-semibold text-sm transition-all duration-300 group relative overflow-hidden"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-primary/20 to-transparent transition-transform duration-700" />
            <Download size={16} className="relative z-10" />
            <span className="relative z-10">Resume</span>
            <ExternalLink size={14} className="relative z-10 opacity-50 group-hover:opacity-100 transition-opacity" />
          </motion.a>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-4 pb-6 space-y-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.to}
                      onClick={closeMobileMenu}
                      className={`block py-2 text-lg transition-colors
                        ${location.pathname === link.to 
                          ? 'text-primary font-semibold' 
                          : 'text-foreground hover:text-primary'}`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-4"
                >
                  <a
                    href="/Abhinav_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobileMenu}
                    className="hero-button flex items-center justify-center gap-2"
                  >
                    <Download size={18} />
                    Download Resume
                    <ExternalLink size={16} />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;