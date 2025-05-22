import React, { useState } from 'react';

interface ProductSearchProps {
    onSearch: (id: number) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ onSearch  }) => {
    const [searchId, setSearchId] = useState('');

    const handleSearchClick = () => {
        const id = parseInt(searchId);
        if (!isNaN(id)) {
            onSearch(id);
        }
    };

    return (
        <div className="w-full">
        <div className="relative ">
            <input type="search"
                   className="block w-full p-4 text-sm text-gray-700 rounded-lg shadow hover:shadow-md bg-white focus:outline-none"
                   placeholder="Введите ID товара" required
                   value={searchId}
                   onChange={(e) => setSearchId(e.target.value)}
            />
            <button onClick={handleSearchClick}
                    className="text-dark absolute end-2.5 bottom-2.5 px-2 py-1.5 cursor-pointer">
                <svg className="w-6 h-6 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                          d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                </svg>
            </button>
        </div>
        </div>

);
};

export default ProductSearch;
