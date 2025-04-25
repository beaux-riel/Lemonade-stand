import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { 
  getStandById,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  createProduct
} from '../api/supabaseApi';
import { Button, Alert, Form, Modal } from '../components/ui';

/**
 * Product Detail Page component for managing a specific product
 * @returns {JSX.Element} - Product Detail Page component
 */
const ProductDetailPage = () => {
  const { standId, productId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isNewProduct = productId === 'new';
  
  // State
  const [stand, setStand] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    is_available: true
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  
  // Fetch stand and product data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch stand details to verify ownership
        const { data: standData, error: standError } = await getStandById(standId);
        
        if (standError) {
          throw new Error(standError.message);
        }
        
        if (!standData) {
          throw new Error('Stand not found');
        }
        
        // Check if user is the owner
        if (standData.owner_id !== user.id) {
          throw new Error('You do not have permission to view this stand');
        }
        
        setStand(standData);
        
        // If editing an existing product, find it in the stand's products
        if (!isNewProduct && standData.products) {
          const foundProduct = standData.products.find(p => p.id === productId);
          
          if (!foundProduct) {
            throw new Error('Product not found');
          }
          
          setProduct(foundProduct);
          setFormData({
            name: foundProduct.name || '',
            description: foundProduct.description || '',
            price: foundProduct.price || '',
            is_available: foundProduct.is_available
          });
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [standId, productId, user.id, isNewProduct]);
  
  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Validate price
      const price = parseFloat(formData.price);
      if (isNaN(price) || price <= 0) {
        throw new Error('Please enter a valid price');
      }
      
      const productData = {
        ...formData,
        price,
        stand_id: standId
      };
      
      let savedProduct;
      
      if (isNewProduct) {
        // Create new product
        const { data, error } = await createProduct(productData);
        
        if (error) {
          throw new Error(error.message);
        }
        
        savedProduct = data[0];
        setProduct(savedProduct);
      } else {
        // Update existing product
        const { data, error } = await updateProduct(productId, productData);
        
        if (error) {
          throw new Error(error.message);
        }
        
        savedProduct = data[0];
        setProduct(savedProduct);
      }
      
      // Upload image if selected
      if (imageFile && savedProduct) {
        setUploadingImage(true);
        const { error: uploadError } = await uploadProductImage(
          savedProduct.id, 
          standId, 
          user.id, 
          imageFile
        );
        
        if (uploadError) {
          throw new Error(`Error uploading image: ${uploadError.message}`);
        }
        
        // Refresh stand data to get updated product with image URL
        const { data: refreshedData, error: refreshError } = await getStandById(standId);
        
        if (refreshError) {
          throw new Error(refreshError.message);
        }
        
        const updatedProduct = refreshedData.products.find(p => p.id === savedProduct.id);
        if (updatedProduct) {
          setProduct(updatedProduct);
        }
      }
      
      setSuccess(isNewProduct ? 'Product created successfully!' : 'Product updated successfully!');
      
      // If this was a new product, redirect to the product detail page
      if (isNewProduct) {
        navigate(`/seller/stands/${standId}/products/${savedProduct.id}`, { 
          replace: true,
          state: { message: 'Product created successfully!' }
        });
      }
      
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      console.error('Error saving product:', err);
      setError(err.message);
    } finally {
      setSaving(false);
      setUploadingImage(false);
    }
  };
  
  // Handle product deletion
  const handleDelete = async () => {
    setDeleting(true);
    
    try {
      const { error } = await deleteProduct(productId);
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Redirect to stand detail page
      navigate(`/seller/stands/${standId}`, { 
        state: { message: 'Product deleted successfully!' } 
      });
    } catch (err) {
      console.error('Error deleting product:', err);
      setError(err.message);
      setShowDeleteModal(false);
    } finally {
      setDeleting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lemonade-blue"></div>
        </div>
      </div>
    );
  }
  
  if (error && !stand) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="error" className="mb-4">
          {error}
        </Alert>
        <Link to="/seller/dashboard">
          <Button variant="secondary">
            Back to Dashboard
          </Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to={`/seller/stands/${standId}`} className="text-lemonade-blue hover:underline mb-2 inline-block">
          ← Back to {stand.name}
        </Link>
        <h1 className="text-3xl font-display text-lemonade-blue-dark">
          {isNewProduct ? 'Add New Product' : `Edit ${product?.name || 'Product'}`}
        </h1>
      </div>
      
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
          onDismiss={() => setSuccess(null)}
        >
          {success}
        </Alert>
      )}
      
      <div className="bg-white rounded-xl shadow-md p-6">
        <Form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="rounded-lg overflow-hidden border border-gray-200 mb-4">
                {imagePreview ? (
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-64 object-cover"
                  />
                ) : product?.image_url ? (
                  <img 
                    src={product.image_url} 
                    alt={product.name} 
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <div className="w-full h-64 bg-lemonade-yellow-light flex items-center justify-center">
                    <span className="text-lemonade-yellow-dark">No Image</span>
                  </div>
                )}
              </div>
              
              <Form.Group>
                <Form.Label htmlFor="image">Product Image</Form.Label>
                <Form.Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <Form.Text>
                  Upload an image of your product.
                </Form.Text>
              </Form.Group>
              
              <Form.Group>
                <div className="flex items-center">
                  <Form.Checkbox
                    id="is_available"
                    name="is_available"
                    checked={formData.is_available}
                    onChange={handleInputChange}
                  />
                  <Form.Label htmlFor="is_available" className="ml-2 mb-0">
                    Product is available
                  </Form.Label>
                </div>
                <Form.Text>
                  Unavailable products are not shown to customers.
                </Form.Text>
              </Form.Group>
            </div>
            
            <div className="md:col-span-2">
              <Form.Group>
                <Form.Label htmlFor="name" required>
                  Product Name
                </Form.Label>
                <Form.Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                  required
                />
              </Form.Group>
              
              <Form.Group>
                <Form.Label htmlFor="description">
                  Description
                </Form.Label>
                <Form.Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your product"
                  rows={4}
                />
              </Form.Group>
              
              <Form.Group>
                <Form.Label htmlFor="price" required>
                  Price ($)
                </Form.Label>
                <Form.Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                  required
                />
              </Form.Group>
            </div>
          </div>
          
          <div className="flex justify-between mt-6">
            {!isNewProduct && (
              <Button
                type="button"
                variant="danger"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete Product
              </Button>
            )}
            
            <div className="flex space-x-3">
              <Link to={`/seller/stands/${standId}`}>
                <Button
                  type="button"
                  variant="secondary"
                  disabled={saving || uploadingImage}
                >
                  Cancel
                </Button>
              </Link>
              
              <Button
                type="submit"
                variant="primary"
                disabled={saving || uploadingImage}
              >
                {saving || uploadingImage 
                  ? (isNewProduct ? 'Creating...' : 'Saving...') 
                  : (isNewProduct ? 'Create Product' : 'Save Changes')}
              </Button>
            </div>
          </div>
        </Form>
      </div>
      
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Product"
      >
        <div className="p-6">
          <p className="text-gray-700 mb-6">
            Are you sure you want to delete this product? This action cannot be undone.
          </p>
          
          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            
            <Button
              variant="danger"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? 'Deleting...' : 'Delete Product'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductDetailPage;