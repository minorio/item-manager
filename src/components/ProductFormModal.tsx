import React, {useEffect} from 'react';
import ProductForm from './ProductForm';
import type {Product} from "../types/product.ts";

interface Props {
    onClose: () => void;
    editingProduct?: Product | null;
}


const ProductFormModal: React.FC<Props> = ({onClose, editingProduct}) => {
    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose();
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={handleOverlayClick}
        >
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
                <ProductForm onClose={onClose} editingProduct={editingProduct}/>
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

export default ProductFormModal;
