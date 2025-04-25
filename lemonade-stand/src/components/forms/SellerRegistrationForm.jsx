import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  Form, 
  Button, 
  Card, 
  Alert,
  Loader
} from '../ui';
import { geocodeAddress } from '../../utils/geocoding';
import { validateSellerForm, hasErrors } from '../../utils/validation';

// Initial form state
const initialFormState = {
  name: '',
  address: '',
  location_lat: null,
  location_lng: null,
  products: [
    {
      name: '',
      description: '',
      price: '',
      image: null,
      imagePreview: null
    }
  ]
};

/**
 * Seller Registration Form Component
 */
const SellerRegistrationForm = ({ onSubmit, loading = false }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [geocodingLoading, setGeocodingLoading] = useState(false);
  const [geocodingError, setGeocodingError] = useState(null);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear location coordinates if address changes
    if (name === 'address') {
      setFormData(prev => ({
        ...prev,
        location_lat: null,
        location_lng: null
      }));
    }
    
    // Clear errors for this field
    if (submitAttempted) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  // Handle product changes
  const handleProductChange = (index, field, value) => {
    setFormData(prev => {
      const updatedProducts = [...prev.products];
      updatedProducts[index] = {
        ...updatedProducts[index],
        [field]: value
      };
      return {
        ...prev,
        products: updatedProducts
      };
    });
    
    // Clear errors for this product field
    if (submitAttempted && errors.products) {
      setErrors(prev => {
        const updatedProductErrors = [...(prev.products || [])];
        if (updatedProductErrors[index]) {
          updatedProductErrors[index] = {
            ...updatedProductErrors[index],
            [field]: null
          };
        }
        return {
          ...prev,
          products: updatedProductErrors
        };
      });
    }
  };
  
  // Handle image upload
  const handleImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Create image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      handleProductChange(index, 'imagePreview', reader.result);
    };
    reader.readAsDataURL(file);
    
    // Store the file
    handleProductChange(index, 'image', file);
  };
  
  // Handle geocoding
  const handleGeocode = async () => {
    if (!formData.address) {
      setGeocodingError('Please enter an address first');
      return;
    }
    
    setGeocodingLoading(true);
    setGeocodingError(null);
    
    try {
      const coordinates = await geocodeAddress(formData.address);
      
      if (!coordinates) {
        setGeocodingError('Could not find coordinates for this address. Please try a different address.');
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        location_lat: coordinates.lat,
        location_lng: coordinates.lng
      }));
      
      // Clear location error if it exists
      if (errors.location) {
        setErrors(prev => ({
          ...prev,
          location: null
        }));
      }
    } catch (error) {
      setGeocodingError(error.message);
    } finally {
      setGeocodingLoading(false);
    }
  };
  
  // Add another product
  const handleAddProduct = () => {
    if (formData.products.length >= 2) return;
    
    setFormData(prev => ({
      ...prev,
      products: [
        ...prev.products,
        {
          name: '',
          description: '',
          price: '',
          image: null,
          imagePreview: null
        }
      ]
    }));
  };
  
  // Remove a product
  const handleRemoveProduct = (index) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index)
    }));
    
    // Remove errors for this product
    if (errors.products) {
      setErrors(prev => ({
        ...prev,
        products: prev.products.filter((_, i) => i !== index)
      }));
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitAttempted(true);
    
    // Validate form
    const validationErrors = validateSellerForm(formData);
    setErrors(validationErrors);
    
    // If there are errors, don't submit
    if (hasErrors(validationErrors)) {
      return;
    }
    
    // Format data for submission
    const formattedData = {
      ...formData,
      products: formData.products.map(product => ({
        name: product.name,
        description: product.description,
        price: parseFloat(product.price),
        image: product.image
      }))
    };
    
    // Submit the form
    onSubmit(formattedData);
  };
  
  // Reset the form
  const handleReset = () => {
    setFormData(initialFormState);
    setErrors({});
    setGeocodingError(null);
    setSubmitAttempted(false);
  };
  
  return (
    <Card className="max-w-3xl mx-auto">
      <Card.Header>
        <h2 className="text-2xl font-display text-lemonade-blue-dark">Register Your Lemonade Stand</h2>
      </Card.Header>
      
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {/* Seller Information */}
          <div className="mb-6">
            <h3 className="text-xl font-display text-lemonade-pink-dark mb-4">Seller Information</h3>
            
            <Form.Group>
              <Form.Label htmlFor="name" required>Stand Name</Form.Label>
              <Form.Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your lemonade stand name"
                error={errors.name}
              />
            </Form.Group>
            
            <Form.Group>
              <Form.Label htmlFor="address" required>Address</Form.Label>
              <div className="flex space-x-2">
                <div className="flex-grow">
                  <Form.Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your stand's address"
                    error={errors.address}
                  />
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleGeocode}
                  disabled={!formData.address || geocodingLoading}
                  className="whitespace-nowrap"
                >
                  {geocodingLoading ? (
                    <Loader size="sm" variant="white" />
                  ) : (
                    'Geocode Address'
                  )}
                </Button>
              </div>
              
              {geocodingError && (
                <Alert variant="error" className="mt-2">
                  {geocodingError}
                </Alert>
              )}
              
              {errors.location && (
                <p className="mt-1 text-sm text-red-500">{errors.location}</p>
              )}
              
              {formData.location_lat && formData.location_lng && (
                <div className="mt-2 p-2 bg-green-100 text-green-800 rounded-md text-sm">
                  <span className="font-semibold">✓ Location verified:</span> {formData.location_lat.toFixed(6)}, {formData.location_lng.toFixed(6)}
                </div>
              )}
            </Form.Group>
          </div>
          
          {/* Products */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-display text-lemonade-pink-dark">Products</h3>
              
              {formData.products.length < 2 && (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={handleAddProduct}
                >
                  Add Product
                </Button>
              )}
            </div>
            
            {errors.products && !Array.isArray(errors.products) && (
              <Alert variant="error" className="mb-4">
                {errors.products}
              </Alert>
            )}
            
            {formData.products.map((product, index) => (
              <div 
                key={index} 
                className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-display text-lg">Product {index + 1}</h4>
                  
                  {formData.products.length > 1 && (
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemoveProduct(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
                
                <Form.Group>
                  <Form.Label htmlFor={`product-${index}-name`} required>Product Name</Form.Label>
                  <Form.Input
                    id={`product-${index}-name`}
                    value={product.name}
                    onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                    placeholder="e.g., Classic Lemonade"
                    error={errors.products && errors.products[index]?.name}
                  />
                </Form.Group>
                
                <Form.Group>
                  <Form.Label htmlFor={`product-${index}-description`} required>Description</Form.Label>
                  <Form.Textarea
                    id={`product-${index}-description`}
                    value={product.description}
                    onChange={(e) => handleProductChange(index, 'description', e.target.value)}
                    placeholder="Describe your product..."
                    rows={3}
                    error={errors.products && errors.products[index]?.description}
                  />
                </Form.Group>
                
                <Form.Group>
                  <Form.Label htmlFor={`product-${index}-price`} required>Price ($)</Form.Label>
                  <Form.Input
                    id={`product-${index}-price`}
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={product.price}
                    onChange={(e) => handleProductChange(index, 'price', e.target.value)}
                    placeholder="0.00"
                    error={errors.products && errors.products[index]?.price}
                  />
                </Form.Group>
                
                <Form.Group>
                  <Form.Label htmlFor={`product-${index}-image`}>Product Image</Form.Label>
                  <div className="flex items-start space-x-4">
                    <div className="flex-grow">
                      <input
                        type="file"
                        id={`product-${index}-image`}
                        accept="image/*"
                        onChange={(e) => handleImageUpload(index, e)}
                        className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-lemonade-blue-light file:text-lemonade-blue-dark
                          hover:file:bg-lemonade-blue-dark hover:file:text-white
                          file:cursor-pointer file:transition-colors"
                      />
                      {errors.products && errors.products[index]?.image && (
                        <p className="mt-1 text-sm text-red-500">{errors.products[index].image}</p>
                      )}
                      <p className="mt-1 text-xs text-gray-500">
                        Optional. Max size: 5MB. Formats: JPEG, PNG, WebP
                      </p>
                    </div>
                    
                    {product.imagePreview && (
                      <div className="w-20 h-20 relative">
                        <img
                          src={product.imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-md"
                        />
                        <button
                          type="button"
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                          onClick={() => {
                            handleProductChange(index, 'image', null);
                            handleProductChange(index, 'imagePreview', null);
                          }}
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                </Form.Group>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={loading}
            >
              Reset Form
            </Button>
            
            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader size="sm" variant="white" className="mr-2" />
                  Submitting...
                </>
              ) : (
                'Register Stand'
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

SellerRegistrationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

export default SellerRegistrationForm;