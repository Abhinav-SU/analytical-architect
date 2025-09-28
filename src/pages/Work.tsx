import React from 'react';
import Navigation from '../components/Navigation';
import FeaturedProjects from '../components/FeaturedProjects';

const Work: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        <FeaturedProjects />
      </div>
    </div>
  );
};

export default Work;