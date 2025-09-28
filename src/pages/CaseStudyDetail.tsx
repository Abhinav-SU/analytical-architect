import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { getCaseStudy } from '../data/caseStudies';
import CaseStudyDetailContent from '../components/CaseStudyDetailContent';

const CaseStudyDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return <Navigate to="/" replace />;
  }

  const caseStudy = getCaseStudy(slug);
  
  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Case Study Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The case study "{slug}" doesn't exist or has been moved.
          </p>
          <Link 
            to="/"
            className="hero-button inline-flex items-center gap-2"
          >
            Return to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return <CaseStudyDetailContent caseStudy={caseStudy} />;
};

export default CaseStudyDetail;