import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/client';
import { ShoppingCart, Check, ArrowLeft } from 'lucide-react';

const Checkout = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [sweet, setSweet] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchSweet();
    }, [id]);

    const fetchSweet = async () => {
        try {
            const res = await api.get(`/sweets/${id}`);
            setSweet(res.data);
        } catch (err) {
            setError('Failed to load sweet details');
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmPurchase = async () => {
        setProcessing(true);
        setError('');
        try {
            await api.post(`/sweets/${id}/purchase`);
            setSuccess(true);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (err: any) {
            setError('Purchase failed. Out of stock or system error.');
            setProcessing(false);
        }
    };

    if (loading) return <div className="flex justify-center p-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div></div>;
    if (!sweet) return <div className="text-center p-20 text-red-500">Item not found</div>;

    if (success) {
        return (
            <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow-lg border border-green-100 text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Purchase Successful!</h2>
                <p className="text-gray-500 mb-6">Enjoy your {sweet.name}!</p>
                <div className="text-sm text-gray-400">Redirecting to home...</div>
            </div>
        );
    }

    return (
        <div className="max-w-lg mx-auto">
            <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Shop
            </button>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="h-48 bg-pink-50 flex items-center justify-center text-6xl">
                    🍬
                </div>

                <div className="p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{sweet.name}</h1>
                    <p className="text-pink-600 font-medium bg-pink-50 inline-block px-3 py-1 rounded-full text-sm mb-6">
                        {sweet.category}
                    </p>

                    <div className="border-t border-b border-gray-100 py-6 mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-600">Price</span>
                            <span className="text-xl font-bold text-gray-900">${sweet.price.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Stock</span>
                            <span className={`${sweet.quantity > 0 ? 'text-green-600' : 'text-red-500'} font-medium`}>
                                {sweet.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm flex items-center gap-2">
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    <button
                        onClick={handleConfirmPurchase}
                        disabled={processing || sweet.quantity === 0}
                        className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                    >
                        {processing ? 'Processing...' : (
                            <>
                                <ShoppingCart className="w-5 h-5" />
                                Confirm Purchase
                            </>
                        )}
                    </button>
                    <p className="textAlign: center; color: #6b7280; font-size: 0.875rem; margin-top: 1rem;">
                        Secure checkout powered by SweetShop
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
