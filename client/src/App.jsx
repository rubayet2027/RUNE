import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { ErrorBoundary } from './components/ui/ErrorBoundary.jsx';
import { RootLayout } from './components/layout/RootLayout.jsx';
import { ProtectedRoute } from './components/layout/ProtectedRoute.jsx';
import { StateView } from './components/ui/StateView.jsx';

// Route Level Code Splitting (React.lazy)
const DropPage = lazy(() => import('./pages/DropPage.jsx').then((m) => ({ default: m.DropPage })));
const ProductPage = lazy(() => import('./pages/ProductPage.jsx').then((m) => ({ default: m.ProductPage })));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage.jsx').then((m) => ({ default: m.CheckoutPage })));
const OrderSuccessPage = lazy(() => import('./pages/OrderSuccessPage.jsx').then((m) => ({ default: m.OrderSuccessPage })));
const ArchivePage = lazy(() => import('./pages/ArchivePage.jsx').then((m) => ({ default: m.ArchivePage })));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage.jsx').then((m) => ({ default: m.AdminDashboardPage })));
const LoginPage = lazy(() => import('./pages/LoginPage.jsx').then((m) => ({ default: m.LoginPage })));

// Optimized QueryClient caching defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes fresh cache window
      gcTime: 1000 * 60 * 10,    // 10 minutes memory retention
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CartProvider>
            <Router>
              <Suspense fallback={<StateView type="loading" title="LOADING ATELIER INTERFACE..." />}>
                <Routes>
                  <Route element={<RootLayout />}>
                    <Route path="/" element={<DropPage />} />
                    <Route path="/product/:slug" element={<ProductPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/order-success/:orderNumber" element={<OrderSuccessPage />} />
                    <Route path="/archive" element={<ArchivePage />} />
                    <Route path="/admin" element={<ProtectedRoute requireAdmin>{<AdminDashboardPage />}</ProtectedRoute>} />
                    <Route path="/login" element={<LoginPage />} />
                  </Route>
                </Routes>
              </Suspense>
            </Router>
          </CartProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
