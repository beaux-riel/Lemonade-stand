import React, { useState } from 'react';
import SellerRegistrationForm from './SellerRegistrationForm';
import { Alert, Card } from '../ui';
import { useAuth } from '../../contexts/AuthContext';
import { createStand, createProduct, uploadStandImage, uploadProductImage } from '../../api/supabaseApi';
import { useNavigate } from 'react-router-dom';

/**
 * Seller Registration Page Component
 */
const SellerRegistrationPage = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Handle form submission
  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Create the stand in Supabase
      const standData = {
        name: formData.name,
        description: formData.description || '',
        address: formData.address,
        location_lat: formData.location_lat,
        location_lng: formData.location_lng,
        owner_id: user.id,
        is_active: true
      };
      
      const { data: createdStand, error: standError } = await createStand(standData);
      
      if (standError) {
        throw new Error(`Failed to create stand: ${standError.message}`);
      }
      
      if (!createdStand || createdStand.length === 0) {
        throw new Error('Failed to create stand: No data returned');
      }
      
      const standId = createdStand[0].id;
      
      // Create products for the stand
      for (const productData of formData.products) {
        const newProduct = {
          name: productData.name,
          description: productData.description,
          price: parseFloat(productData.price),
          stand_id: standId,
          is_available: true
        };
        
        const { data: createdProduct, error: productError } = await createProduct(newProduct);
        
        if (productError) {
          console.error('Error creating product:', productError);
          continue;
        }
        
        // Upload product image if available
        if (productData.image && createdProduct && createdProduct.length > 0) {
          const productId = createdProduct[0].id;
          await uploadProductImage(productId, standId, user.id, productData.image);
        }
      }
      
      // Store the submitted data for display
      setSubmittedData(formData);
      
      // Show success message
      setSuccess(true);
      console.log('Stand created successfully with ID:', standId);
    } catch (err) {
      setError('Failed to register your stand. Please try again. ' + err.message);
      console.error('Error submitting form:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Reset the form
  const handleReset = () => {
    setSuccess(false);
    setSubmittedData(null);
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-display text-lemonade-blue-dark mb-6">Seller Registration</h1>
      
      {error && (
        <Alert variant="error" className="mb-6">
          {error}
        </Alert>
      )}
      
      {success ? (
        <div className="space-y-6">
          <Alert variant="success" title="Registration Successful!">
            Your lemonade stand has been registered successfully. You can now manage your stand and products.
          </Alert>
          
          <Card>
            <Card.Header>
              <h2 className="text-xl font-display">Registration Details</h2>
            </Card.Header>
            
            <Card.Body>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Stand Information</h3>
                  <p><span className="font-medium">Name:</span> {submittedData.name}</p>
                  <p><span className="font-medium">Address:</span> {submittedData.address}</p>
                  <p>
                    <span className="font-medium">Location:</span> {submittedData.location_lat.toFixed(6)}, {submittedData.location_lng.toFixed(6)}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold">Products</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    {submittedData.products.map((product, index) => (
                      <Card key={index} variant="yellow" className="h-full">
                        <Card.Header>
                          <h4 className="font-display">{product.name}</h4>
                        </Card.Header>
                        
                        {product.imagePreview && (
                          <img 
                            src={product.imagePreview} 
                            alt={product.name}
                            className="w-full h-40 object-cover"
                          />
                        )}
                        
                        <Card.Body>
                          <p className="text-sm mb-2">{product.description}</p>
                          <p className="font-bold text-lemonade-blue-dark">${parseFloat(product.price).toFixed(2)}</p>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </Card.Body>
            
            <Card.Footer>
              <div className="flex space-x-4">
                <button 
                  className="px-4 py-2 bg-lemonade-yellow text-gray-800 rounded-lg font-display hover:bg-lemonade-yellow-dark transition-colors"
                  onClick={handleReset}
                >
                  Register Another Stand
                </button>
                <button 
                  className="px-4 py-2 bg-lemonade-blue text-white rounded-lg font-display hover:bg-lemonade-blue-dark transition-colors"
                  onClick={() => navigate('/seller/dashboard')}
                >
                  Go to Dashboard
                </button>
              </div>
            </Card.Footer>
          </Card>
        </div>
      ) : (
        <SellerRegistrationForm 
          onSubmit={handleSubmit}
          loading={loading}
        />
      )}
    </div>
  );
};

export default SellerRegistrationPage;