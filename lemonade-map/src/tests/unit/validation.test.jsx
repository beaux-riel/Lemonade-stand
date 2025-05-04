import { 
  validateProfileForm, 
  validateAddressForm, 
  validateSellerForm, 
  validateProduct,
  hasErrors
} from '../../utils/validation';

describe('validation utility functions', () => {
  describe('validateProfileForm function', () => {
    test('should return errors for empty form data', () => {
      const errors = validateProfileForm({});
      expect(errors.full_name).toBeDefined();
    });

    test('should validate full name length', () => {
      // Too short
      let errors = validateProfileForm({ full_name: 'A' });
      expect(errors.full_name).toBeDefined();
      
      // Valid
      errors = validateProfileForm({ full_name: 'John Doe' });
      expect(errors.full_name).toBeUndefined();
      
      // Too long
      errors = validateProfileForm({ full_name: 'A'.repeat(51) });
      expect(errors.full_name).toBeDefined();
    });

    test('should validate phone number format', () => {
      // Invalid phone
      let errors = validateProfileForm({ full_name: 'John Doe', phone: 'not-a-phone' });
      expect(errors.phone).toBeDefined();
      
      // Valid phone
      errors = validateProfileForm({ full_name: 'John Doe', phone: '123-456-7890' });
      expect(errors.phone).toBeUndefined();
      
      // No phone (optional)
      errors = validateProfileForm({ full_name: 'John Doe' });
      expect(errors.phone).toBeUndefined();
    });

    test('should validate bio length', () => {
      // Valid bio
      let errors = validateProfileForm({ full_name: 'John Doe', bio: 'This is my bio' });
      expect(errors.bio).toBeUndefined();
      
      // Too long bio
      errors = validateProfileForm({ full_name: 'John Doe', bio: 'A'.repeat(501) });
      expect(errors.bio).toBeDefined();
      
      // No bio (optional)
      errors = validateProfileForm({ full_name: 'John Doe' });
      expect(errors.bio).toBeUndefined();
    });
  });

  describe('validateAddressForm function', () => {
    test('should validate optional fields if provided', () => {
      // Empty form (all optional)
      let errors = validateAddressForm({});
      expect(Object.keys(errors).length).toBe(0);
      
      // Invalid street
      errors = validateAddressForm({ street: 'St' });
      expect(errors.street).toBeDefined();
      
      // Valid street
      errors = validateAddressForm({ street: '123 Main St' });
      expect(errors.street).toBeUndefined();
    });

    test('should validate city field', () => {
      // Invalid city
      let errors = validateAddressForm({ city: 'A' });
      expect(errors.city).toBeDefined();
      
      // Valid city
      errors = validateAddressForm({ city: 'New York' });
      expect(errors.city).toBeUndefined();
    });

    test('should validate state field', () => {
      // Invalid state
      let errors = validateAddressForm({ state: 'A' });
      expect(errors.state).toBeDefined();
      
      // Valid state
      errors = validateAddressForm({ state: 'NY' });
      expect(errors.state).toBeUndefined();
    });

    test('should validate US postal code', () => {
      // Invalid US postal code
      let errors = validateAddressForm({ country: 'United States', postalCode: '1234' });
      expect(errors.postalCode).toBeDefined();
      
      // Valid US postal code (5 digits)
      errors = validateAddressForm({ country: 'United States', postalCode: '12345' });
      expect(errors.postalCode).toBeUndefined();
      
      // Valid US postal code (9 digits with hyphen)
      errors = validateAddressForm({ country: 'United States', postalCode: '12345-6789' });
      expect(errors.postalCode).toBeUndefined();
    });

    test('should validate Canadian postal code', () => {
      // Invalid Canadian postal code
      let errors = validateAddressForm({ country: 'Canada', postalCode: '1234' });
      expect(errors.postalCode).toBeDefined();
      
      // Valid Canadian postal code
      errors = validateAddressForm({ country: 'Canada', postalCode: 'A1B 2C3' });
      expect(errors.postalCode).toBeUndefined();
    });

    test('should require all fields when useForSearch is true', () => {
      // Missing required fields
      let errors = validateAddressForm({ useForSearch: true });
      expect(errors.street).toBeDefined();
      expect(errors.city).toBeDefined();
      expect(errors.state).toBeDefined();
      expect(errors.postalCode).toBeDefined();
      
      // All required fields provided
      errors = validateAddressForm({
        useForSearch: true,
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        postalCode: '12345'
      });
      expect(Object.keys(errors).length).toBe(0);
    });
  });

  describe('validateSellerForm function', () => {
    test('should validate seller name', () => {
      // Missing name
      let errors = validateSellerForm({});
      expect(errors.name).toBeDefined();
      
      // Name too short
      errors = validateSellerForm({ name: 'A' });
      expect(errors.name).toBeDefined();
      
      // Name too long
      errors = validateSellerForm({ name: 'A'.repeat(51) });
      expect(errors.name).toBeDefined();
      
      // Valid name
      errors = validateSellerForm({ name: 'Lemonade Stand' });
      expect(errors.name).toBeUndefined();
    });

    test('should validate seller address', () => {
      // Missing address
      let errors = validateSellerForm({ name: 'Lemonade Stand' });
      expect(errors.address).toBeDefined();
      
      // Address too short
      errors = validateSellerForm({ name: 'Lemonade Stand', address: '123' });
      expect(errors.address).toBeDefined();
      
      // Valid address
      errors = validateSellerForm({ name: 'Lemonade Stand', address: '123 Main St' });
      expect(errors.address).toBeUndefined();
    });

    test('should validate location coordinates', () => {
      // Missing coordinates
      let errors = validateSellerForm({ 
        name: 'Lemonade Stand', 
        address: '123 Main St' 
      });
      expect(errors.location).toBeDefined();
      
      // Missing one coordinate
      errors = validateSellerForm({ 
        name: 'Lemonade Stand', 
        address: '123 Main St',
        location_lat: 40.7128
      });
      expect(errors.location).toBeDefined();
      
      // Valid coordinates
      errors = validateSellerForm({ 
        name: 'Lemonade Stand', 
        address: '123 Main St',
        location_lat: 40.7128,
        location_lng: -74.0060
      });
      expect(errors.location).toBeUndefined();
    });

    test('should validate products array', () => {
      // Missing products
      let errors = validateSellerForm({ 
        name: 'Lemonade Stand', 
        address: '123 Main St',
        location_lat: 40.7128,
        location_lng: -74.0060
      });
      expect(errors.products).toBeDefined();
      
      // Empty products array
      errors = validateSellerForm({ 
        name: 'Lemonade Stand', 
        address: '123 Main St',
        location_lat: 40.7128,
        location_lng: -74.0060,
        products: []
      });
      expect(errors.products).toBeDefined();
      
      // Valid products
      errors = validateSellerForm({ 
        name: 'Lemonade Stand', 
        address: '123 Main St',
        location_lat: 40.7128,
        location_lng: -74.0060,
        products: [
          { 
            name: 'Classic Lemonade', 
            description: 'Refreshing classic lemonade made with fresh lemons', 
            price: '2.50' 
          }
        ]
      });
      expect(errors.products).toBeUndefined();
      
      // Invalid products
      errors = validateSellerForm({ 
        name: 'Lemonade Stand', 
        address: '123 Main St',
        location_lat: 40.7128,
        location_lng: -74.0060,
        products: [
          { name: 'L' } // Invalid product
        ]
      });
      expect(errors.products).toBeDefined();
    });
  });

  describe('validateProduct function', () => {
    test('should validate product name', () => {
      // Missing name
      let errors = validateProduct({});
      expect(errors.name).toBeDefined();
      
      // Name too short
      errors = validateProduct({ name: 'A' });
      expect(errors.name).toBeDefined();
      
      // Name too long
      errors = validateProduct({ name: 'A'.repeat(51) });
      expect(errors.name).toBeDefined();
      
      // Valid name
      errors = validateProduct({ name: 'Classic Lemonade' });
      expect(errors.name).toBeUndefined();
    });

    test('should validate product description', () => {
      // Missing description
      let errors = validateProduct({ name: 'Classic Lemonade' });
      expect(errors.description).toBeDefined();
      
      // Description too short
      errors = validateProduct({ name: 'Classic Lemonade', description: 'Short' });
      expect(errors.description).toBeDefined();
      
      // Description too long
      errors = validateProduct({ name: 'Classic Lemonade', description: 'A'.repeat(501) });
      expect(errors.description).toBeDefined();
      
      // Valid description
      errors = validateProduct({ 
        name: 'Classic Lemonade', 
        description: 'Refreshing classic lemonade made with fresh lemons' 
      });
      expect(errors.description).toBeUndefined();
    });

    test('should validate product price', () => {
      // Missing price
      let errors = validateProduct({ 
        name: 'Classic Lemonade', 
        description: 'Refreshing classic lemonade made with fresh lemons' 
      });
      expect(errors.price).toBeDefined();
      
      // Non-numeric price
      errors = validateProduct({ 
        name: 'Classic Lemonade', 
        description: 'Refreshing classic lemonade made with fresh lemons',
        price: 'not-a-number'
      });
      expect(errors.price).toBeDefined();
      
      // Price too low
      errors = validateProduct({ 
        name: 'Classic Lemonade', 
        description: 'Refreshing classic lemonade made with fresh lemons',
        price: '0'
      });
      expect(errors.price).toBeDefined();
      
      // Price too high
      errors = validateProduct({ 
        name: 'Classic Lemonade', 
        description: 'Refreshing classic lemonade made with fresh lemons',
        price: '101'
      });
      expect(errors.price).toBeDefined();
      
      // Valid price
      errors = validateProduct({ 
        name: 'Classic Lemonade', 
        description: 'Refreshing classic lemonade made with fresh lemons',
        price: '2.50'
      });
      expect(errors.price).toBeUndefined();
    });
  });

  describe('hasErrors function', () => {
    test('should return false for null or empty errors', () => {
      expect(hasErrors(null)).toBe(false);
      expect(hasErrors({})).toBe(false);
    });

    test('should return true for top-level errors', () => {
      expect(hasErrors({ name: 'Name is required' })).toBe(true);
    });

    test('should return true for product errors', () => {
      expect(hasErrors({ 
        products: [
          { name: 'Name is required' }
        ] 
      })).toBe(true);
    });

    test('should return false for empty product errors', () => {
      expect(hasErrors({ 
        products: [
          {}
        ] 
      })).toBe(false);
    });
  });
});