import React from 'react';
import Navigation from '../components/Navigation';
import About from '../components/About';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        <About />
      </div>
    </div>
  );
};

export default AboutPage;