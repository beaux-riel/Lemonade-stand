import React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { AuthProvider } from '../contexts/AuthContext';
import { StandProvider } from '../contexts/StandContext';
import { GeolocationProvider } from '../contexts/GeolocationContext';
import { NearbyStandsProvider } from '../contexts/NearbyStandsContext';
import { ProtectedRoute } from '../components/auth';
import { MainLayout } from '../components/layout';

// Mock App component for testing
function App() {
  return (
    <AuthProvider>
      <StandProvider>
        <GeolocationProvider>
          <NearbyStandsProvider>
            <MainLayout>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<div>Home Page</div>} />
                <Route path="/login" element={<div>Login Page</div>} />
                <Route path="/register" element={<div>Register Page</div>} />
                
                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/seller/dashboard" element={<div>Seller Dashboard</div>} />
                  <Route path="/seller/stands/new" element={<div>New Stand</div>} />
                  <Route path="/seller/stands/:id" element={<div>Stand Detail</div>} />
                  <Route path="/seller/stands/:standId/products/new" element={<div>New Product</div>} />
                  <Route path="/seller/stands/:standId/products/:productId" element={<div>Product Detail</div>} />
                </Route>
                
                {/* 404 route */}
                <Route path="/404" element={<div>Not Found</div>} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </MainLayout>
          </NearbyStandsProvider>
        </GeolocationProvider>
      </StandProvider>
    </AuthProvider>
  );
}

export default App;