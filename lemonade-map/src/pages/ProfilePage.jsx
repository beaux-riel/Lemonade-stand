import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router';
import { 
  Card, 
  Form, 
  Button, 
  Alert, 
  Avatar, 
  Tabs, 
  Toggle,
  Loader
} from '../components/ui';
import { 
  getUserProfile, 
  updateUserProfile, 
  updateUserAddress,
  uploadUserAvatar,
  updateUserPreferences
} from '../api/supabaseApi';
import { useAuth } from '../contexts/AuthContext';
import { validateProfileForm, validateAddressForm } from '../utils/validation';

// US States for dropdown
const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
  { value: 'DC', label: 'District of Columbia' },
];

// Countries for dropdown
const COUNTRIES = [
  { value: 'United States', label: 'United States' },
  { value: 'Canada', label: 'Canada' },
  { value: 'Mexico', label: 'Mexico' },
  { value: 'United Kingdom', label: 'United Kingdom' },
  { value: 'Australia', label: 'Australia' },
  { value: 'Other', label: 'Other' }
];

// Canadian provinces
const CANADA_PROVINCES = [
  { value: 'AB', label: 'Alberta' },
  { value: 'BC', label: 'British Columbia' },
  { value: 'MB', label: 'Manitoba' },
  { value: 'NB', label: 'New Brunswick' },
  { value: 'NL', label: 'Newfoundland and Labrador' },
  { value: 'NS', label: 'Nova Scotia' },
  { value: 'NT', label: 'Northwest Territories' },
  { value: 'NU', label: 'Nunavut' },
  { value: 'ON', label: 'Ontario' },
  { value: 'PE', label: 'Prince Edward Island' },
  { value: 'QC', label: 'Quebec' },
  { value: 'SK', label: 'Saskatchewan' },
  { value: 'YT', label: 'Yukon' },
];

// Australian states and territories
const AUSTRALIAN_STATES = [
  { value: 'ACT', label: 'Australian Capital Territory' },
  { value: 'NSW', label: 'New South Wales' },
  { value: 'NT', label: 'Northern Territory' },
  { value: 'QLD', label: 'Queensland' },
  { value: 'SA', label: 'South Australia' },
  { value: 'TAS', label: 'Tasmania' },
  { value: 'VIC', label: 'Victoria' },
  { value: 'WA', label: 'Western Australia' },
];

/**
 * User Profile Page
 */
