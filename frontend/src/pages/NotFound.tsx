import { Link } from 'react-router-dom';
import { Ghost } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
            <Ghost className="w-20 h-20 text-gray-300 mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-md">
                Oops! The sweet page you're looking for has been eaten or doesn't exist.
            </p>
            <Link
                to="/"
                className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;
