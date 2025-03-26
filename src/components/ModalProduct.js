import React from 'react';
import '../styles/ModalProduct.css';

const ModalProduct = ({ isOpen, onClose, product, onUpdateQuantity }) => {
    if (!isOpen || !product) return null;

    const handleIncrease = () => {
        onUpdateQuantity(product.id, product.quantity + 1);
    };

    const handleDecrease = () => {
        if (product.quantity > 1) {
            onUpdateQuantity(product.id, product.quantity - 1);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content d-flex justify-content-center">
                <h2>{product.title}</h2>
                <img src={product.image} alt={product.title} />
                <p>Цена: ${product.price}</p>
                <div className="buttons w-100 align-items-center justify-content-center">
                    <button onClick={handleDecrease} disabled={product.quantity <= 1}>-</button>
                    <span className='count me-3 ms-3'>{product.quantity}</span>
                    <button onClick={handleIncrease}>+</button>
                </div>
                <button className='modal-btn' onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
};

export default ModalProduct;

