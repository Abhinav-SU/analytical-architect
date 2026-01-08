import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setLoading(false);
          clearInterval(timer);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 150);

    // Minimum loading time
    const minTimer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => {
      clearInterval(timer);
      clearTimeout(minTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-background flex items-center justify-center"
        >
          <div className="text-center">
            {/* Binary Data Animation */}
            <div className="mb-8">
              <div className="grid grid-cols-8 gap-1 w-64 mx-auto">
                {Array.from({ length: 64 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0.2 }}
                    animate={{ 
                      opacity: [0.2, 1, 0.2],
                      backgroundColor: [
                        'hsl(var(--muted))', 
                        'hsl(var(--primary))', 
                        'hsl(var(--muted))'
                      ]
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.05,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-3 h-3 rounded-sm"
                  />
                ))}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-64 mx-auto mb-6">
              <div className="bg-secondary rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-gradient-to-r from-primary to-primary-glow"
                />
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm font-mono text-muted-foreground mt-2"
              >
                Initializing System Architecture... {Math.floor(Math.min(progress, 100))}%
              </motion.p>
            </div>

            {/* Loading Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-mono text-primary"
            >
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Abhinav Bajpai
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;