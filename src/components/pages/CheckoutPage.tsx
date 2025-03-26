import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/CheckoutPage.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Product {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
}

const CheckoutPage: React.FC = () => {
    const location = useLocation();
    const { selectedProducts }: { selectedProducts: Product[] } = location.state || {};
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [addressError, setAddressError] = useState('');
    const navigate = useNavigate();

    const totalAmount = selectedProducts ? selectedProducts.reduce((sum: number, item: Product) => sum + item.price * item.quantity, 0) : 0;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setPhoneError('');
        setAddressError('');

        const phoneRegex = /^(\+7|8)\d{10}$/;
        if (!phoneRegex.test(phone)) {
            setPhoneError('Неверный формат номера телефона. Должен начинаться с "+7" или "8" и содержать 10 цифр.');
            return;
        }

        if (address.length < 5) {
            setAddressError('Адрес слишком короткий. Необходимо минимум 5 символов.');
            return;
        }

        const order = {
            name,
            address,
            phone,
            products: selectedProducts,
            totalAmount,
        };

        let orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));

        localStorage.removeItem('cart');

        toast.success('Заказ успешно оформлен!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        navigate('/');
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Оформление заказа</h2>
            {selectedProducts && selectedProducts.length > 0 ? (
                <div className="products-list d-flex flex-column">
                    {selectedProducts.map((product: Product) => (
                        <div key={product.id} className="product-card col-12">
                            <div className="card-body text-center">
                                <h5 className="card-title">{product.title}</h5>
                                <img src={product.image} alt={product.title} className="card-img-top mt-3" />
                                <p className="card-text">Цена: ${product.price}</p>
                                <p className="card-text">Количество: {product.quantity}</p>
                            </div>
                        </div>
                    ))}
                    <h3 className="text-right">Общая сумма: ${totalAmount}</h3>
                </div>
            ) : (
                <p className="text-danger">Ошибка: продукты не найдены.</p>
            )}
            <form onSubmit={handleSubmit} className="checkout-form">
                <div className="form-group">
                    <label htmlFor="name">Имя</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Адрес</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                    {addressError && <p className="text-danger">{addressError}</p>}
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="phone">Телефон</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    {phoneError && <p className="text-danger">{phoneError}</p>}
                </div>
                <button type="submit" className="btn btn-primary">Подтвердить заказ</button>
            </form>
        </div>
    );
};

export default CheckoutPage;

