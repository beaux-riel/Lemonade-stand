# Testing Documentation

This document provides an overview of the testing approach for the Lemonade Stand application.

## Testing Strategy

The Lemonade Stand application uses a comprehensive testing approach that includes:

1. **Unit Tests**: Testing individual components in isolation
2. **Integration Tests**: Testing how components work together
3. **Cross-browser Testing**: Ensuring data persistence across different browser sessions

## Test Setup

### Testing Libraries

- **Jest**: Test runner and assertion library
- **React Testing Library**: For testing React components
- **MSW (Mock Service Worker)**: For mocking API requests
- **jest-mock-extended**: For creating detailed mocks

### Test Utilities

- **test-utils.js**: Custom render function that provides context providers
- **Mock Data**: Predefined mock data for tests
- **API Mocks**: Mock implementations of Supabase API functions

## Unit Tests

Unit tests focus on testing individual components in isolation. Each component has its own test file that verifies:

- Rendering correctly in different states
- Handling user interactions
- Displaying appropriate error messages
- Calling the correct API functions

### Component Tests

- **AuthForm.test.js**: Tests login and registration functionality
- **ProtectedRoute.test.js**: Tests route protection based on authentication status
- **StandExpirationInfo.test.js**: Tests stand expiration display and extension
- **MapView.test.js**: Tests map rendering and marker display
- **SellerRegistrationForm.test.js**: Tests stand registration form validation and submission

## Integration Tests

Integration tests verify that different parts of the application work together correctly. These tests focus on:

- User flows across multiple screens
- Data persistence between components
- State management across the application

### Flow Tests

- **AuthFlow.test.js**: Tests the complete authentication flow
- **StandManagement.test.js**: Tests creating, updating, and deleting stands
- **DataPersistence.test.js**: Tests data persistence across browser sessions

## Cross-browser Testing

Cross-browser tests ensure that the application works consistently across different browsers. These tests focus on:

- Session persistence
- Data consistency
- UI rendering

### Persistence Tests

- **DataPersistence.test.js**: Simulates closing and reopening the browser
- Tests that authentication state is preserved
- Tests that data changes are visible across different sessions

## Running Tests

To run all tests:

```bash
npm test
```

To run a specific test file:

```bash
npm test -- AuthForm.test.js
```

To run tests with coverage:

```bash
npm test -- --coverage
```

## Mocking Strategy

### API Mocks

The Supabase API functions are mocked to avoid making real API calls during tests. The mocks are defined in:

- **__mocks__/supabaseClient.js**: Mocks the Supabase client
- **api/__mocks__/supabaseApi.js**: Mocks the API functions

### Context Mocks

React contexts are mocked to provide controlled test environments:

- **AuthContext**: Mocked with different authentication states
- **StandContext**: Mocked with predefined stand data
- **GeolocationContext**: Mocked with fixed location data
- **NearbyStandsContext**: Mocked with nearby stand data

## Test Coverage

The tests aim to cover:

- All components and their various states
- All user interactions
- All API calls and error handling
- All routes and navigation flows

## Best Practices

1. **Isolation**: Each test should be independent and not rely on the state from other tests
2. **Readability**: Tests should be easy to understand and maintain
3. **Reliability**: Tests should not be flaky or dependent on external services
4. **Coverage**: Tests should cover all critical paths and edge cases
5. **Speed**: Tests should run quickly to provide fast feedback

## Future Improvements

- End-to-end tests with Cypress
- Visual regression tests
- Performance tests
- Accessibility tests