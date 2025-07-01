import { useEffect, useState } from "react";
import { useLocation } from "wouter";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const [location] = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedChildren, setDisplayedChildren] = useState(children);

  useEffect(() => {
    if (displayedChildren !== children) {
      setIsTransitioning(true);
      
      // After fade out completes, update content and fade in
      const timer = setTimeout(() => {
        setDisplayedChildren(children);
        setIsTransitioning(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [children, displayedChildren]);

  return (
    <div className="page-transition-container">
      <div 
        className={`page-content ${isTransitioning ? 'page-transition-out' : 'page-transition-in'}`}
      >
        {displayedChildren}
      </div>
      
      {/* Loading overlay during transition */}
      {isTransitioning && (
        <div className="fixed inset-0 bg-white dark:bg-black z-40 flex items-center justify-center transition-overlay">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-brand-teal border-t-transparent rounded-full animate-spin"></div>
            <div className="text-brand-teal font-medium">Loading...</div>
          </div>
        </div>
      )}
    </div>
  );
}