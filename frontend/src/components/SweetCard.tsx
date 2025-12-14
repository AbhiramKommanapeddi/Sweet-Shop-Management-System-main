import { ShoppingCart } from 'lucide-react';

interface Sweet {
    id: number;
    name: string;
    category: string;
    price: number;
    quantity: number;
    imageUrl?: string;
}

interface SweetCardProps {
    sweet: Sweet;
    onPurchase: (id: number) => void;
}

const SweetCard: React.FC<SweetCardProps> = ({ sweet, onPurchase }) => {
    const isOutOfStock = sweet.quantity === 0;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                {sweet.imageUrl ? (
                    <img src={sweet.imageUrl} alt={sweet.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                ) : (
                    <span className="text-4xl">🍬</span>
                )}
            </div>
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <span className="text-xs font-semibold text-pink-600 uppercase tracking-wider bg-pink-50 px-2 py-1 rounded-full">
                            {sweet.category}
                        </span>
                        <h3 className="text-lg font-bold text-gray-900 mt-2">{sweet.name}</h3>
                    </div>
                    <span className="text-lg font-bold text-gray-900">${sweet.price.toFixed(2)}</span>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <span className={`text-sm ${isOutOfStock ? 'text-red-500' : 'text-green-600'} font-medium`}>
                        {isOutOfStock ? 'Out of Stock' : `${sweet.quantity} in stock`}
                    </span>

                    <button
                        onClick={() => onPurchase(sweet.id)}
                        disabled={isOutOfStock}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${isOutOfStock
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-black text-white hover:bg-gray-800'
                            }`}
                    >
                        <ShoppingCart className="w-4 h-4" />
                        Purchase
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SweetCard;
