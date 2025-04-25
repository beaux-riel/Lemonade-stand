import { useEffect } from 'react';

/**
 * Custom hook for monitoring and optimizing performance
 * @param {Object} options - Configuration options
 * @param {boolean} options.reportToConsole - Whether to log metrics to console
 * @param {Function} options.onMetricsCollected - Callback when metrics are collected
 * @returns {Object} - Performance monitoring methods
 */
const usePerformanceMonitoring = ({
  reportToConsole = false,
  onMetricsCollected = null,
} = {}) => {
  // Set up performance monitoring on mount
  useEffect(() => {
    if (!window.performance || !window.performance.getEntriesByType) {
      console.warn('Performance API not supported in this browser');
      return;
    }

    // Report web vitals
    if ('web-vitals' in window) {
      import('web-vitals').then(({ getCLS, getFID, getLCP, getFCP, getTTFB }) => {
        getCLS(sendToAnalytics);
        getFID(sendToAnalytics);
        getLCP(sendToAnalytics);
        getFCP(sendToAnalytics);
        getTTFB(sendToAnalytics);
      });
    }

    // Function to send metrics to analytics or console
    function sendToAnalytics(metric) {
      const metricData = {
        name: metric.name,
        value: metric.value,
        id: metric.id,
        timestamp: new Date().toISOString(),
      };

      if (reportToConsole) {
        console.log('Performance metric:', metricData);
      }

      if (onMetricsCollected && typeof onMetricsCollected === 'function') {
        onMetricsCollected(metricData);
      }
    }

    // Clean up any listeners if needed
    return () => {
      // Cleanup code if necessary
    };
  }, [reportToConsole, onMetricsCollected]);

  /**
   * Measure the execution time of a function
   * @param {Function} fn - Function to measure
   * @param {string} label - Label for the measurement
   * @returns {any} - Result of the function
   */
  const measureExecutionTime = (fn, label = 'Function execution') => {
    if (typeof fn !== 'function') {
      console.error('measureExecutionTime requires a function as first parameter');
      return null;
    }

    const startTime = performance.now();
    const result = fn();
    const endTime = performance.now();
    
    if (reportToConsole) {
      console.log(`${label}: ${endTime - startTime}ms`);
    }
    
    return result;
  };

  /**
   * Start a performance mark
   * @param {string} markName - Name of the mark
   */
  const startMeasurement = (markName) => {
    if (window.performance && window.performance.mark) {
      performance.mark(`${markName}-start`);
    }
  };

  /**
   * End a performance mark and log the measurement
   * @param {string} markName - Name of the mark
   */
  const endMeasurement = (markName) => {
    if (window.performance && window.performance.mark && window.performance.measure) {
      performance.mark(`${markName}-end`);
      performance.measure(markName, `${markName}-start`, `${markName}-end`);
      
      if (reportToConsole) {
        const entries = performance.getEntriesByName(markName);
        if (entries.length > 0) {
          console.log(`${markName}: ${entries[0].duration}ms`);
        }
      }
    }
  };

  return {
    measureExecutionTime,
    startMeasurement,
    endMeasurement,
  };
};

export default usePerformanceMonitoring;