import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, ExternalLink } from 'lucide-react';
import Navigation from '../components/Navigation';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-8">
              Let's Build Something <span className="text-primary">Exceptional</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-16 max-w-3xl mx-auto">
              Ready to architect and develop your next scalable system? I'm always open to discussing 
              technical challenges, system design, and opportunities to create measurable business impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Contact Methods */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-bold text-foreground mb-8">Get In Touch</h2>
              
              <motion.a
                whileHover={{ scale: 1.02, x: 5 }}
                href="mailto:abhinavbajpai0296@gmail.com"
                className="flex items-center gap-4 p-6 bg-card border border-border rounded-xl hover:border-primary/20 transition-colors cursor-glow"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <p className="text-primary">abhinavbajpai0296@gmail.com</p>
                </div>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.02, x: 5 }}
                href="https://linkedin.com/in/abhinavbajpai96"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 bg-card border border-border rounded-xl hover:border-primary/20 transition-colors cursor-glow"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Linkedin className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">LinkedIn</h3>
                  <p className="text-primary">Professional Network</p>
                </div>
                <ExternalLink className="text-muted-foreground ml-auto" size={16} />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.02, x: 5 }}
                href="https://github.com/Abhinav-SU"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 bg-card border border-border rounded-xl hover:border-primary/20 transition-colors cursor-glow"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Github className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">GitHub</h3>
                  <p className="text-primary">Code Portfolio</p>
                </div>
                <ExternalLink className="text-muted-foreground ml-auto" size={16} />
              </motion.a>
            </motion.div>

            {/* Technical Interests */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-bold text-foreground mb-8">Areas of Interest</h2>
              
              <div className="space-y-6">
                <div className="p-6 bg-card border border-border rounded-xl">
                  <h3 className="font-semibold text-primary mb-3">System Architecture</h3>
                  <p className="text-muted-foreground">
                    Microservices design, distributed systems, and scalable backend architecture
                  </p>
                </div>

                <div className="p-6 bg-card border border-border rounded-xl">
                  <h3 className="font-semibold text-primary mb-3">AI Integration</h3>
                  <p className="text-muted-foreground">
                    LLM applications, RAG implementations, and intelligent automation
                  </p>
                </div>

                <div className="p-6 bg-card border border-border rounded-xl">
                  <h3 className="font-semibold text-primary mb-3">Cloud & DevOps</h3>
                  <p className="text-muted-foreground">
                    AWS/Azure architecture, CI/CD pipelines, and infrastructure optimization
                  </p>
                </div>

                <div className="p-6 bg-card border border-border rounded-xl">
                  <h3 className="font-semibold text-primary mb-3">Performance Engineering</h3>
                  <p className="text-muted-foreground">
                    System optimization, caching strategies, and high-throughput data processing
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-16"
          >
            <div className="bg-card border border-border rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Ready to Collaborate?
              </h3>
              <p className="text-muted-foreground mb-6">
                Whether you're looking to optimize existing systems, implement new AI capabilities, 
                or architect scalable solutions from the ground up, let's discuss how we can create 
                measurable business impact together.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="mailto:abhinavbajpai0296@gmail.com"
                  className="hero-button"
                >
                  Start a Conversation
                </motion.a>
                
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="/Abhinav_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-button-secondary"
                >
                  Download Resume
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;