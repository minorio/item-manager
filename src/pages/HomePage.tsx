import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import {clearSelectedProduct, fetchProducts, selectProduct } from '../store/productStore';
import type { RootState } from '../store';
import { useAppDispatch } from '../store/hooks';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import ProductFormModal from "../components/ProductFormModal.tsx";
import ProductSearch from "../components/ProductSearch.tsx";
import NotFoundModal from "../components/NotFoundModal.tsx";
import type {Product} from "../types/product.ts";

const HomePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const products = useSelector((state: RootState) => state.products.list);
    const selectedProduct = useSelector((state: RootState) => state.products.selectedProduct);
    const [formOpen, setFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [notFound, setNotFound] = useState(false);
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleSearch = (id: number) => {
        const found = products.find((p) => p.id === id);
        if (found) {
            dispatch(selectProduct(found));
            setNotFound(false);
        } else {
            setNotFound(true);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Список товаров</h1>
                <div className= "flex flex-col md:flex-row gap-4 mb-6">
                    <ProductSearch onSearch={handleSearch}/>
                    {notFound && <NotFoundModal onClose={() => setNotFound(false)}/>}
                    <button
                        onClick={() => setFormOpen(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition cursor-pointer"
                    >
                        Добавить товар
                    </button>
                </div>
                <div className="grid gap-6  sm:grid-cols-2 lg:grid-cols-3 mt-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} onEdit={(p) => {
                            setEditingProduct(p);
                            setFormOpen(true);
                        }}/>
                    ))}
                </div>

                {selectedProduct && (
                    <ProductModal
                        product={selectedProduct}
                        onClose={() => dispatch(clearSelectedProduct())}
                    />
                )}
                {formOpen && (
                    <ProductFormModal
                        onClose={() => {
                            setFormOpen(false);
                            setEditingProduct(null);
                            dispatch(clearSelectedProduct());
                        }}
                        editingProduct={editingProduct}
                    />
                )}
            </div>
        </div>
    );
};

export default HomePage;