const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('personal');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [addressError, setAddressError] = useState(null);
  const [addressSuccess, setAddressSuccess] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  
  // Form data
  const [profileData, setProfileData] = useState({
    full_name: '',
    email: '',
    phone: '',
    bio: ''
  });
  
  const [addressData, setAddressData] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Canada',
    apt_suite: '',
    address_line2: '',
    useForSearch: false
  });

  // Determine state/province options based on selected country
  const getStateOptions = (country) => {
    switch (country) {
      case 'United States':
        return US_STATES;
      case 'Canada':
        return CANADA_PROVINCES;
      case 'Australia':
        return AUSTRALIAN_STATES;
      default:
        return [];
    }
  };
  const stateOptions = getStateOptions(addressData.country);
  
  // Form validation errors
  const [profileErrors, setProfileErrors] = useState({});
  const [addressErrors, setAddressErrors] = useState({});
  
  // Load user profile data
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/profile' } });
      return;
    }
    
    const loadUserProfile = async () => {
      try {
        setLoading(true);
        const { data, error } = await getUserProfile(user.id);
        
        if (error) {
          throw new Error(error.message);
        }
        
        if (data) {
          // Set profile data
          setProfileData({
            full_name: data.full_name || '',
            email: user.email || '',
            phone: data.phone || '',
            bio: data.bio || ''
          });
          
          // Set address data
          setAddressData({
            street: data.street || '',
            city: data.city || '',
            state: data.state || '',
            postalCode: data.postal_code || '',
            country: data.country || 'Canada',
            apt_suite: data.apt_suite || '',
            address_line2: data.address_line2 || '',
            useForSearch: data.preferences?.defaultSearchLocation?.useForSearch || false
          });
          
          // Set avatar preview if exists
          if (data.avatar_url) {
            setAvatarPreview(data.avatar_url);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadUserProfile();
  }, [isAuthenticated, navigate, user]);
  
  // Handle profile form changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field if it exists
    if (profileErrors[name]) {
      setProfileErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  // Handle address form changes
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field if it exists
    if (addressErrors[name]) {
      setAddressErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  // Handle toggle for using address as search location
  const handleToggleUseForSearch = (value) => {
    setAddressData(prev => ({
      ...prev,
      useForSearch: value
    }));
  };
  
  // Handle avatar upload
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type and size
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
      return;
    }
    
    if (file.size > maxSize) {
      setError('Image file is too large. Maximum size is 5MB.');
      return;
    }
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
    
    // Store file for upload
    setAvatarFile(file);
    setError(null);
  };
  
  // Handle profile form submission
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateProfileForm(profileData);
    setProfileErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      return;
    }
    
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);
      
      // Update profile
      const { error: profileError } = await updateUserProfile(user.id, {
        full_name: profileData.full_name,
        phone: profileData.phone,
        bio: profileData.bio
      });
      
      if (profileError) {
        throw new Error(profileError.message);
      }
      
      // Upload avatar if changed
      if (avatarFile) {
        const { error: avatarError } = await uploadUserAvatar(user.id, avatarFile);
        
        if (avatarError) {
          throw new Error(avatarError.message);
        }
      }
      
      setSuccess('Profile updated successfully!');
      
      // Clear avatar file after successful upload
      setAvatarFile(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };
  
  // Handle address form submission
  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateAddressForm(addressData);
    setAddressErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      return;
    }
    
    try {
      setSaving(true);
      setAddressError(null);
      setAddressSuccess(null);
      
      // Update address and preferences
      const { data, error: addressError } = await updateUserAddress(user.id, addressData);
      
      if (addressError) {
        throw new Error(addressError.message);
      }
      
      // Update preferences with useForSearch value is now handled in updateUserAddress
      // No need for a separate call to updateUserPreferences
      
      setAddressSuccess('Address updated successfully!');
      
      // Scroll to the success message
      setTimeout(() => {
        const successAlert = document.querySelector('.address-success-alert');
        if (successAlert) {
          successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    } catch (err) {
      setAddressError(err.message);
      
      // Scroll to the error message
      setTimeout(() => {
        const errorAlert = document.querySelector('.address-error-alert');
        if (errorAlert) {
          errorAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    } finally {
      setSaving(false);
    }
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader size="lg" variant="yellow" message="Loading your profile..." />
      </div>
    );
  }
  
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-lemonade-yellow-light to-white">
      <Helmet>
        <title>My Profile | Lemonade Map</title>
        <meta name="description" content="Update your Lemonade Map profile and preferences" />
      </Helmet>
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display text-lemonade-blue-dark mb-4">My Lemonade Profile</h1>
          <div className="w-24 h-2 bg-lemonade-yellow mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Customize your profile and preferences to get the most out of your Lemonade Map experience!
          </p>
        </div>
        
        {/* Profile Card with Tabs */}
        <Card className="shadow-playful-lg overflow-hidden">
          <div className="bg-lemonade-blue-light p-6 flex flex-col items-center">
            <div className="relative group">
              <Avatar 
                src={avatarPreview} 
                alt={profileData.full_name || 'User'} 
                size="xl"
                className="border-4 border-white shadow-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <label htmlFor="avatar-upload" className="text-white text-sm font-medium cursor-pointer">
                  Change
                </label>
                <input 
                  id="avatar-upload" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleAvatarChange}
                />
              </div>
            </div>
            <h2 className="mt-4 text-2xl font-display text-lemonade-blue-dark">
              {profileData.full_name || 'Your Profile'}
            </h2>
            <p className="text-lemonade-blue-dark opacity-75">{profileData.email}</p>
          </div>
          
          <Card.Body className="px-6 pt-4">
            {error && (
              <Alert 
                type="error" 
                message={error} 
                className="mb-6"
                onClose={() => setError(null)}
              />
            )}
            
            {success && (
              <Alert 
                type="success" 
                message={success} 
                className="mb-6"
                onClose={() => setSuccess(null)}
              />
            )}
            
            <Tabs
              defaultTab={activeTab === 'address' ? 1 : 0}
              onChange={(index) => {
                setActiveTab(index === 0 ? 'personal' : 'address');
                // Clear error/success messages when switching tabs
                setError(null);
                setSuccess(null);
                setAddressError(null);
                setAddressSuccess(null);
              }}
              className="mb-6"
            >
              <Tabs.Item>Personal Info</Tabs.Item>
              <Tabs.Item>Address</Tabs.Item>
              
              <Tabs.Panel>
                <Form onSubmit={handleProfileSubmit}>
                  <div className="space-y-6">
                    <Form.Group>
                      <Form.Label htmlFor="full_name" required>Full Name</Form.Label>
                      <Form.Input
                        id="full_name"
                        name="full_name"
                        value={profileData.full_name}
                        onChange={handleProfileChange}
                        placeholder="Your full name"
                        error={profileErrors.full_name}
                      />
                    </Form.Group>
                    
                    <Form.Group>
                      <Form.Label htmlFor="email">Email Address</Form.Label>
                      <Form.Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileData.email}
                        disabled
                        className="bg-gray-100"
                      />
                      <Form.Text>Email cannot be changed. Contact support if needed.</Form.Text>
                    </Form.Group>
                    
                    <Form.Group>
                      <Form.Label htmlFor="phone">Phone Number</Form.Label>
                      <Form.Input
                        id="phone"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        placeholder="Your phone number (optional)"
                        error={profileErrors.phone}
                      />
                    </Form.Group>
                    
                    <Form.Group>
                      <Form.Label htmlFor="bio">Bio</Form.Label>
                      <Form.Textarea
                        id="bio"
                        name="bio"
                        value={profileData.bio}
                        onChange={handleProfileChange}
                        placeholder="Tell us a bit about yourself..."
                        rows={4}
                        error={profileErrors.bio}
                      />
                    </Form.Group>
                    
                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={saving}
                      >
                        {saving ? (
                          <>
                            <Loader size="sm" variant="white" className="mr-2" />
                            Saving...
                          </>
                        ) : (
                          'Save Profile'
                        )}
                      </Button>
                    </div>
                  </div>
                </Form>
              </Tabs.Panel>
              
              <Tabs.Panel>
                {addressError && (
                  <Alert 
                    type="error" 
                    message={addressError} 
                    className="mb-6 address-error-alert"
                    onClose={() => setAddressError(null)}
                  />
                )}
                
                {addressSuccess && (
                  <Alert 
                    type="success" 
                    message={addressSuccess} 
                    className="mb-6 address-success-alert"
                    onClose={() => setAddressSuccess(null)}
                  />
                )}
                
                <Form onSubmit={handleAddressSubmit}>
                  <div className="space-y-6">
                    <Form.Group>
                      <Form.Label htmlFor="street">Street Address</Form.Label>
                      <Form.Input
                        id="street"
                        name="street"
                        value={addressData.street}
                        onChange={handleAddressChange}
                        placeholder="123 Main St"
                        error={addressErrors.street}
                      />
                    </Form.Group>
                    
                    <Form.Group>
                      <Form.Label htmlFor="apt_suite">Apartment/Suite</Form.Label>
                      <Form.Input
                        id="apt_suite"
                        name="apt_suite"
                        value={addressData.apt_suite}
                        onChange={handleAddressChange}
                        placeholder="Apt 4B"
                        error={addressErrors.apt_suite}
                    />
                  </Form.Group>
                  
                  <Form.Group>
                    <Form.Label htmlFor="address_line2">Address Line 2</Form.Label>
                    <Form.Input
                      id="address_line2"
                      name="address_line2"
                      value={addressData.address_line2}
                      onChange={handleAddressChange}
                      placeholder="Building name, Floor, etc."
                      error={addressErrors.address_line2}
                    />
                  </Form.Group>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Group>
                      <Form.Label htmlFor="city">City</Form.Label>
                      <Form.Input
                        id="city"
                        name="city"
                        value={addressData.city}
                        onChange={handleAddressChange}
                        placeholder="Your city"
                        error={addressErrors.city}
                      />
                    </Form.Group>
                    
                    <Form.Group>
                      <Form.Label htmlFor="state">State/Province</Form.Label>
                      <Form.Select
                        id="state"
                        name="state"
                        value={addressData.state}
                        onChange={handleAddressChange}
                        options={stateOptions}
                        placeholder="Select state/province"
                        error={addressErrors.state}
                      />
                    </Form.Group>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Group>
                      <Form.Label htmlFor="postalCode">ZIP/Postal Code</Form.Label>
                      <Form.Input
                        id="postalCode"
                        name="postalCode"
                        value={addressData.postalCode}
                        onChange={handleAddressChange}
                        placeholder="12345"
                        error={addressErrors.postalCode}
                      />
                    </Form.Group>
                    
                    <Form.Group>
                      <Form.Label htmlFor="country">Country</Form.Label>
                      <Form.Select
                        id="country"
                        name="country"
                        value={addressData.country}
                        onChange={handleAddressChange}
                        options={COUNTRIES}
                        error={addressErrors.country}
                      />
                    </Form.Group>
                  </div>
                  
                  <div className="bg-lemonade-yellow-light p-4 rounded-lg border border-lemonade-yellow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-display text-lemonade-blue-dark text-lg">Use as Default Search Location</h3>
                        <p className="text-sm text-gray-600">
                          When enabled, we'll use this address as your default location when searching for lemonade stands.
                        </p>
                      </div>
                      <Toggle
                        checked={addressData.useForSearch}
                        onChange={handleToggleUseForSearch}
                        label=""
                        srLabel="Use address as default search location"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <Loader size="sm" variant="white" className="mr-2" />
                          Saving...
                        </>
                      ) : (
                        'Save Address'
                      )}
                    </Button>
                  </div>
                </div>
              </Form>
            </Tabs.Panel>
            </Tabs>
          </Card.Body>
        </Card>
        
        {/* Fun decorative elements */}
        <div className="relative mt-12">
          <div className="absolute -top-16 -left-8 w-16 h-16 text-lemonade-yellow opacity-30 transform rotate-12">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z"/>
            </svg>
          </div>
          <div className="absolute -bottom-8 -right-8 w-20 h-20 text-lemonade-pink opacity-20 transform -rotate-12">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;