import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, Code, Brain, Cloud } from 'lucide-react';
import profilePhoto from '../assets/profile-photo.png';

const About: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  const skillCategories = [
    {
      title: "Backend & Core",
      icon: Code,
      color: "primary",
      skills: ["Java", "Spring Boot", "Spring Batch", "Microservices", "Distributed Systems", "Object-Oriented Design"],
      description: "Enterprise-grade backend systems with proven scalability"
    },
    {
      title: "AI & Data",
      icon: Brain,
      color: "accent",
      skills: ["LLM Integration (OpenAI, Gemini)", "LlamaIndex", "Semantic Search", "Prompt Engineering", "Pandas", "TensorFlow"],
      description: "Advanced AI integrations and intelligent data processing"
    },
    {
      title: "Cloud & DevOps",
      icon: Cloud,
      color: "success",
      skills: ["AWS", "Azure Logic Apps", "Azure Monitor", "GCP", "Docker", "Jenkins", "Git", "Kafka", "Linux"],
      description: "Cloud-native architecture and automated deployment pipelines"
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
            Building the Foundation for <span className="text-primary">Intelligence</span>
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
                I am a <strong className="text-foreground">Software Developer</strong> focused on designing and implementing scalable backend systems and advanced AI integrations. My background at TCS built a deep foundation in high-throughput Java/Spring microservices, which I now combine with cutting-edge expertise in Python, LLMs (OpenAI, Gemini), and cloud architecture (AWS, Azure) to drive business efficiency.
              </p>
              
              <p>
                <strong className="text-primary">Core Value:</strong> I specialize in optimizing data pipelines and system architecture to minimize operational costs while accelerating product development and improving maintainability.
              </p>
            </div>

          <motion.div className="pt-6">
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="/Abhinav_Resume.pdf"
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
                href="mailto:work@abhinavbajpai.online"
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