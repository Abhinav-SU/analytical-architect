import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // Only scroll to top on PUSH (forward navigation)
    // Don't scroll on POP (back/forward browser buttons)
    if (navigationType !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [pathname, navigationType]);

  return null;
};

export default ScrollToTop;
