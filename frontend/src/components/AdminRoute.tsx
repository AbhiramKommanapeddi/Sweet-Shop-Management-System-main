import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = () => {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) return <Navigate to="/login" />;

    // Assuming user object has isAdmin property
    if (!user?.isAdmin) return <Navigate to="/unauthorized" />;

    return <Outlet />;
};

export default AdminRoute;
