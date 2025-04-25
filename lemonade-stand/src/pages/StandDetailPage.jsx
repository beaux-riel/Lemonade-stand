import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { 
  getStandById, 
  updateStand, 
  deleteStand, 
  uploadStandImage,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage
} from '../api/supabaseApi';
import { StandExpirationInfo, StandStatistics } from '../components/stands';
import { Button, Alert, Form, Tabs, Modal, Card } from '../components/ui';

/**
 * Stand Detail Page component for managing a specific stand
 * @returns {JSX.Element} - Stand Detail Page component
 */
const StandDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // State
  const [stand, setStand] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [activeTab, setActiveTab] = useState('details');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    location_lat: '',
    location_lng: '',
    is_active: true
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [visitorStats, setVisitorStats] = useState({
    totalViews: Math.floor(Math.random() * 500), // Placeholder for demo
    uniqueVisitors: Math.floor(Math.random() * 200), // Placeholder for demo
    averageTimeSpent: Math.floor(Math.random() * 5) + 1, // Placeholder for demo
    popularTimes: [
      { day: 'Monday', hour: '2-4 PM' },
      { day: 'Wednesday', hour: '3-5 PM' },
      { day: 'Saturday', hour: '12-2 PM' }
    ] // Placeholder for demo
  });
  
  // Fetch stand data
  useEffect(() => {
    const fetchStandData = async () => {
      try {
        setLoading(true);
        
        // Fetch stand details
        const { data: standData, error: standError } = await getStandById(id);
        
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
        setFormData({
          name: standData.name || '',
          description: standData.description || '',
          address: standData.address || '',
          location_lat: standData.location_lat || '',
          location_lng: standData.location_lng || '',
          is_active: standData.is_active
        });
        
        // Fetch products
        const { data: productsData, error: productsError } = await getProducts(id);
        
        if (productsError) {
          throw new Error(productsError.message);
        }
        
        setProducts(productsData || []);
      } catch (err) {
        console.error('Error fetching stand data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStandData();
  }, [id, user.id]);
  
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
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Update stand data
      const { data, error } = await updateStand(id, formData);
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Upload image if selected
      if (imageFile) {
        setUploadingImage(true);
        const { error: uploadError } = await uploadStandImage(id, user.id, imageFile);
        
        if (uploadError) {
          throw new Error(`Error uploading image: ${uploadError.message}`);
        }
        
        // Refresh stand data to get updated image URL
        const { data: refreshedData, error: refreshError } = await getStandById(id);
        
        if (refreshError) {
          throw new Error(refreshError.message);
        }
        
        setStand(refreshedData);
      } else {
        setStand(data[0]);
      }
      
      setSuccess('Stand updated successfully!');
      setEditMode(false);
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      console.error('Error updating stand:', err);
      setError(err.message);
    } finally {
      setLoading(false);
      setUploadingImage(false);
    }
  };
  
  // Handle stand deletion
  const handleDelete = async () => {
    setDeleting(true);
    
    try {
      const { error } = await deleteStand(id);
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Redirect to dashboard
      navigate('/seller/dashboard', { 
        state: { message: 'Stand deleted successfully!' } 
      });
    } catch (err) {
      console.error('Error deleting stand:', err);
      setError(err.message);
      setShowDeleteModal(false);
    } finally {
      setDeleting(false);
    }
  };
  
  // Handle stand activation/deactivation
  const handleToggleActive = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const newActiveState = !stand.is_active;
      
      const { data, error } = await updateStand(id, {
        is_active: newActiveState
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      setStand({
        ...stand,
        is_active: newActiveState
      });
      
      setFormData(prev => ({
        ...prev,
        is_active: newActiveState
      }));
      
      setSuccess(`Stand ${newActiveState ? 'activated' : 'deactivated'} successfully!`);
    } catch (err) {
      console.error('Error toggling stand active state:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle stand expiration extension
  const handleExtendExpiration = (updatedStand) => {
    setStand(updatedStand);
  };
  
  if (loading && !stand) {
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
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <Link to="/seller/dashboard" className="text-lemonade-blue hover:underline mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-display text-lemonade-blue-dark">
            {stand.name}
          </h1>
        </div>
        
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button
            variant={stand.is_active ? "danger-outline" : "success"}
            onClick={handleToggleActive}
            disabled={loading}
          >
            {stand.is_active ? 'Deactivate' : 'Activate'} Stand
          </Button>
          
          <Button
            variant="danger"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete Stand
          </Button>
        </div>
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
      
      {/* Stand expiration info */}
      <StandExpirationInfo 
        stand={stand} 
        onExtend={handleExtendExpiration} 
      />
      
      {/* Tabs */}
      <Tabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: 'details', label: 'Stand Details' },
          { id: 'products', label: 'Products' },
          { id: 'statistics', label: 'Visitor Statistics' }
        ]}
        className="mb-6"
      />
      
      {/* Stand Details Tab */}
      {activeTab === 'details' && (
        <div className="bg-white rounded-xl shadow-md p-6">
          {!editMode ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-display text-lemonade-blue-dark">
                  Stand Details
                </h2>
                <Button
                  variant="primary"
                  onClick={() => setEditMode(true)}
                >
                  Edit Details
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <div className="rounded-lg overflow-hidden border border-gray-200">
                    {stand.image_url ? (
                      <img 
                        src={stand.image_url} 
                        alt={stand.name} 
                        className="w-full h-64 object-cover"
                      />
                    ) : (
                      <div className="w-full h-64 bg-lemonade-yellow-light flex items-center justify-center">
                        <span className="text-lemonade-yellow-dark">No Image</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-gray-500 text-sm">Name</h3>
                      <p className="text-gray-800 font-medium">{stand.name}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-gray-500 text-sm">Status</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        stand.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {stand.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    
                    <div className="md:col-span-2">
                      <h3 className="text-gray-500 text-sm">Description</h3>
                      <p className="text-gray-800">
                        {stand.description || 'No description provided.'}
                      </p>
                    </div>
                    
                    <div className="md:col-span-2">
                      <h3 className="text-gray-500 text-sm">Address</h3>
                      <p className="text-gray-800">
                        {stand.address || 'No address provided.'}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-gray-500 text-sm">Latitude</h3>
                      <p className="text-gray-800 font-mono">
                        {stand.location_lat || 'N/A'}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-gray-500 text-sm">Longitude</h3>
                      <p className="text-gray-800 font-mono">
                        {stand.location_lng || 'N/A'}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-gray-500 text-sm">Created</h3>
                      <p className="text-gray-800">
                        {new Date(stand.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-gray-500 text-sm">Last Updated</h3>
                      <p className="text-gray-800">
                        {new Date(stand.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-display text-lemonade-blue-dark">
                  Edit Stand Details
                </h2>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setEditMode(false);
                    setImageFile(null);
                    setImagePreview(null);
                    // Reset form data to current stand data
                    setFormData({
                      name: stand.name || '',
                      description: stand.description || '',
                      address: stand.address || '',
                      location_lat: stand.location_lat || '',
                      location_lng: stand.location_lng || '',
                      is_active: stand.is_active
                    });
                  }}
                >
                  Cancel
                </Button>
              </div>
              
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
                      ) : stand.image_url ? (
                        <img 
                          src={stand.image_url} 
                          alt={stand.name} 
                          className="w-full h-64 object-cover"
                        />
                      ) : (
                        <div className="w-full h-64 bg-lemonade-yellow-light flex items-center justify-center">
                          <span className="text-lemonade-yellow-dark">No Image</span>
                        </div>
                      )}
                    </div>
                    
                    <Form.Group>
                      <Form.Label htmlFor="image">Stand Image</Form.Label>
                      <Form.Input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      <Form.Text>
                        Upload an image of your lemonade stand.
                      </Form.Text>
                    </Form.Group>
                    
                    <Form.Group>
                      <div className="flex items-center">
                        <Form.Checkbox
                          id="is_active"
                          name="is_active"
                          checked={formData.is_active}
                          onChange={handleInputChange}
                        />
                        <Form.Label htmlFor="is_active" className="ml-2 mb-0">
                          Stand is active
                        </Form.Label>
                      </div>
                      <Form.Text>
                        Inactive stands are not visible to the public.
                      </Form.Text>
                    </Form.Group>
                  </div>
                  
                  <div className="md:col-span-2">
                    <Form.Group>
                      <Form.Label htmlFor="name" required>
                        Stand Name
                      </Form.Label>
                      <Form.Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter stand name"
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
                        placeholder="Describe your lemonade stand"
                        rows={4}
                      />
                    </Form.Group>
                    
                    <Form.Group>
                      <Form.Label htmlFor="address">
                        Address
                      </Form.Label>
                      <Form.Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter stand address"
                      />
                    </Form.Group>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Form.Group>
                        <Form.Label htmlFor="location_lat">
                          Latitude
                        </Form.Label>
                        <Form.Input
                          id="location_lat"
                          name="location_lat"
                          type="number"
                          step="any"
                          value={formData.location_lat}
                          onChange={handleInputChange}
                          placeholder="Enter latitude"
                        />
                      </Form.Group>
                      
                      <Form.Group>
                        <Form.Label htmlFor="location_lng">
                          Longitude
                        </Form.Label>
                        <Form.Input
                          id="location_lng"
                          name="location_lng"
                          type="number"
                          step="any"
                          value={formData.location_lng}
                          onChange={handleInputChange}
                          placeholder="Enter longitude"
                        />
                      </Form.Group>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={loading || uploadingImage}
                  >
                    {loading || uploadingImage ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </Form>
            </>
          )}
        </div>
      )}
      
      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-display text-lemonade-blue-dark">
              Products
            </h2>
            <Link to={`/seller/stands/${id}/products/new`}>
              <Button variant="primary">
                Add New Product
              </Button>
            </Link>
          </div>
          
          {products.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-4">You don't have any products for this stand yet.</p>
              <Link to={`/seller/stands/${id}/products/new`}>
                <Button variant="primary">
                  Add Your First Product
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="hover:shadow-md transition">
                  <div className="h-48 bg-gray-100">
                    {product.image_url ? (
                      <img 
                        src={product.image_url} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-lemonade-yellow-light flex items-center justify-center">
                        <span className="text-lemonade-yellow-dark">No Image</span>
                      </div>
                    )}
                  </div>
                  
                  <Card.Body>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-display text-lemonade-blue-dark">
                        {product.name}
                      </h3>
                      <span className="text-lg font-semibold text-lemonade-blue">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {product.description || 'No description'}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        product.is_available 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {product.is_available ? 'Available' : 'Unavailable'}
                      </span>
                      
                      <Link 
                        to={`/seller/stands/${id}/products/${product.id}`}
                        className="text-lemonade-blue hover:underline"
                      >
                        Edit →
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Statistics Tab */}
      {activeTab === 'statistics' && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-display text-lemonade-blue-dark mb-6">
            Visitor Statistics
          </h2>
          
          <StandStatistics statistics={visitorStats} />
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Stand"
      >
        <div className="p-6">
          <p className="text-gray-700 mb-6">
            Are you sure you want to delete this stand? This action cannot be undone.
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
              {deleting ? 'Deleting...' : 'Delete Stand'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StandDetailPage;