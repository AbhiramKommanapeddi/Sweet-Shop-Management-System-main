import { useState, useEffect } from 'react';
import api from '../../api/client';
import { Package, RefreshCw, AlertTriangle } from 'lucide-react';

interface Sweet {
    id: number;
    name: string;
    quantity: number;
    category: string;
}

const Inventory = () => {
    const [sweets, setSweets] = useState<Sweet[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSweets();
    }, []);

    const fetchSweets = async () => {
        try {
            const res = await api.get('/sweets');
            setSweets(res.data);
        } catch (error) {
            console.error('Failed to fetch inventory');
        } finally {
            setLoading(false);
        }
    };

    const handleRestock = async (id: number, currentQty: number) => {
        const newQty = prompt('Enter new total quantity:', currentQty.toString());
        if (newQty === null) return;

        try {
            await api.put(`/sweets/${id}`, { quantity: parseInt(newQty) });
            fetchSweets(); // Refresh
        } catch (error) {
            alert('Failed to update stock');
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this sweet?')) return;

        try {
            await api.delete(`/sweets/${id}`);
            setSweets(sweets.filter(s => s.id !== id));
        } catch (error) {
            alert('Failed to delete sweet');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
                    <p className="text-gray-500">Track and restock sweet supplies</p>
                </div>
                <button onClick={fetchSweets} className="p-2 text-gray-500 hover:text-pink-600 transition-colors">
                    <RefreshCw className="w-5 h-5" />
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-900">Product Name</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-900">Category</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-900">Stock Status</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {sweets.map((sweet) => (
                            <tr key={sweet.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">{sweet.name}</td>
                                <td className="px-6 py-4 text-gray-500">{sweet.category}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${sweet.quantity > 10 ? 'bg-green-500' : sweet.quantity > 0 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                                        <span className={`text-sm font-medium ${sweet.quantity === 0 ? 'text-red-600' : 'text-gray-700'}`}>
                                            {sweet.quantity} units
                                        </span>
                                        {sweet.quantity < 10 && (
                                            <AlertTriangle className="w-4 h-4 text-yellow-500" />
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-3">
                                        <button
                                            onClick={() => handleRestock(sweet.id, sweet.quantity)}
                                            className="text-pink-600 hover:text-pink-700 font-medium text-sm"
                                        >
                                            Restock
                                        </button>
                                        <button
                                            onClick={() => handleDelete(sweet.id)}
                                            className="text-red-600 hover:text-red-700 font-medium text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Inventory;
