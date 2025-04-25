import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Form, Alert, Loader } from '../ui';
import ProductCard from './ProductCard';
import StandCard from './StandCard';
import { filterStandsByDistance } from '../../utils/distance';

/**
 * StandListSidebar component for displaying and filtering lemonade stands
 */
const StandListSidebar = ({
  stands = [],
  loading = false,
  selectedStand = null,
  onStandSelect,
  onStandClose,
  userLocation = null,
  className = '',
  ...props
}) => {
  const [filteredStands, setFilteredStands] = useState(stands);
  const [maxDistance, setMaxDistance] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productError, setProductError] = useState(null);

  // Update filtered stands when stands, maxDistance, or searchTerm changes
  useEffect(() => {
    let result = [...stands];

    // Filter by distance if maxDistance is set and user location is available
    if (maxDistance !== null && userLocation) {
      result = filterStandsByDistance(result, maxDistance);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        stand =>
          stand.name.toLowerCase().includes(term) ||
          (stand.description && stand.description.toLowerCase().includes(term)) ||
          (stand.address && stand.address.toLowerCase().includes(term))
      );
    }

    setFilteredStands(result);
  }, [stands, maxDistance, searchTerm, userLocation]);

  // Simulate fetching products when a stand is selected
  useEffect(() => {
    if (selectedStand) {
      setLoadingProducts(true);
      setProductError(null);
      
      // Simulate API call delay
      const timer = setTimeout(() => {
        // In a real app, this would be an API call to fetch products
        // For now, we'll use sample data
        const sampleProducts = [
          {
            id: `${selectedStand.id}-1`,
            name: 'Classic Lemonade',
            description: 'Our signature lemonade made with fresh lemons and organic sugar.',
            price: 2.99,
            image_url: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            is_available: true
          },
          {
            id: `${selectedStand.id}-2`,
            name: 'Strawberry Lemonade',
            description: 'Classic lemonade infused with fresh strawberries.',
            price: 3.49,
            image_url: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            is_available: true
          },
          {
            id: `${selectedStand.id}-3`,
            name: 'Blueberry Mint Lemonade',
            description: 'A refreshing blend of lemonade with blueberries and fresh mint.',
            price: 3.99,
            image_url: 'https://images.unsplash.com/photo-1556881286-fc6915169721?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            is_available: false
          }
        ];
        
        setProducts(sampleProducts);
        setLoadingProducts(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else {
      setProducts([]);
    }
  }, [selectedStand]);

  // Handle distance filter change
  const handleDistanceChange = (e) => {
    const value = e.target.value;
    setMaxDistance(value === '' ? null : parseFloat(value));
  };

  // Handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Reset filters
  const handleResetFilters = () => {
    setMaxDistance(null);
    setSearchTerm('');
  };

  // Toggle filters visibility
  const toggleFilters = () => {
    setShowFilters(prev => !prev);
  };

  return (
    <div className={`flex flex-col h-full ${className}`} {...props}>
      {selectedStand ? (
        <div className="flex flex-col h-full">
          <StandCard
            stand={selectedStand}
            onClose={onStandClose}
            className="mb-4"
          />
          
          <Card className="flex-grow overflow-auto">
            <Card.Header>
              <h3 className="text-xl font-display text-lemonade-blue-dark">Products</h3>
            </Card.Header>
            
            <Card.Body>
              {loadingProducts ? (
                <div className="flex justify-center py-8">
                  <Loader variant="yellow" />
                </div>
              ) : productError ? (
                <Alert variant="error">
                  {productError}
                </Alert>
              ) : products.length > 0 ? (
                <div className="space-y-4">
                  {products.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center py-4 text-gray-500">
                  No products available for this stand.
                </p>
              )}
            </Card.Body>
          </Card>
        </div>
      ) : (
        <Card className="h-full flex flex-col">
          <Card.Header>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-display text-lemonade-blue-dark">Lemonade Stands</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleFilters}
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </div>
          </Card.Header>
          
          {showFilters && (
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <Form.Group>
                <Form.Label htmlFor="search">Search</Form.Label>
                <Form.Input
                  id="search"
                  placeholder="Search by name or address"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </Form.Group>
              
              <Form.Group>
                <Form.Label htmlFor="distance">Maximum Distance ({userLocation ? 'miles' : 'unavailable'})</Form.Label>
                <Form.Select
                  id="distance"
                  value={maxDistance || ''}
                  onChange={handleDistanceChange}
                  disabled={!userLocation}
                  options={[
                    { value: '', label: 'Any distance' },
                    { value: '1', label: '1 mile' },
                    { value: '5', label: '5 miles' },
                    { value: '10', label: '10 miles' },
                    { value: '25', label: '25 miles' },
                    { value: '50', label: '50 miles' }
                  ]}
                />
                {!userLocation && (
                  <p className="text-xs text-gray-500 mt-1">
                    Enable location services to filter by distance
                  </p>
                )}
              </Form.Group>
              
              <div className="flex justify-end mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleResetFilters}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          )}
          
          <Card.Body className="flex-grow overflow-auto">
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader variant="yellow" />
              </div>
            ) : filteredStands.length > 0 ? (
              <div className="space-y-4">
                {filteredStands.map(stand => (
                  <div 
                    key={stand.id} 
                    className="p-3 bg-lemonade-yellow-light rounded-lg cursor-pointer hover:bg-lemonade-yellow-dark transition-colors"
                    onClick={() => onStandSelect(stand)}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-display text-lg">{stand.name}</h3>
                      {stand.distance !== null && stand.distance !== undefined && (
                        <span className="text-xs bg-white px-2 py-1 rounded-full">
                          {stand.distance.toFixed(1)} miles
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-2">{stand.description}</p>
                    <p className="text-xs text-gray-600 mt-1">{stand.address}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No lemonade stands found.</p>
                {(maxDistance !== null || searchTerm) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleResetFilters}
                    className="mt-2"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            )}
          </Card.Body>
          
          <Card.Footer>
            <p className="text-sm text-gray-600">
              {filteredStands.length} {filteredStands.length === 1 ? 'stand' : 'stands'} found
              {maxDistance !== null && userLocation && ` within ${maxDistance} miles`}
            </p>
          </Card.Footer>
        </Card>
      )}
    </div>
  );
};

StandListSidebar.propTypes = {
  stands: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      address: PropTypes.string,
      location_lat: PropTypes.number,
      location_lng: PropTypes.number,
      image_url: PropTypes.string,
      distance: PropTypes.number
    })
  ),
  loading: PropTypes.bool,
  selectedStand: PropTypes.object,
  onStandSelect: PropTypes.func.isRequired,
  onStandClose: PropTypes.func.isRequired,
  userLocation: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }),
  className: PropTypes.string
};

export default StandListSidebar;