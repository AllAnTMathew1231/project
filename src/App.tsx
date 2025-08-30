import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LoginForm from './components/LoginForm';
import CustomerDashboard from './pages/CustomerDashboard';
import SupplierDashboard from './pages/SupplierDashboard';
import OrderForm from './components/OrderForm';
import OrderHistory from './components/OrderHistory';
import StockManagement from './components/StockManagement';
import Reports from './components/Reports';
import { AuthProvider, useAuth } from './utils/auth';
import { ThemeProvider } from './utils/theme';






function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (!allowedRoles.includes(user?.role || '')) {
    return <Navigate to="/unauthorized" />;
  }
  
  return <>{children}</>;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route 
                path="/customer" 
                element={
                  <ProtectedRoute allowedRoles={['customer']}>
                    <CustomerDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/customer/new-order" 
                element={
                  <ProtectedRoute allowedRoles={['customer']}>
                    <OrderForm />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/customer/orders" 
                element={
                  <ProtectedRoute allowedRoles={['customer']}>
                    <OrderHistory />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/supplier" 
                element={
                  <ProtectedRoute allowedRoles={['supplier']}>
                    <SupplierDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/supplier/stock" 
                element={
                  <ProtectedRoute allowedRoles={['supplier']}>
                    <StockManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/supplier/reports" 
                element={
                  <ProtectedRoute allowedRoles={['supplier']}>
                    <Reports />
                  </ProtectedRoute>
                } 
              />
              <Route path="/" element={<Navigate to="/login" />} />
              <Route 
                path="/unauthorized" 
                element={
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-2xl font-bold text-red-600">Unauthorized Access</h1>
                      <p className="text-gray-600">You don't have permission to access this page.</p>
                    </div>
                  </div>
                } 
              />
            </Routes>
            <Toaster position="top-right" />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;