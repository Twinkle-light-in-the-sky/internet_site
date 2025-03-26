import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import ModalProduct from './ModalProduct';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Cart.css';
import { useUser  } from '../contextAPI/contextAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
    const { user } = useUser ();
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalAmount(total);
    }, [cartItems]);

    const handleRemove = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        toast.success('Товар удален из корзины!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const handleUpdateQuantity = (id, newQuantity) => {
        const updatedCart = cartItems.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        toast.success('Количество товаров обновлено!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        const updatedProduct = updatedCart.find(item => item.id === id);
        setSelectedProduct(updatedProduct);
    };

    const openModal = (item) => {
        setSelectedProduct(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

   
    if (!user) {
        return <Navigate to="/login" />;
    }

    const handleCheckout = () => {
        if (cartItems.length > 0) {
            navigate('/checkoutpage', { state: { selectedProducts: cartItems } });
        } else {
            alert("Корзина пуста!");
        }
    };
    

    return (
        <div className="container mt-5">
            <ToastContainer position="top-center" autoClose={3000} />
            <h2 className="text-center">Корзина</h2>
            {cartItems.length === 0 ? (
                <p className="text-center">Корзина пуста</p>
            ) : (
                <div>
                    <ul className="list-group cart-list">
                        {cartItems.map(item => (
                            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center cart-item">
                                <div className="d-flex align-items-center">
                                    <img src={item.image} alt={item.title} className="cart-image" />
                                    <div>
                                        <h5>{item.title}</h5>
                                        <p>Цена: ${item.price} x {item.quantity}</p>
                                    </div>
                                </div>
                                <div className='d-flex'>
                                    <button className="btn btn-success me-2" onClick={() => openModal(item)}>Изменить количество</button>
                                    <button className="btn btn-danger" onClick={() => handleRemove(item.id)}>Удалить</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h3 className="text-right mt-3">Общая сумма: ${totalAmount}</h3>
                    <button onClick={handleCheckout} className="btn btn-primary mt-3">Оформить заказ</button>
                </div>
            )}
            <ModalProduct
                isOpen={isModalOpen}
                onClose={closeModal}
                product={selectedProduct}
                onUpdateQuantity={handleUpdateQuantity}
            />
        </div>
    );
};

export default Cart;
