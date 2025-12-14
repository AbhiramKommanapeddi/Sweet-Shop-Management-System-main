import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Candy, LogOut, User } from 'lucide-react';

const Navbar = () => {
    const { isAuthenticated, logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-sm border-b border-gray-100">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 text-xl font-bold text-pink-600">
                    <Candy className="w-6 h-6" />
                    <span>SweetShop</span>
                </Link>
                <div className="flex items-center gap-6">
                    {isAuthenticated ? (
                        <>

                            {user?.isAdmin && (
                                <>
                                    <Link
                                        to="/admin/sweets/add"
                                        className="text-sm font-medium text-gray-600 hover:text-pink-600 transition-colors"
                                    >
                                        Add Sweet
                                    </Link>
                                    <Link
                                        to="/admin/inventory"
                                        className="text-sm font-medium text-gray-600 hover:text-pink-600 transition-colors"
                                    >
                                        Inventory
                                    </Link>
                                </>
                            )}
                            <div className="flex items-center gap-2 text-gray-600">
                                <User className="w-4 h-4" />
                                <span className="text-sm font-medium">{user?.email}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors"
                            >
                                <LogOut className="w-5 h-5" />
                                <span className="text-sm">Logout</span>
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-pink-600 transition-colors">
                                Login
                            </Link>
                            <Link to="/register" className="px-4 py-2 bg-pink-600 text-white rounded-lg text-sm font-medium hover:bg-pink-700 transition-colors">
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
