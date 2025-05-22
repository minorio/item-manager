import React, {useEffect} from 'react';
import type {Product} from '../types/product';

type Props = {
    product: Product;
    onClose: () => void;
};

const ProductModal: React.FC<Props> = ({ product, onClose}) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full relative"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-semibold mb-4">{product.title}</h2>
                <img src={product.image} alt={product.title} className="w-32 h-32 object-contain mx-auto mb-4"/>
                <p className="text-sm text-gray-600">Category: {product.category}</p>
                <p className="text-gray-700 text-sm mb-2">{product.description}</p>
                <p className="font-bold text-lg mb-2">${product.price}</p>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 cursor-pointer"
                >
                    <svg className="w-6 h-6 text-gray-400 hover:text-red-700" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M6 18 17.94 6M18 18 6.06 6"/>
                    </svg>

                </button>
            </div>
        </div>
    );
};

export default ProductModal;