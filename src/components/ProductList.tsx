import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productStore';
import type {RootState} from '../store';

const ProductList = () => {
    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.products.list);

    useEffect(() => {
        dispatch(fetchProducts() as any);
    }, [dispatch]);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Список товаров</h1>
            <ul className="space-y-2">
                {products.map((product) => (
                    <li key={product.id} className="border p-2">
                        <strong>{product.title}</strong> — {product.price}$
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;