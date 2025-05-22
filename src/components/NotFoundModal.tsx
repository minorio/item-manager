import React, { useEffect } from 'react';

interface NotFoundModalProps {
    onClose: () => void;
}

const NotFoundModal: React.FC<NotFoundModalProps> = ({ onClose }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm text-center">
                <h2 className="text-xl font-semibold text-red-600 mb-4">Товар не найден</h2>
                <button
                    onClick={onClose}
                    className="cursor-pointer"
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

export default NotFoundModal;
