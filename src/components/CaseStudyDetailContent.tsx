import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ExternalLink, Copy, Check, CheckCircle2, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CounterAnimation from './CounterAnimation';
import { CaseStudy } from '../data/caseStudies';

interface CaseStudyDetailContentProps {
  caseStudy: CaseStudy;
}

const CaseStudyDetailContent: React.FC<CaseStudyDetailContentProps> = ({ caseStudy }) => {
  const [copied, setCopied] = useState(false);
  const containerRef = useRef(null);
  const codeRef = useRef(null);
  const tradeOffsRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const isCodeInView = useInView(codeRef, { once: true, margin: "-20%" });
  const isTradeOffsInView = useInView(tradeOffsRef, { once: true, margin: "-20%" });

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(caseStudy.deepDiveCode.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-background">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border"
      >
        <div className="container mx-auto px-6 py-4">
          <motion.div whileHover={{ x: -5 }}>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Portfolio
            </Link>
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Section - Impact Metric */}
      <section className="pt-24 pb-16 text-center">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {/* Company Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-sm font-mono text-secondary-foreground mb-8"
            >
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              {caseStudy.company} • {caseStudy.role}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl md:text-6xl font-bold text-foreground mb-8"
            >
              {caseStudy.title}
            </motion.h1>

            {/* Impact Metric - Primary Focus */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-12"
            >
              <div className="bg-gradient-to-br from-success/10 to-primary/10 border border-success/20 rounded-2xl p-12 max-w-2xl mx-auto">
                <CounterAnimation
                  target={caseStudy.impactMetric}
                  duration={2.5}
                  suffix="%"
                  className="text-7xl md:text-8xl font-bold text-success mb-4"
                />
                <p className="text-xl md:text-2xl text-success font-semibold">
                  {caseStudy.impactUnit}
                </p>
              </div>
            </motion.div>

            {/* Summary */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
            >
              {caseStudy.summary}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Video Section */}
      {caseStudy.videoUrl && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Demo & Overview</h2>
              <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-2 border-primary/20">
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={caseStudy.videoUrl}
                    title={`${caseStudy.title} Demo`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Challenge Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-foreground mb-8">The Challenge</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {caseStudy.challenge}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solution & Technology Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                className="bg-background/90 backdrop-blur-sm rounded-xl p-8 border border-border"
              >
                <h3 className="text-xl font-semibold text-foreground mb-4">Solution Overview</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {caseStudy.solution}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                className="bg-background/90 backdrop-blur-sm rounded-xl p-8 border border-border"
              >
                <h3 className="text-xl font-semibold text-foreground mb-4">Technology Stack</h3>
                <div className="flex flex-wrap gap-3">
                  {caseStudy.technologies.map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="tech-tag"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Deep Dive - Code Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            ref={codeRef}
            initial={{ opacity: 0, x: 50 }}
            animate={isCodeInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-foreground mb-8">Technical Deep Dive</h2>
            
            <div className="code-block shadow-code">
              {/* Code Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-code-border">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-code-text mb-2">
                    {caseStudy.deepDiveCode.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {caseStudy.deepDiveCode.description}
                  </p>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopyCode}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    copied 
                      ? 'bg-success/20 border-2 border-success text-success' 
                      : 'bg-secondary border-2 border-border hover:bg-accent hover:border-accent hover:text-accent-foreground'
                  }`}
                >
                  {copied ? <Check size={18} className="animate-bounce" /> : <Copy size={18} />}
                  <span className="font-semibold">{copied ? 'Copied!' : 'Copy Code'}</span>
                </motion.button>
              </div>

              {/* Code Content with Syntax Highlighting */}
              <div className="relative">
                <SyntaxHighlighter
                  language={caseStudy.deepDiveCode.language}
                  style={vscDarkPlus}
                  showLineNumbers={true}
                  customStyle={{
                    margin: 0,
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    padding: '1.5rem',
                  }}
                  codeTagProps={{
                    style: {
                      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    }
                  }}
                >
                  {caseStudy.deepDiveCode.code}
                </SyntaxHighlighter>
                
                {/* Language Badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-md text-xs font-mono text-primary">
                  <span className="uppercase font-semibold">{caseStudy.deepDiveCode.language}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trade-Offs Callout */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            ref={tradeOffsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isTradeOffsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-card border-l-4 border-accent rounded-xl p-8 shadow-elegant">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ExternalLink className="text-accent" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-accent mb-4">Key Engineering Decision</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Decision:</h4>
                      <p className="text-muted-foreground">{caseStudy.tradeOffs.decision}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Rationale:</h4>
                      <p className="text-muted-foreground">{caseStudy.tradeOffs.rationale}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Alternative Considered:</h4>
                      <p className="text-muted-foreground">{caseStudy.tradeOffs.alternatives}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-foreground mb-12 text-center"
            >
              Quantifiable Results
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseStudy.results.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-card border border-border rounded-lg p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 size={18} className="text-success" />
                    </div>
                    <p className="text-foreground font-medium leading-relaxed">{result}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Lessons */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-foreground mb-12 text-center"
            >
              Key Engineering Lessons
            </motion.h2>
            
            <div className="space-y-4">
              {caseStudy.lessons.map((lesson, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-card rounded-lg border border-border"
                >
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{lesson}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Navigation to other case studies */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Explore More Case Studies
            </h3>
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/"
                className="hero-button inline-flex items-center gap-2"
              >
                View All Projects
                <ExternalLink size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudyDetailContent;