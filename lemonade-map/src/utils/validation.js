/**
 * Utility functions for form validation
 */

/**
 * Validate seller form data
 * 
 * @param {Object} formData - The form data to validate
 * @returns {Object} - Object with errors for each field
 */
export const validateSellerForm = (formData) => {
  const errors = {};

  // Validate seller name
  if (!formData.name) {
    errors.name = 'Name is required';
  } else if (formData.name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else if (formData.name.length > 50) {
    errors.name = 'Name must be less than 50 characters';
  }

  // Validate seller address
  if (!formData.address) {
    errors.address = 'Address is required';
  } else if (formData.address.length < 5) {
    errors.address = 'Please enter a valid address';
  }

  // Validate coordinates
  if (!formData.location_lat || !formData.location_lng) {
    errors.location = 'Location coordinates are required. Please use the geocode button.';
  }

  // Validate products
  if (!formData.products || formData.products.length === 0) {
    errors.products = 'At least one product is required';
  } else {
    const productErrors = formData.products.map(validateProduct);
    if (productErrors.some(error => Object.keys(error).length > 0)) {
      errors.products = productErrors;
    }
  }

  return errors;
};

/**
 * Validate product data
 * 
 * @param {Object} product - The product data to validate
 * @returns {Object} - Object with errors for each field
 */
export const validateProduct = (product) => {
  const errors = {};

  // Validate product name
  if (!product.name) {
    errors.name = 'Product name is required';
  } else if (product.name.length < 2) {
    errors.name = 'Product name must be at least 2 characters';
  } else if (product.name.length > 50) {
    errors.name = 'Product name must be less than 50 characters';
  }

  // Validate product description
  if (!product.description) {
    errors.description = 'Product description is required';
  } else if (product.description.length < 10) {
    errors.description = 'Description must be at least 10 characters';
  } else if (product.description.length > 500) {
    errors.description = 'Description must be less than 500 characters';
  }

  // Validate product price
  if (!product.price) {
    errors.price = 'Price is required';
  } else if (isNaN(parseFloat(product.price))) {
    errors.price = 'Price must be a number';
  } else if (parseFloat(product.price) <= 0) {
    errors.price = 'Price must be greater than 0';
  } else if (parseFloat(product.price) > 100) {
    errors.price = 'Price must be less than $100';
  }

  return errors;
};

/**
 * Check if the form has any errors
 * 
 * @param {Object} errors - The errors object
 * @returns {boolean} - True if there are errors, false otherwise
 */
export const hasErrors = (errors) => {
  if (!errors) return false;
  
  // Check for top-level errors
  const topLevelErrors = Object.keys(errors).filter(key => key !== 'products');
  if (topLevelErrors.length > 0) return true;
  
  // Check for product errors
  if (errors.products && Array.isArray(errors.products)) {
    return errors.products.some(productError => Object.keys(productError).length > 0);
  }
  
  return false;
};