import { 
  getResponsiveImageUrl, 
  getLazyLoadingStrategy, 
  createPlaceholderImage,
  preloadCriticalImages
} from '../../utils/imageOptimization';

describe('imageOptimization utility functions', () => {
  describe('getResponsiveImageUrl function', () => {
    test('should return empty string for null or undefined input', () => {
      expect(getResponsiveImageUrl(null)).toBe('');
      expect(getResponsiveImageUrl(undefined)).toBe('');
      expect(getResponsiveImageUrl('')).toBe('');
    });

    test('should transform Cloudinary URLs correctly', () => {
      const cloudinaryUrl = 'https://res.cloudinary.com/demo/image/upload/sample.jpg';
      const transformedUrl = getResponsiveImageUrl(cloudinaryUrl, 300);
      expect(transformedUrl).toBe('https://res.cloudinary.com/demo/image/upload/w_300,q_auto,f_auto/sample.jpg');
    });

    test('should add width parameter to local URLs', () => {
      const localUrl = '/images/lemonade.jpg';
      const transformedUrl = getResponsiveImageUrl(localUrl, 500);
      expect(transformedUrl).toBe('/images/lemonade.jpg?width=500');
    });

    test('should return original URL for external non-Cloudinary URLs', () => {
      const externalUrl = 'https://example.com/image.jpg';
      const transformedUrl = getResponsiveImageUrl(externalUrl, 400);
      expect(transformedUrl).toBe(externalUrl);
    });

    test('should use default width if not specified', () => {
      const cloudinaryUrl = 'https://res.cloudinary.com/demo/image/upload/sample.jpg';
      const transformedUrl = getResponsiveImageUrl(cloudinaryUrl);
      expect(transformedUrl).toBe('https://res.cloudinary.com/demo/image/upload/w_400,q_auto,f_auto/sample.jpg');
    });
  });

  describe('getLazyLoadingStrategy function', () => {
    test('should return eager for images below threshold', () => {
      expect(getLazyLoadingStrategy(0)).toBe('eager');
      expect(getLazyLoadingStrategy(1)).toBe('eager');
      expect(getLazyLoadingStrategy(2)).toBe('eager');
    });

    test('should return lazy for images at or above threshold', () => {
      expect(getLazyLoadingStrategy(3)).toBe('lazy');
      expect(getLazyLoadingStrategy(4)).toBe('lazy');
      expect(getLazyLoadingStrategy(10)).toBe('lazy');
    });

    test('should respect custom threshold', () => {
      expect(getLazyLoadingStrategy(4, 5)).toBe('eager');
      expect(getLazyLoadingStrategy(5, 5)).toBe('lazy');
      expect(getLazyLoadingStrategy(6, 5)).toBe('lazy');
    });
  });

  describe('createPlaceholderImage function', () => {
    test('should create a valid SVG data URL', () => {
      const placeholder = createPlaceholderImage();
      expect(placeholder).toMatch(/^data:image\/svg\+xml;base64,/);
    });

    test('should include the provided text', () => {
      const text = 'Custom placeholder text';
      const placeholder = createPlaceholderImage(text);
      // Decode the base64 to check if it contains the text
      const decodedSvg = atob(placeholder.replace('data:image/svg+xml;base64,', ''));
      expect(decodedSvg).toContain(text);
    });

    test('should use custom colors', () => {
      const bgColor = 'FF0000';
      const textColor = '00FF00';
      const placeholder = createPlaceholderImage('Text', bgColor, textColor);
      const decodedSvg = atob(placeholder.replace('data:image/svg+xml;base64,', ''));
      expect(decodedSvg).toContain(`fill="#${bgColor}"`);
      expect(decodedSvg).toContain(`fill="#${textColor}"`);
    });

    test('should use default values when not provided', () => {
      const placeholder = createPlaceholderImage();
      const decodedSvg = atob(placeholder.replace('data:image/svg+xml;base64,', ''));
      expect(decodedSvg).toContain('Image not available');
      expect(decodedSvg).toContain('fill="#F8E8A2"');
      expect(decodedSvg).toContain('fill="#333333"');
    });
  });

  describe('preloadCriticalImages function', () => {
    // Mock document.createElement and appendChild
    let originalCreateElement;
    let mockLink;
    let appendedLinks = [];

    beforeEach(() => {
      // Save original createElement
      originalCreateElement = document.createElement;
      
      // Mock link element
      mockLink = {
        rel: null,
        as: null,
        href: null,
        setAttribute: function(name, value) {
          this[name] = value;
        },
        getAttribute: function(name) {
          return this[name];
        }
      };
      
      // Mock createElement
      document.createElement = jest.fn().mockImplementation((tagName) => {
        if (tagName === 'link') {
          return { ...mockLink };
        }
        return originalCreateElement.call(document, tagName);
      });
      
      // Track appended links
      appendedLinks = [];
      document.head.appendChild = jest.fn().mockImplementation((element) => {
        appendedLinks.push(element);
        return element;
      });
    });
    
    afterEach(() => {
      // Restore original createElement
      document.createElement = originalCreateElement;
      jest.clearAllMocks();
    });

    test('should do nothing for empty array', () => {
      preloadCriticalImages([]);
      expect(document.createElement).not.toHaveBeenCalled();
      expect(document.head.appendChild).not.toHaveBeenCalled();
    });

    test('should add preload links to document head', () => {
      const imageUrls = [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg'
      ];
      
      preloadCriticalImages(imageUrls);
      
      expect(document.createElement).toHaveBeenCalledTimes(2);
      expect(document.createElement).toHaveBeenCalledWith('link');
      expect(document.head.appendChild).toHaveBeenCalledTimes(2);
      
      expect(appendedLinks[0].rel).toBe('preload');
      expect(appendedLinks[0].as).toBe('image');
      expect(appendedLinks[0].href).toBe(imageUrls[0]);
      
      expect(appendedLinks[1].rel).toBe('preload');
      expect(appendedLinks[1].as).toBe('image');
      expect(appendedLinks[1].href).toBe(imageUrls[1]);
    });

    test('should handle undefined parameter', () => {
      preloadCriticalImages();
      expect(document.createElement).not.toHaveBeenCalled();
      expect(document.head.appendChild).not.toHaveBeenCalled();
    });
  });
});