import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserStands, createStand, getAllProducts, getProducts, updateProduct } from '../api/supabaseApi';
import { Link } from 'react-router-dom';
import { Button, Alert, Tabs, Card, Form, Modal } from '../components/ui';

/**
 * Seller Dashboard page component
 * @returns {JSX.Element} - Seller Dashboard page component
 */
const SellerDashboardPage = () => {
  const { user } = useAuth();
  const [stands, setStands] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [activeTab, setActiveTab] = useState('stands');
  const [editingProduct, setEditingProduct] = useState(null);
  const [quickEditProduct, setQuickEditProduct] = useState(null);
  const [productFormData, setProductFormData] = useState({
    name: '',
    description: '',
    price: '',
    is_available: true
  });
  const [saving, setSaving] = useState(false);
  
  // Fetch user's stands and products
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch stands
        const { data: standsData, error: standsError } = await getUserStands(user.id);
        
        if (standsError) {
          throw new Error(standsError.message);
        }
        
        setStands(standsData || []);
        
        // Fetch all products for user's stands
        if (standsData && standsData.length > 0) {
          const standIds = standsData.map(stand => stand.id);
          
          // Get all products for all stands
          const userProducts = [];
          
          for (const standId of standIds) {
            const { data: productsData, error: productsError } = await getProducts(standId);
            
            if (productsError) {
              console.error('Error fetching products for stand:', standId, productsError);
              continue;
            }
            
            if (productsData && productsData.length > 0) {
              // Add stand information to each product
              const productsWithStandInfo = productsData.map(product => ({
                ...product,
                stand_name: standsData.find(s => s.id === product.stand_id)?.name || 'Unknown Stand'
              }));
              
              userProducts.push(...productsWithStandInfo);
            }
          }
          
          setProducts(userProducts);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load your data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user.id]);
  
  // Handle quick edit for product availability
  const handleQuickAvailabilityToggle = async (product) => {
    setSaving(true);
    try {
      const { data, error } = await updateProduct(product.id, {
        is_available: !product.is_available
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Update the product in the state
      setProducts(prevProducts => 
        prevProducts.map(p => p.id === product.id ? {...p, is_available: !p.is_available} : p)
      );
      
      setSuccess(`Product "${product.name}" is now ${!product.is_available ? 'available' : 'unavailable'}`);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(`Failed to update product: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };
  
  // Open quick edit modal for a product
  const openQuickEdit = (product) => {
    setQuickEditProduct(product);
    setProductFormData({
      price: product.price,
      is_available: product.is_available
    });
  };
  
  // Handle quick edit form input change
  const handleQuickEditInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Save quick edit changes
  const saveQuickEdit = async () => {
    if (!quickEditProduct) return;
    
    setSaving(true);
    try {
      // Validate price
      const price = parseFloat(productFormData.price);
      if (isNaN(price) || price <= 0) {
        throw new Error('Please enter a valid price');
      }
      
      const { data, error } = await updateProduct(quickEditProduct.id, {
        price,
        is_available: productFormData.is_available
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Update the product in the state
      setProducts(prevProducts => 
        prevProducts.map(p => p.id === quickEditProduct.id ? 
          {...p, price, is_available: productFormData.is_available} : p)
      );
      
      setSuccess(`Product "${quickEditProduct.name}" updated successfully`);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
      
      // Close the modal
      setQuickEditProduct(null);
    } catch (err) {
      setError(`Failed to update product: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display text-lemonade-blue-dark mb-2">
          Seller Dashboard
        </h1>
        <p className="text-gray-600">
          Manage your lemonade stands and products
        </p>
      </div>
      
      {error && (
        <Alert 
          variant="error" 
          className="mb-6"
          dismissible
          onDismiss={() => setError(null)}
        >
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert 
          variant="success" 
          className="mb-6"
          dismissible
          onDismiss={() => setSuccess(null)}
        >
          {success}
        </Alert>
      )}
      
      {/* Tabs */}
      <Tabs
        defaultTab={activeTab === 'products' ? 1 : 0}
        onChange={(index) => setActiveTab(index === 0 ? 'stands' : 'products')}
        className="mb-6"
      >
        <Tabs.Item>My Stands</Tabs.Item>
        <Tabs.Item>My Products</Tabs.Item>
        
        <Tabs.Panel>
          {/* Stands Tab Content */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-display text-lemonade-blue-dark">
              Your Lemonade Stands
            </h2>
            <Link to="/seller/stands/new">
              <Button variant="primary">
                Add New Stand
              </Button>
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lemonade-blue"></div>
            </div>
          ) : stands.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-4">You don't have any lemonade stands yet.</p>
              <Link to="/seller/stands/new">
                <Button variant="primary">
                  Create Your First Stand
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stands.map((stand) => (
                <div key={stand.id} className="border rounded-lg overflow-hidden hover:shadow-md transition">
                  {stand.image_url ? (
                    <img 
                      src={stand.image_url} 
                      alt={stand.name} 
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-lemonade-yellow-light flex items-center justify-center">
                      <span className="text-lemonade-yellow-dark">No Image</span>
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-xl font-display text-lemonade-blue-dark mb-2">
                      {stand.name}
                    </h3>
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {stand.description || 'No description'}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        stand.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {stand.is_active ? 'Active' : 'Inactive'}
                      </span>
                      <Link 
                        to={`/seller/stands/${stand.id}`}
                        className="text-lemonade-blue hover:underline"
                        onClick={(e) => {
                          // Prevent default if stand ID is missing
                          if (!stand.id) {
                            e.preventDefault();
                            setError('Cannot manage this stand: Stand ID is missing');
                          }
                        }}
                        state={{ standData: stand }} // Pass stand data to the detail page
                      >
                        Manage →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        </Tabs.Panel>
        
        <Tabs.Panel>
          {/* Products Tab Content */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-display text-lemonade-blue-dark">
              Your Products
            </h2>
            {stands.length > 0 && (
              <div className="flex space-x-2">
                <select 
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lemonade-blue"
                  onChange={(e) => {
                    if (e.target.value) {
                      window.location.href = `/seller/stands/${e.target.value}/products/new`;
                    }
                  }}
                  defaultValue=""
                >
                  <option value="" disabled>Select a stand...</option>
                  {stands.map(stand => (
                    <option key={stand.id} value={stand.id}>
                      {stand.name}
                    </option>
                  ))}
                </select>
                <Button 
                  variant="primary"
                  onClick={() => {
                    const select = document.querySelector('select');
                    if (select.value) {
                      window.location.href = `/seller/stands/${select.value}/products/new`;
                    } else {
                      alert('Please select a stand first');
                    }
                  }}
                >
                  Add New Product
                </Button>
              </div>
            )}
          </div>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lemonade-blue"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-4">
                {stands.length === 0 
                  ? "You need to create a stand before adding products." 
                  : "You don't have any products yet."}
              </p>
              {stands.length === 0 ? (
                <Link to="/seller/stands/new">
                  <Button variant="primary">
                    Create Your First Stand
                  </Button>
                </Link>
              ) : (
                <Link to={`/seller/stands/${stands[0].id}/products/new`}>
                  <Button variant="primary">
                    Add Your First Product
                  </Button>
                </Link>
              )}
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
                  <div className="p-4">
                    <h3 className="text-xl font-display text-lemonade-blue-dark mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-lemonade-blue mb-2">
                      {product.stand_name}
                    </p>
                    <p className="text-gray-600 mb-2 line-clamp-2">
                      {product.description || 'No description'}
                    </p>
                    <p className="text-lg font-semibold text-lemonade-blue-dark mb-3">
                      ${parseFloat(product.price).toFixed(2)}
                    </p>
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => handleQuickAvailabilityToggle(product)}
                        disabled={saving}
                        className={`px-2 py-1 rounded-full text-xs cursor-pointer hover:opacity-80 ${
                          product.is_available 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {product.is_available ? 'Available' : 'Unavailable'}
                      </button>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => openQuickEdit(product)}
                          className="text-lemonade-blue hover:underline"
                          disabled={saving}
                        >
                          Quick Edit
                        </button>
                        <Link
                          to={`/seller/stands/${product.stand_id}/products/${product.id}`}
                          className="text-lemonade-blue hover:underline"
                        >
                          Full Edit →
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
        </Tabs.Panel>
      </Tabs>
      
      {/* Quick Edit Product Modal */}
      {quickEditProduct && (
        <Modal
          isOpen={!!quickEditProduct}
          onClose={() => setQuickEditProduct(null)}
          title={`Quick Edit: ${quickEditProduct.name}`}
        >
          <div className="p-6">
            <Form onSubmit={(e) => { e.preventDefault(); saveQuickEdit(); }}>
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
                  value={productFormData.price}
                  onChange={handleQuickEditInputChange}
                  placeholder="Enter price"
                  required
                />
              </Form.Group>
              
              <Form.Group>
                <div className="flex items-center">
                  <Form.Checkbox
                    id="is_available"
                    name="is_available"
                    checked={productFormData.is_available}
                    onChange={handleQuickEditInputChange}
                  />
                  <Form.Label htmlFor="is_available" className="ml-2 mb-0">
                    Product is available
                  </Form.Label>
                </div>
                <Form.Text>
                  Unavailable products are not shown to customers.
                </Form.Text>
              </Form.Group>
              
              <div className="flex justify-end space-x-3 mt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setQuickEditProduct(null)}
                  disabled={saving}
                >
                  Cancel
                </Button>
                
                <Button
                  type="submit"
                  variant="primary"
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </Form>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Need to make more changes? <Link to={`/seller/stands/${quickEditProduct.stand_id}/products/${quickEditProduct.id}`} className="text-lemonade-blue hover:underline">Go to full edit page</Link>
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SellerDashboardPage;