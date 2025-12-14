import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

const Unauthorized = () => {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
            <ShieldAlert className="w-16 h-16 text-red-500 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Access Denied</h1>
            <p className="text-gray-500 mb-8 max-w-md">
                You don't have permission to access this page. This area is restricted to administrators only.
            </p>
            <Link
                to="/"
                className="bg-pink-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-pink-700 transition-colors"
            >
                Return to Dashboard
            </Link>
        </div>
    );
};

export default Unauthorized;
