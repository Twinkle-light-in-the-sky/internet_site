import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Profile.css'

const Profile = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [orders, setOrders] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('user')) || { name: '', email: '', phone: '' };
        setUser(savedUser);

        const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
        setOrders(savedOrders);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('user', JSON.stringify(user));
        setIsEditing(false);
        toast.success('Информация обновлена!');
    };

    const handleCancelOrder = (index) => {
        const updatedOrders = orders.filter((_, orderIndex) => orderIndex !== index);
        setOrders(updatedOrders);
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        toast.info('Заказ отменен!');
    };

    return (
        <div className="container mt-5">
            <ToastContainer position="top-center" autoClose={3000} />
            <h1 style={{ color: '#9400D3' }}>Профиль пользователя</h1>
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Имя</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Телефон</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={user.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Сохранить изменения</button>
                    <button type="button" className="btn btn-secondary ms-2" onClick={() => setIsEditing(false)}>Отмена</button>
                </form>
            ) : (
                <div>
                    <p><strong>Имя:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Телефон:</strong> {user.phone}</p>
                    <button className="btn btn-warning" onClick={() => setIsEditing(true)}>Редактировать</button>
                </div>
            )}

            <h2 className="mt-4" style={{ color: '#9400D3' }}>Мои заказы</h2>
            {orders.length > 0 ? (
                orders.map((order, index) => (
                    <div key={index} className="card mb-3" style={{ borderColor: '#9400D3', borderWidth: '2px' }}>
                        <div className="card-body">
                            <h5 className="card-title">Заказ #{index + 1}</h5>
                            <p><strong>Имя:</strong> {order.name}</p>
                            <p><strong>Адрес:</strong> {order.address}</p>
                            <p><strong>Телефон:</strong> {order.phone}</p>
                            <p><strong>Общая сумма:</strong> ${order.totalAmount}</p>
                            <h6>Продукты:</h6>
                            <ul>
                                {order.products.map((product, productIndex) => (
                                    <li key={productIndex}>
                                        {product.title} - Количество: {product.quantity} - Цена: ${product.price}
                                    </li>
                                ))}
                            </ul>
                            <button className="btn btn-danger" onClick={() => handleCancelOrder(index)}>Отменить заказ</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>У вас еще нет заказов.</p>
            )}
        </div>
    );
};

export default Profile;
