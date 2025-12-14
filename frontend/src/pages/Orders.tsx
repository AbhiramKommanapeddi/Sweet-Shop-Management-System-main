import { useEffect, useState } from 'react';
import api from '../api/client';
import { Package, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Order {
    id: number;
    sweetName: string;
    price: number;
    quantity: number;
    totalPrice: number;
    createdAt: string;
}

const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await api.get('/sweets/my-orders');
            setOrders(res.data);
        } catch (error) {
            console.error('Failed to fetch orders', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center p-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
                <Package className="w-8 h-8 text-pink-600" />
                <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
            </div>

            {orders.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-lg mb-4">You haven't placed any orders yet.</p>
                    <Link to="/" className="text-pink-600 font-medium hover:underline flex items-center justify-center gap-2">
                        Start Shopping <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                    {(order as any).sweet?.imageUrl ? (
                                        <img src={(order as any).sweet.imageUrl} alt={order.sweetName} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-xl">🍬</div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{order.sweetName}</h3>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {new Date(order.createdAt).toLocaleTimeString()}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-8">
                                    <div className="text-right">
                                        <div className="text-sm text-gray-500">Quantity</div>
                                        <div className="font-medium text-gray-900">{order.quantity}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-500">Total</div>
                                        <div className="text-xl font-bold text-pink-600">${order.totalPrice.toFixed(2)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
