import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Product } from '../types/product';

const initialState = {
    list: [] as Product[],
    selectedProduct: null as Product | null,
};

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await axios.get('https://fakestoreapi.com/products');
        return response.data;
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct(state, action: PayloadAction<Product>) {
            state.list.push(action.payload);
            const localProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');
            localProducts.push(action.payload);
            localStorage.setItem('customProducts', JSON.stringify(localProducts));
        },
        deleteProduct(state, action: PayloadAction<number>) {
            state.list = state.list.filter(p => p.id !== action.payload);

            const localProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');
            const updatedLocalProducts = localProducts.filter((p: Product) => p.id !== action.payload);
            localStorage.setItem('customProducts', JSON.stringify(updatedLocalProducts));
        },
        updateProduct(state, action: PayloadAction<Product>) {
            const index = state.list.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.list[index] = action.payload;
            }
        },
        selectProduct(state, action: PayloadAction<Product>) {
            state.selectedProduct = action.payload;
        },
        clearSelectedProduct(state) {
            state.selectedProduct = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            const customProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');
            state.list = [...action.payload, ...customProducts];
        });
    }
});

export const {
    addProduct,
    deleteProduct,
    updateProduct,
    selectProduct,
    clearSelectedProduct
} = productSlice.actions;

export default productSlice.reducer;