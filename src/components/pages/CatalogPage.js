import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard';
import '../../styles/CatalogPage.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CatalogPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

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
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            let updatedCart;
            if (existingItem) {
                updatedCart = prevCart.map((item) =>
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

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

    const filteredProducts = products.filter((product) => {
        const matchesSearchTerm = product.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const price = parseFloat(product.price);
        const minP = parseFloat(minPrice) || 0;
        const maxP = parseFloat(maxPrice) || Infinity;
        const matchesPrice = price >= minP && price <= maxP;
        return matchesSearchTerm && matchesCategory && matchesPrice;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);
        return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


    return (
        <main className='d-flex w-100 position-relative align-items-center justify-content-center flex-column'>
            <ToastContainer position="top-center" autoClose={3000} />
            <div className='w-75 text-center mt-3 align-items-center justify-content-center'>
                <h1 className='catalog-title'>Каталог</h1>
                <div className="filters d-flex justify-content-between">
                    <input
                        className='search-input'
                        type="text"
                        placeholder="Поиск товара..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="all">Все категории</option>
                        <option value="electronics">Электроника</option>
                        <option value="jewelery">Ювелирные изделия</option>
                        <option value="men's clothing">Мужская одежда</option>
                        <option value="women's clothing">Женская одежда</option>
                    </select>
                    <div className="price-filter">
                        <label className='price-label me-1' htmlFor="minPrice">Мин. цена</label>
                        <input
                        className='search-price me-1'
                            type="number"
                            id="minPrice"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <label className='price-label me-1' htmlFor="maxPrice">Макс. цена:</label>
                        <input
                        className='search-price me-1'
                            type="number"
                            id="maxPrice"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>
                    <select value={sortOrder} onChange={handleSortChange}>
                        <option value="asc">Сортировать по цене (по возрастанию)</option>
                        <option value="desc">Сортировать по цене (по убыванию)</option>
                    </select>
                </div>
            </div>
            <div className="product-grid w-75 d-flex flex-wrap align-items-center justify-content-start">
                {sortedProducts.map((product) => (
                    <div className='col-12 col-sm-6 col-md-4 col-lg-3' key={product.id}>
                        <ProductCard product={product} onAddToCart={handleAddToCart} />
                    </div>
                ))}
            </div>
        </main>
    );
};

export default CatalogPage;
