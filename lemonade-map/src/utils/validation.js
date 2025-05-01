/**
 * Utility functions for form validation
 */

/**
 * Validate profile form data
 * 
 * @param {Object} formData - The profile form data to validate
 * @returns {Object} - Object with errors for each field
 */
export const validateProfileForm = (formData) => {
  const errors = {};

  // Validate full name
  if (!formData.full_name) {
    errors.full_name = 'Full name is required';
  } else if (formData.full_name.length < 2) {
    errors.full_name = 'Full name must be at least 2 characters';
  } else if (formData.full_name.length > 50) {
    errors.full_name = 'Full name must be less than 50 characters';
  }

  // Validate phone (optional)
  if (formData.phone && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  // Validate bio (optional)
  if (formData.bio && formData.bio.length > 500) {
    errors.bio = 'Bio must be less than 500 characters';
  }

  return errors;
};

/**
 * Validate address form data
 * 
 * @param {Object} addressData - The address form data to validate
 * @returns {Object} - Object with errors for each field
 */
export const validateAddressForm = (addressData) => {
  const errors = {};

  // All fields are optional, but if provided, they should be valid
  
  // Validate street
  if (addressData.street && addressData.street.length < 5) {
    errors.street = 'Please enter a valid street address';
  }

  // Validate city
  if (addressData.city && addressData.city.length < 2) {
    errors.city = 'Please enter a valid city';
  }

  // Validate state
  if (addressData.state && addressData.state.length < 2) {
    errors.state = 'Please select a valid state';
  }

  // Validate postal code
  if (addressData.postalCode) {
    // US postal code validation
    if (addressData.country === 'United States' && !/^\d{5}(-\d{4})?$/.test(addressData.postalCode)) {
      errors.postalCode = 'Please enter a valid US ZIP code';
    }
    // Canadian postal code validation
    else if (addressData.country === 'Canada' && !/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(addressData.postalCode)) {
      errors.postalCode = 'Please enter a valid Canadian postal code';
    }
    // Generic validation for other countries
    else if (addressData.postalCode.length < 3 || addressData.postalCode.length > 10) {
      errors.postalCode = 'Please enter a valid postal code';
    }
  }

  // If useForSearch is true, require all address fields
  if (addressData.useForSearch) {
    if (!addressData.street) {
      errors.street = 'Street is required when using as search location';
    }
    if (!addressData.city) {
      errors.city = 'City is required when using as search location';
    }
    if (!addressData.state) {
      errors.state = 'State is required when using as search location';
    }
    if (!addressData.postalCode) {
      errors.postalCode = 'Postal code is required when using as search location';
    }
  }

  return errors;
};

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