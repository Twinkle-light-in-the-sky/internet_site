import React, { useState } from 'react';
import { useUser  } from '../contextAPI/contextAPI';
import '../styles/Header.css';
import userdefaulticon from '../media/icons/userdefaulticon.png';

export default function Header() {
    const { user, isLoggedIn, logout } = useUser ();
    const [showDropdown, setShowDropdown] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleProfileClick = () => {
        setShowDropdown(!showDropdown);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className='header flex-row position-relative w-100 pe-5 ps-5 pt-3 pb-3 justify-content-between'>
            <div className='logo d-flex'>
                <span className='text-logo'>Мой магазин</span>
            </div>
            <div className='menu-mobile align-items-center'>
                <button className="navbar-toggler" onClick={toggleMenu}>
                    ☰
                </button>
            </div>
            <nav className={`navbar navbar-expand-lg navbar-light ${menuOpen ? 'show' : ''}`}>
                <ul className={`navbar-nav me-auto mb-2 mb-lg-0 ${menuOpen ? 'show' : ''}`}>
                    <li className="nav-item me-2">
                        <a className="nav-link" aria-current="page" href="/">Главная</a>
                    </li>
                    <li className="nav-item me-2">
                        <a className="nav-link" href="/catalog">Каталог</a>
                    </li>
                    <li className="nav-item me-2">
                        <a className="nav-link" href="/cart">Корзина</a>
                    </li>
                    
                    {isLoggedIn ? (
                        <>
                            <li className="mobile-nav-item nav-item me-2">
                                <a className="nav-link" href="/profile">Профиль</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={handleProfileClick}>
                                    {user.name}
                                </a>
                                <ul className={`dropdown-menu ${showDropdown ? 'show' : ''}`} aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="/profile">Профиль</a></li>
                                    <li><a className="dropdown-item" href="/cart">Корзина</a></li>
                                    <li><a className="dropdown-item" href="/" onClick={logout}>Выйти</a></li>
                                </ul>
                            </li>
                        </>
                    ) : (
                        <>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle d-flex" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={handleProfileClick}>
                                <img className='icon me-2' src={userdefaulticon} alt="User  Icon"/>
                                <span className='log-text'>Авторизация</span>
                            </a>
                            <ul className={`dropdown-menu ${showDropdown ? 'show' : ''}`} aria-labelledby="navbarDropdown">
                                <li>
                                    <a className="dropdown-item p-2" href="/authorization">Войти</a>
                                </li>
                                <li>
                                    <a className="dropdown-item p-2" href="/registration">Регистрация</a>
                                </li>
                            </ul>
                        </li>
                    </>
                    )}
                </ul>
            </nav>
        </header>
    );
}
