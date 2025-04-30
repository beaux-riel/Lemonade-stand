# Stand Management Dashboard

This document provides an overview of the stand management dashboard implemented in the Lemonade Stand application.

## Overview

The stand management dashboard allows sellers to:

1. View all their lemonade stands
2. Create new stands
3. Edit stand details
4. Manage products
5. View visitor statistics
6. Manually activate/deactivate stands
7. Extend stand expiration time
8. Delete stands

## Components

### Pages

- **SellerDashboardPage**: Main dashboard showing all stands owned by the seller
- **StandDetailPage**: Detailed view and management of a specific stand
- **ProductDetailPage**: Create and edit products for a stand

### UI Components

- **StandExpirationInfo**: Displays stand expiration status and allows extending visibility
- **StandStatistics**: Displays visitor statistics for a stand

## Features

### Stand Management

- **Create Stand**: Sellers can create new lemonade stands with details like name, description, location, etc.
- **Edit Stand**: Update stand information including name, description, address, and coordinates
- **Upload Images**: Add or change stand images
- **Activate/Deactivate**: Manually control stand visibility
- **Delete Stand**: Remove stands that are no longer needed

### Product Management

- **Add Products**: Create products with name, description, price, and image
- **Edit Products**: Update product details
- **Availability Control**: Set products as available or unavailable
- **Delete Products**: Remove products from a stand

### Expiration Management

- **View Status**: See the current expiration status of a stand
- **Extend Time**: Add 24 hours to the stand's visibility
- **Reactivate**: Bring expired stands back to active status

### Statistics

- **Visitor Metrics**: View total views, unique visitors, and average time spent
- **Popular Times**: See when the stand gets the most visitors
- **Daily Views**: Visualize views by day of the week

## Usage

### Accessing the Dashboard

1. Log in to your account
2. Navigate to `/seller/dashboard`

### Managing Stands

1. From the dashboard, click "Add New Stand" to create a stand
2. Click "Manage" on an existing stand to view details
3. Use the tabs to switch between stand details, products, and statistics

### Managing Products

1. From a stand's detail page, click the "Products" tab
2. Click "Add New Product" to create a product
3. Click "Edit" on an existing product to modify it

### Controlling Stand Visibility

1. Use the "Activate/Deactivate Stand" button to manually control visibility
2. Use the expiration info panel to extend the stand's visibility time

## Implementation Details

### Routes

```jsx
<Route element={<ProtectedRoute />}>
  <Route path="/seller/dashboard" element={<SellerDashboardPage />} />
  <Route path="/seller/stands/new" element={<SellerRegistrationPage />} />
  <Route path="/seller/stands/:id" element={<StandDetailPage />} />
  <Route path="/seller/stands/:standId/products/new" element={<ProductDetailPage />} />
  <Route path="/seller/stands/:standId/products/:productId" element={<ProductDetailPage />} />
</Route>
```

### API Functions

The dashboard uses the following API functions:

```javascript
// Stand management
getUserStands(userId)
getStandById(standId)
createStand(standData)
updateStand(standId, updates)
deleteStand(standId)
uploadStandImage(standId, userId, file)
extendStandExpiration(standId, hoursToExtend)

// Product management
getProducts(standId)
createProduct(productData)
updateProduct(productId, updates)
deleteProduct(productId)
uploadProductImage(productId, standId, userId, file)
```

## Security Considerations

- All routes are protected with authentication
- Row Level Security (RLS) ensures users can only access their own stands
- Form validation prevents invalid data submission
- Confirmation modals prevent accidental deletion

## Future Enhancements

- Real-time analytics integration
- Sales tracking and reporting
- Customer reviews and ratings
- Inventory management
- Order processing
- Payment integration