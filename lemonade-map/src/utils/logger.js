/**
 * Logger utility for consistent logging throughout the application
 * This can be extended to send logs to a monitoring service in production
 */

// Log levels
const LOG_LEVELS = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error'
};

// Current environment
// const isProduction = import.meta.env.PROD;
const isProduction = process.env.NODE_ENV === "production";

/**
 * Format log message with timestamp and additional context
 * @param {string} level - Log level
 * @param {string} message - Log message
 * @param {Object} data - Additional data to log
 * @returns {Object} - Formatted log object
 */
const formatLog = (level, message, data = {}) => {
  return {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...data
  };
};

/**
 * Debug level logging - only in development
 * @param {string} message - Log message
 * @param {Object} data - Additional data to log
 */
const debug = (message, data = {}) => {
  if (!isProduction) {
    console.debug(formatLog(LOG_LEVELS.DEBUG, message, data));
  }
};

/**
 * Info level logging
 * @param {string} message - Log message
 * @param {Object} data - Additional data to log
 */
const info = (message, data = {}) => {
  console.info(formatLog(LOG_LEVELS.INFO, message, data));
};

/**
 * Warning level logging
 * @param {string} message - Log message
 * @param {Object} data - Additional data to log
 */
const warn = (message, data = {}) => {
  console.warn(formatLog(LOG_LEVELS.WARN, message, data));
};

/**
 * Error level logging
 * @param {string} message - Log message
 * @param {Error} error - Error object
 * @param {Object} data - Additional data to log
 */
const error = (message, error, data = {}) => {
  // In production, we might want to send this to a monitoring service
  console.error(
    formatLog(LOG_LEVELS.ERROR, message, {
      error: {
        name: error?.name,
        message: error?.message,
        stack: error?.stack
      },
      ...data
    })
  );
  
  // Here you could add integration with error monitoring services
  // if (isProduction) {
  //   sendToErrorMonitoring(message, error, data);
  // }
};

/**
 * Log authentication events
 * @param {string} action - Authentication action (login, logout, etc.)
 * @param {Object} data - Authentication data (userId, etc.)
 */
const authEvent = (action, data = {}) => {
  // Remove sensitive data
  const safeData = { ...data };
  delete safeData.password;
  delete safeData.token;
  
  info(`Auth: ${action}`, safeData);
};

/**
 * Log API requests
 * @param {string} endpoint - API endpoint
 * @param {string} method - HTTP method
 * @param {Object} data - Request data
 */
const apiRequest = (endpoint, method, data = {}) => {
  // Remove sensitive data
  const safeData = { ...data };
  delete safeData.password;
  delete safeData.token;
  
  debug(`API ${method}: ${endpoint}`, safeData);
};

/**
 * Log API responses
 * @param {string} endpoint - API endpoint
 * @param {string} method - HTTP method
 * @param {Object} response - Response data
 * @param {number} status - HTTP status code
 */
const apiResponse = (endpoint, method, response, status) => {
  debug(`API ${method} Response: ${endpoint}`, { status, response });
};

/**
 * Log API errors
 * @param {string} endpoint - API endpoint
 * @param {string} method - HTTP method
 * @param {Error} error - Error object
 * @param {number} status - HTTP status code
 */
const apiError = (endpoint, method, error, status) => {
  warn(`API ${method} Error: ${endpoint}`, { status, error });
};

export default {
  debug,
  info,
  warn,
  error,
  authEvent,
  apiRequest,
  apiResponse,
  apiError
};