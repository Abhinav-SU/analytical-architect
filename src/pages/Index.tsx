import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import FeaturedProjects from '../components/FeaturedProjects';
import OpenSourceProjects from '../components/OpenSourceProjects';
import About from '../components/About';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <FeaturedProjects />
      <OpenSourceProjects />
      <About />
    </div>
  );
};

export default Index;
