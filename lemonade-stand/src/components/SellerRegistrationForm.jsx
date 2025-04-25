import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from './ui';
import { createStand, createProduct, uploadImage } from '../api/supabaseApi';
import { getCurrentUser } from '../api/supabaseApi';

/**
 * Geocode an address to get latitude and longitude
 * @param {string} address - The address to geocode
 * @returns {Promise<{lat: number, lng: number} | null>} - The coordinates or null if geocoding failed
 */
const geocodeAddress = async (address) => {
  try {
    // Using OpenStreetMap Nominatim API for geocoding
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
      {
        headers: {
          'Accept-Language': 'en',
        },
      }
    );
    
    if (!response.ok) {
      throw new Error('Geocoding request failed');
    }
    
    const data = await response.json();
    
    if (data.length === 0) {
      return null;
    }
    
    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };
  } catch (error) {
    console.error('Error geocoding address:', error);
    return null;
  }
};

/**
 * Product form component for adding a product
 */
const ProductForm = ({ index, product, onChange, onRemove, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(index, { ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onChange(index, { ...product, imageFile: file });
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg mb-4 bg-white">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-display text-lemonade-blue-dark">
          Product {index + 1}
        </h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onRemove(index)}
          className="text-red-500 hover:text-red-700"
        >
          Remove
        </Button>
      </div>

      <Form.Group>
        <Form.Label htmlFor={`product-name-${index}`} required>
          Product Name
        </Form.Label>
        <Form.Input
          id={`product-name-${index}`}
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="e.g., Classic Lemonade"
          required
          error={errors?.name}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor={`product-description-${index}`}>
          Description
        </Form.Label>
        <Form.Textarea
          id={`product-description-${index}`}
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Describe your product..."
          rows={3}
          error={errors?.description}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor={`product-price-${index}`} required>
          Price ($)
        </Form.Label>
        <Form.Input
          id={`product-price-${index}`}
          name="price"
          type="number"
          min="0.01"
          step="0.01"
          value={product.price}
          onChange={handleChange}
          placeholder="0.00"
          required
          error={errors?.price}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor={`product-image-${index}`}>
          Product Image
        </Form.Label>
        <input
          id={`product-image-${index}`}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        {product.imageFile && (
          <div className="mt-2">
            <img
              src={URL.createObjectURL(product.imageFile)}
              alt="Product preview"
              className="h-32 w-32 object-cover rounded-lg"
            />
          </div>
        )}
        {errors?.imageFile && (
          <p className="mt-1 text-sm text-red-500">{errors.imageFile}</p>
        )}
      </Form.Group>
    </div>
  );
};

/**
 * Seller Registration Form component
 */
const SellerRegistrationForm = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [geocodingStatus, setGeocodingStatus] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  
  // Form state
  const [formData, setFormData] = useState({
    standName: '',
    standDescription: '',
    address: '',
    location: null,
    products: [
      {
        name: '',
        description: '',
        price: '',
        imageFile: null,
      }
    ],
  });

  // Get current user on component mount
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await getCurrentUser();
      if (error) {
        console.error('Error fetching user:', error);
        setError('You must be logged in to register as a seller.');
        return;
      }
      
      if (data?.user) {
        setUser(data.user);
      } else {
        setError('You must be logged in to register as a seller.');
      }
    };
    
    fetchUser();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  // Handle address change and geocoding
  const handleAddressChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      address: value,
      location: null, // Reset location when address changes
    }));
    
    // Clear error for address if it exists
    if (formErrors.address) {
      setFormErrors((prev) => ({
        ...prev,
        address: null,
      }));
    }
    
    setGeocodingStatus(null);
  };

  // Geocode the address
  const handleGeocodeAddress = async () => {
    if (!formData.address.trim()) {
      setFormErrors((prev) => ({
        ...prev,
        address: 'Please enter an address to geocode',
      }));
      return;
    }
    
    setGeocodingStatus('loading');
    const coordinates = await geocodeAddress(formData.address);
    
    if (coordinates) {
      setFormData((prev) => ({
        ...prev,
        location: coordinates,
      }));
      setGeocodingStatus('success');
      
      // Clear error for address if it exists
      if (formErrors.address) {
        setFormErrors((prev) => ({
          ...prev,
          address: null,
        }));
      }
    } else {
      setGeocodingStatus('error');
      setFormErrors((prev) => ({
        ...prev,
        address: 'Could not find coordinates for this address. Please try a different address.',
      }));
    }
  };

  // Handle product changes
  const handleProductChange = (index, updatedProduct) => {
    const updatedProducts = [...formData.products];
    updatedProducts[index] = updatedProduct;
    
    setFormData((prev) => ({
      ...prev,
      products: updatedProducts,
    }));
    
    // Clear errors for this product if they exist
    if (formErrors[`products[${index}]`]) {
      setFormErrors((prev) => ({
        ...prev,
        [`products[${index}]`]: null,
      }));
    }
  };

  // Add a new product (max 2)
  const handleAddProduct = () => {
    if (formData.products.length < 2) {
      setFormData((prev) => ({
        ...prev,
        products: [
          ...prev.products,
          {
            name: '',
            description: '',
            price: '',
            imageFile: null,
          },
        ],
      }));
    }
  };

  // Remove a product
  const handleRemoveProduct = (index) => {
    const updatedProducts = [...formData.products];
    updatedProducts.splice(index, 1);
    
    setFormData((prev) => ({
      ...prev,
      products: updatedProducts,
    }));
    
    // Clear errors for this product
    if (formErrors[`products[${index}]`]) {
      const newErrors = { ...formErrors };
      delete newErrors[`products[${index}]`];
      setFormErrors(newErrors);
    }
  };

  // Validate the form
  const validateForm = () => {
    const errors = {};
    
    // Validate stand name
    if (!formData.standName.trim()) {
      errors.standName = 'Stand name is required';
    }
    
    // Validate address and location
    if (!formData.address.trim()) {
      errors.address = 'Address is required';
    } else if (!formData.location) {
      errors.address = 'Please geocode your address to get coordinates';
    }
    
    // Validate products
    formData.products.forEach((product, index) => {
      const productErrors = {};
      
      if (!product.name.trim()) {
        productErrors.name = 'Product name is required';
      }
      
      if (!product.price || isNaN(parseFloat(product.price)) || parseFloat(product.price) <= 0) {
        productErrors.price = 'Please enter a valid price greater than 0';
      }
      
      if (Object.keys(productErrors).length > 0) {
        errors[`products[${index}]`] = productErrors;
      }
    });
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setError('You must be logged in to register as a seller.');
      return;
    }
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // 1. Create the stand
      const standData = {
        name: formData.standName,
        description: formData.standDescription,
        location_lat: formData.location.lat,
        location_lng: formData.location.lng,
        address: formData.address,
        owner_id: user.id,
        is_active: true,
      };
      
      const { data: standResult, error: standError } = await createStand(standData);
      
      if (standError) {
        throw new Error(`Error creating stand: ${standError.message}`);
      }
      
      const standId = standResult[0].id;
      
      // 2. Create products
      for (const product of formData.products) {
        // Upload image if provided
        let imageUrl = null;
        
        if (product.imageFile) {
          const filePath = `products/${standId}/${Date.now()}-${product.imageFile.name}`;
          const { error: uploadError } = await uploadImage(
            'product-images',
            filePath,
            product.imageFile
          );
          
          if (uploadError) {
            console.error('Error uploading product image:', uploadError);
          } else {
            imageUrl = `product-images/${filePath}`;
          }
        }
        
        const productData = {
          name: product.name,
          description: product.description,
          price: parseFloat(product.price),
          image_url: imageUrl,
          stand_id: standId,
          is_available: true,
        };
        
        const { error: productError } = await createProduct(productData);
        
        if (productError) {
          console.error(`Error creating product ${product.name}:`, productError);
        }
      }
      
      // Success!
      setSuccess(true);
      
      // Reset form
      setFormData({
        standName: '',
        standDescription: '',
        address: '',
        location: null,
        products: [
          {
            name: '',
            description: '',
            price: '',
            imageFile: null,
          }
        ],
      });
      
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.message || 'An error occurred while registering your stand. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-lemonade-yellow-light rounded-xl shadow-playful">
      <h1 className="text-3xl font-display text-lemonade-blue-dark mb-2">
        Register Your Lemonade Stand
      </h1>
      <p className="text-gray-600 mb-6">
        Fill out the form below to register as a seller and add your products
      </p>
      
      {error && (
        <Alert 
          variant="error" 
          className="mb-4"
          dismissible
          onDismiss={() => setError(null)}
        >
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert 
          variant="success" 
          className="mb-4"
          dismissible
          onDismiss={() => setSuccess(false)}
        >
          Your lemonade stand has been successfully registered! You can now manage your stand and products.
        </Alert>
      )}
      
      <Form onSubmit={handleSubmit}>
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h2 className="text-xl font-display text-lemonade-blue-dark mb-4">
            Stand Information
          </h2>
          
          <Form.Group>
            <Form.Label htmlFor="standName" required>
              Stand Name
            </Form.Label>
            <Form.Input
              id="standName"
              name="standName"
              value={formData.standName}
              onChange={handleInputChange}
              placeholder="e.g., Sunny Lemonade"
              required
              error={formErrors.standName}
            />
          </Form.Group>
          
          <Form.Group>
            <Form.Label htmlFor="standDescription">
              Description
            </Form.Label>
            <Form.Textarea
              id="standDescription"
              name="standDescription"
              value={formData.standDescription}
              onChange={handleInputChange}
              placeholder="Describe your lemonade stand..."
              rows={3}
              error={formErrors.standDescription}
            />
          </Form.Group>
          
          <Form.Group>
            <Form.Label htmlFor="address" required>
              Address
            </Form.Label>
            <div className="flex space-x-2">
              <div className="flex-grow">
                <Form.Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleAddressChange}
                  placeholder="Enter your full address"
                  required
                  error={formErrors.address}
                />
              </div>
              <Button
                type="button"
                variant="secondary"
                onClick={handleGeocodeAddress}
                disabled={loading || !formData.address.trim()}
              >
                {geocodingStatus === 'loading' ? 'Geocoding...' : 'Geocode'}
              </Button>
            </div>
            {geocodingStatus === 'success' && (
              <p className="mt-2 text-sm text-green-600">
                ✓ Address geocoded successfully! Coordinates: {formData.location.lat.toFixed(6)}, {formData.location.lng.toFixed(6)}
              </p>
            )}
          </Form.Group>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-display text-lemonade-blue-dark">
              Products
            </h2>
            {formData.products.length < 2 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddProduct}
              >
                Add Product
              </Button>
            )}
          </div>
          
          {formData.products.map((product, index) => (
            <ProductForm
              key={index}
              index={index}
              product={product}
              onChange={handleProductChange}
              onRemove={handleRemoveProduct}
              errors={formErrors[`products[${index}]`]}
            />
          ))}
          
          {formData.products.length === 0 && (
            <p className="text-gray-500 text-center py-4">
              No products added yet. Click "Add Product" to get started.
            </p>
          )}
        </div>
        
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={loading}
            className="min-w-[150px]"
          >
            {loading ? 'Registering...' : 'Register Stand'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SellerRegistrationForm;