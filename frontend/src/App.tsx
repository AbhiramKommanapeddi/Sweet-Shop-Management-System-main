import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Checkout from './pages/Checkout';
import Navbar from './components/Navbar';

import AdminRoute from './components/AdminRoute';
import AddSweet from './pages/admin/AddSweet';
import EditSweet from './pages/admin/EditSweet';
import Inventory from './pages/admin/Inventory';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* Protected Routes */}
              <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />

              {/* Admin Routes */}
              <Route element={<AdminRoute />}>
                <Route path="/admin/sweets/add" element={<AddSweet />} />
                <Route path="/admin/sweets/edit/:id" element={<EditSweet />} />
                <Route path="/admin/inventory" element={<Inventory />} />
              </Route>

              <Route path="/checkout/:id" element={<PrivateRoute element={<Checkout />} />} />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
