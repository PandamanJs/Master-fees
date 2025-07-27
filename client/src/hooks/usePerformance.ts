import { useEffect, useCallback } from 'react';

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

export function usePerformance() {
  const reportMetric = useCallback((name: string, value: number) => {
    // In production, you would send this to your analytics service
    if (process.env.NODE_ENV === 'development') {
      console.log(`🚀 Performance Metric - ${name}: ${value.toFixed(2)}ms`);
    }
  }, []);

  const measurePerformance = useCallback(() => {
    // Web Vitals measurement
    if ('web-vital' in window) return;

    // Performance Observer for modern browsers
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        reportMetric('LCP', lastEntry.startTime);
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name === 'first-input') {
            reportMetric('FID', (entry as any).processingStart - entry.startTime);
          }
        });
      });
      fidObserver.observe({ type: 'first-input', buffered: true });

      // Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        });
        reportMetric('CLS', clsValue);
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    }

    // Navigation timing for older browsers
    if ('performance' in window && 'timing' in performance) {
      const timing = performance.timing;
      const ttfb = timing.responseStart - timing.requestStart;
      const fcp = timing.loadEventEnd - timing.navigationStart;
      
      reportMetric('TTFB', ttfb);
      reportMetric('FCP', fcp);
    }
  }, [reportMetric]);

  useEffect(() => {
    // Measure on component mount
    measurePerformance();

    // Also measure after page load
    if (document.readyState === 'complete') {
      setTimeout(measurePerformance, 100);
    } else {
      window.addEventListener('load', () => {
        setTimeout(measurePerformance, 100);
      });
    }
  }, [measurePerformance]);

  return { measurePerformance, reportMetric };
}