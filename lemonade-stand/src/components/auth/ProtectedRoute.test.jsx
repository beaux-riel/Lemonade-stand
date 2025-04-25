import React from 'react';
import { render, screen } from '../../test-utils';
import { MemoryRouter, Routes, Route } from 'react-router';
import ProtectedRoute from './ProtectedRoute';
import { mockAuthContextValues } from '../../test-utils';

describe('ProtectedRoute', () => {
  test('renders loading state when auth is loading', () => {
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/protected" element={<div>Protected Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
      { authContextValue: mockAuthContextValues.loading }
    );
    
    // Should show loading spinner
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    
    // Protected content should not be rendered
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  test('redirects to login when user is not authenticated', () => {
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/protected" element={<div>Protected Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
      { authContextValue: mockAuthContextValues.unauthenticated }
    );
    
    // Should redirect to login page
    expect(screen.getByText('Login Page')).toBeInTheDocument();
    
    // Protected content should not be rendered
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  test('renders protected content when user is authenticated', () => {
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/protected" element={<div>Protected Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
      { authContextValue: mockAuthContextValues.authenticated }
    );
    
    // Should render protected content
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
    
    // Login page should not be rendered
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });

  test('redirects to custom path when specified', () => {
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/custom-login" element={<div>Custom Login Page</div>} />
          <Route element={<ProtectedRoute redirectPath="/custom-login" />}>
            <Route path="/protected" element={<div>Protected Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
      { authContextValue: mockAuthContextValues.unauthenticated }
    );
    
    // Should redirect to custom login page
    expect(screen.getByText('Custom Login Page')).toBeInTheDocument();
    
    // Protected content should not be rendered
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });
});