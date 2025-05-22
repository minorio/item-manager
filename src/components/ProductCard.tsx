import React from 'react';
import type { Product } from '../types/product';
import { useDispatch } from 'react-redux';
import {deleteProduct, selectProduct} from '../store/productStore';

interface Props {
    product: Product;
    onEdit: (product: Product) => void;
}

const ProductCard: React.FC<Props> = ({ product, onEdit }) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(selectProduct(product));
    };

    const handleDelete = () => {
        dispatch(deleteProduct(product.id));
    };

    const handleEdit = () => {
        onEdit(product);
    };

    return (
        <div className="rounded-lg shadow hover:shadow-md bg-white p-4 transition duration-300" onClick={handleClick}>
            <p className="text-sm text-gray-600 mb-2">ID: {product.id}</p>
            <img src={product.image} alt={product.title} className="w-full h-40 object-contain mb-3"/>
            <h2 className="font-semibold text-lg mb-1">{product.title}</h2>
            <p className="text-sm text-gray-600 mb-2">{product.category}</p>
            <p className="text-600 font-bold text-md">${product.price}</p>
            <div className="flex justify-between mt-2">
                <button onClick={handleEdit} className="cursor-pointer">
                    <svg className="w-6 h-6 text-gray-400 hover:text-blue-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                </svg>
                </button>
                <button onClick={handleDelete} className="cursor-pointer">
                    <svg className="w-6 h-6 text-gray-400 hover:text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                </svg>
                </button>
            </div>
        </div>
    );
};

export default ProductCard;