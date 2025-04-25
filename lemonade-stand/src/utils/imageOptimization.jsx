/**
 * Utility functions for image optimization
 */

/**
 * Generates a responsive image URL based on screen size
 * @param {string} imageUrl - Original image URL
 * @param {number} width - Requested width
 * @returns {string} - Optimized image URL
 */
export const getResponsiveImageUrl = (imageUrl, width = 400) => {
  if (!imageUrl) return '';
  
  // If the image is already from an image service that supports resizing
  if (imageUrl.includes('cloudinary.com')) {
    // Example: Cloudinary transformation
    return imageUrl.replace('/upload/', `/upload/w_${width},q_auto,f_auto/`);
  }
  
  // If the image is from our own server, we can use a simple query parameter
  if (imageUrl.startsWith('/')) {
    return `${imageUrl}?width=${width}`;
  }
  
  // For other images, return the original URL
  return imageUrl;
};

/**
 * Determines if an image should be lazy loaded based on its position
 * @param {number} index - Index of the image in a list
 * @param {number} threshold - Number of images to eagerly load
 * @returns {string} - 'lazy' or 'eager'
 */
export const getLazyLoadingStrategy = (index, threshold = 3) => {
  return index < threshold ? 'eager' : 'lazy';
};

/**
 * Creates a placeholder image URL for when images fail to load
 * @param {string} text - Text to display on the placeholder
 * @param {string} bgColor - Background color
 * @param {string} textColor - Text color
 * @returns {string} - Data URL for a placeholder image
 */
export const createPlaceholderImage = (
  text = 'Image not available',
  bgColor = 'F8E8A2',
  textColor = '333333'
) => {
  // Create a simple SVG placeholder
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">
      <rect width="300" height="200" fill="#${bgColor}"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="#${textColor}">${text}</text>
    </svg>
  `;
  
  // Convert to base64 data URL
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

/**
 * Preloads critical images
 * @param {Array<string>} imageUrls - Array of image URLs to preload
 */
export const preloadCriticalImages = (imageUrls = []) => {
  if (!imageUrls.length) return;
  
  imageUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
};