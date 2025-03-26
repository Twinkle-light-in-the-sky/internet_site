import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard';
import Modal from 'react-modal';
import '../../styles/HomePage.css';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../../contextAPI/contextAPI';
import { ToastContainer, toast } from 'react-toastify';

const HomePage = () => {
    const { user } = useUser();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [unauthorizedProduct, setUnauthorizedProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    const handleAddToCart = (product) => {
        
        const isAuthenticated = user && user.email;

        if (!isAuthenticated) {
            setUnauthorizedProduct(product);
            setIsModalOpen(true);
            return;
        }

        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id === product.id);
            let updatedCart;
            if (existingItem) {
                updatedCart = prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                updatedCart = [...prevCart, { ...product, quantity: 1 }];
            }
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
        toast.success(`${product.title} добавлен в корзину!`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleRegisterRedirect = () => {
        window.location.href = '/registration';
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    
    const lastAddedProducts = products.slice(-8);

    return (
        <main className='HomeWrapper d-flex w-100 position-relative align-items-center justify-content-center flex-column'>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className='mt-3 d-flex w-100 text-center'>
                <h1 className='homepage-title w-100'>Главная</h1>
            </div>
            <div className='w-75 d-flex flex-column text-center'>
                <h2 className='homepage-subtitle mt-2 mb-2'>Недавно добавленные товары</h2>
                <div className='w-100 d-flex flex-wrap justify-content-between'>
                    {lastAddedProducts.length > 0 ? (
                        lastAddedProducts.map(product => (
                            <div className='col-12 col-sm-6 col-md-4 col-lg-3' key={product.id}>
                                <ProductCard product={product} onAddToCart={handleAddToCart} />
                            </div>
                        ))
                    ) : (
                        <div>Нет товаров для отображения.</div>
                    )}
                </div>
            </div>

            
            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Authorization Required"
                ariaHideApp={false}
            >
                <div className='modal-block d-flex flex-column justify-content-between'>
                    <div className='d-flex flex-column justify-content-between'>
                        <h2>Требуется авторизация</h2>
                        <p>Для добавления товара в корзину, пожалуйста, зарегистрируйтесь или войдите в свою учетную запись.</p>
                    </div>
                    <div className="modal-buttons">
                        <button className='modal-btn p-2 mt-2' onClick={handleRegisterRedirect}>Перейти на страницу регистрации</button>
                        <button className='modal-btn p-2 mt-2' onClick={handleCloseModal}>Закрыть</button>
                    </div>
                </div>
            </Modal>
        </main>
    );
};

export default HomePage;
