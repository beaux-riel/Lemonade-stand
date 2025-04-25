# Lemonade Stand Form Components

This directory contains form components for the Lemonade Stand application.

## Components

### SellerRegistrationForm

A form component for registering a new lemonade stand with products.

#### Features

- Seller information input (name, address)
- Geocoding functionality to convert address to coordinates
- Add up to two products with name, description, price, and optional image
- Form validation and error handling
- Image preview for product images
- Responsive design

#### Props

- `onSubmit` - Function called when the form is submitted with valid data
- `loading` - Boolean to indicate if the form is submitting

#### Usage

```jsx
import { SellerRegistrationForm } from './components/forms';

const handleSubmit = (formData) => {
  // Process the form data
  console.log(formData);
};

<SellerRegistrationForm 
  onSubmit={handleSubmit}
  loading={false}
/>
```

### SellerRegistrationPage

A page component that wraps the SellerRegistrationForm and handles form submission, loading states, and success/error messages.

#### Features

- Form submission handling
- Loading state management
- Success and error messages
- Display of submitted data
- Option to register another stand

#### Usage

```jsx
import { SellerRegistrationPage } from './components/forms';

<SellerRegistrationPage />
```

## Form Data Structure

The form collects and submits the following data structure:

```javascript
{
  name: string,            // Stand name
  address: string,         // Stand address
  location_lat: number,    // Latitude from geocoding
  location_lng: number,    // Longitude from geocoding
  products: [              // Array of products (1-2)
    {
      name: string,        // Product name
      description: string, // Product description
      price: number,       // Product price
      image: File|null     // Optional product image file
    }
  ]
}
```

## Validation

The form validates the following:

- Stand name (required, 2-50 characters)
- Address (required, 5-200 characters)
- Location coordinates (required, obtained via geocoding)
- At least one product is required
- Product name (required, 2-50 characters)
- Product description (required, 10-500 characters)
- Product price (required, > 0, < 100)
- Product image (optional, must be JPEG, PNG, or WebP, < 5MB)

## Geocoding

The form uses the OpenStreetMap Nominatim API for geocoding addresses. The geocoding functionality:

1. Takes the address input by the user
2. Sends a request to the Nominatim API
3. Retrieves latitude and longitude coordinates
4. Stores the coordinates in the form data

## Dependencies

- UI components from `../ui`
- Geocoding utilities from `../../utils/geocoding`
- Validation utilities from `../../utils/validation`