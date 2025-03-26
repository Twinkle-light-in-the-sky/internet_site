import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import '../styles/ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
    const containerVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
        exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
    };

    const imageVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5, delay: 0.2 } },
    };

    const contentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } },
    };


    return (
        <AnimatePresence>
            <motion.div
                className="product-card"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <motion.img
                    src={product.image}
                    alt={product.title}
                    variants={imageVariants}
                />
                <motion.div className="product-card-content" variants={contentVariants}>
                    <motion.h3 className='product-title'>{product.title}</motion.h3>
                    <div className="product-info">
                        <p>Цена: ${product.price}</p>
                        <motion.p className="product-description">{product.description}</motion.p>
                    </div>
                </motion.div>
                <div className="buttons">
                    <motion.button
                        whileHover={{ backgroundColor: "#c0504d", transition: { duration: 0.2 } }}
                        onClick={() => onAddToCart(product)}
                    >
                        Добавить в корзину
                    </motion.button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ProductCard;
