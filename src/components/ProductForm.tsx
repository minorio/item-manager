import React, { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { addProduct, updateProduct } from '../store/productStore';
import type {Product} from '../types/product';
import type {RootState} from "../store";
import {useSelector} from "react-redux";

interface Props {
    onClose: () => void;
    editingProduct?: Product | null;
}

const ProductForm: React.FC<Props> = ({ onClose, editingProduct }) => {
    const dispatch = useAppDispatch();
    const products = useSelector((state: RootState) => state.products.list);
    const [title, setTitle] = useState(editingProduct?.title || '');
    const [price, setPrice] = useState(editingProduct?.price.toString() || '');
    const [description, setDescription] = useState(editingProduct?.description || '');
    const [category, setCategory] = useState(editingProduct?.category || '');
    const [image, setImage] = useState(editingProduct?.image || '');


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const maxId = products.length > 0 ? Math.max(...products.map(p => p.id)) : 0;
        const productData: Product = {
            id: editingProduct ? editingProduct.id : (maxId + 1),
            title,
            price: parseFloat(price),
            description,
            category,
            image,
        };

        if (editingProduct) {
            dispatch(updateProduct(productData));
        } else {
            dispatch(addProduct(productData));
        }

        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-dark-500">
            <h2 className="text-xl font-bold mb-4">
                {editingProduct ? 'Редактировать товар' : 'Добавить новый товар'}
            </h2>

            <input
                className="mb-3 focus:outline-none border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="text"
                placeholder="Название"
                minLength={10}
                maxLength={40}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                className="mb-3 focus:outline-none border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="number"
                placeholder="Цена"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />
            <textarea
                className="max-h-40 min-h-20 mb-3 focus:outline-none border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Описание"
                maxLength={250}
                minLength={20}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />

            <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="mb-3 focus:outline-none border border-gray-500 text-gray-900 text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">

                <option>men's clothing</option>
                <option>jewelery</option>
                <option>electronics</option>
                <option>women's clothing</option>
            </select>
            <input
                className="focus:outline-none mb-4 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="text"
                placeholder="Ссылка на изображение"
                minLength={10}
                maxLength={500}
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
            />


            <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
            >
                {editingProduct ? 'Сохранить' : 'Добавить'}
            </button>
        </form>
    );
};

export default ProductForm;