import { useEffect, useState } from 'react';
import api from '../api/client';
import SweetCard from '../components/SweetCard';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

interface Sweet {
    id: number;
    name: string;
    category: string;
    price: number;
    quantity: number;
}

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [sweets, setSweets] = useState<Sweet[]>([]);
    const [filteredSweets, setFilteredSweets] = useState<Sweet[]>([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [priceRange, setPriceRange] = useState<'All' | 'Under 5' | '5 - 10' | 'Over 10'>('All');

    useEffect(() => {
        fetchSweets();
    }, []);

    useEffect(() => {
        filterSweets();
    }, [searchTerm, selectedCategory, priceRange, sweets]);

    const fetchSweets = async () => {
        try {
            const res = await api.get('/sweets');
            setSweets(res.data);
        } catch (error) {
            console.error('Failed to fetch sweets', error);
            // Fallback
            setSweets([]);
        } finally {
            setLoading(false);
        }
    };

    const filterSweets = () => {
        let result = sweets;

        // Search
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(s =>
                s.name.toLowerCase().includes(term) ||
                s.category.toLowerCase().includes(term)
            );
        }

        // Category
        if (selectedCategory !== 'All') {
            result = result.filter(s => s.category === selectedCategory);
        }

        // Price
        if (priceRange !== 'All') {
            if (priceRange === 'Under 5') result = result.filter(s => s.price < 5);
            else if (priceRange === '5 - 10') result = result.filter(s => s.price >= 5 && s.price <= 10);
            else if (priceRange === 'Over 10') result = result.filter(s => s.price > 10);
        }

        setFilteredSweets(result);
    };



    const categories = ['All', ...Array.from(new Set(sweets.map(s => s.category)))];

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 pb-8">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                        Sweet <span className="text-pink-600">Inventory</span>
                    </h1>
                    <p className="text-gray-500 mt-2 text-lg">Manage and purchase delicious treats.</p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                    />
                </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-4 py-2">
                <div className="flex items-center gap-2 text-gray-700 font-medium">
                    <Filter className="w-5 h-5" />
                    <span>Filters:</span>
                </div>

                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none cursor-pointer hover:border-pink-300 transition-colors"
                >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>

                <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value as any)}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none cursor-pointer hover:border-pink-300 transition-colors"
                >
                    <option value="All">All Prices</option>
                    <option value="Under 5">Under $5</option>
                    <option value="5 - 10">$5 - $10</option>
                    <option value="Over 10">Over $10</option>
                </select>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
                </div>
            ) : (
                <>
                    {filteredSweets.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredSweets.map(sweet => (
                                <div key={sweet.id} className="relative group">
                                    <SweetCard sweet={sweet} onPurchase={(id) => navigate(`/checkout/${id}`)} />
                                    {user?.isAdmin && (
                                        <Link
                                            to={`/admin/sweets/edit/${sweet.id}`}
                                            className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:text-pink-600"
                                        >
                                            <SlidersHorizontal className="w-4 h-4" />
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                            <p className="text-gray-500 text-lg">No sweets found matching your criteria.</p>
                            <button
                                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setPriceRange('All'); }}
                                className="mt-4 text-pink-600 font-medium hover:underline"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Dashboard;
