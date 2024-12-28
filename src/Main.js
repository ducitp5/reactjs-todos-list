import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import App from './App';
import Login from './components/Login';
import UserList from "./components/UserList";
import About from "./components/About";
import './i18n';

const Main = () => {
    const { t, i18n } = useTranslation();
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('isAuthenticated') === 'true'
    );

    const handleLogin = () => {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
    };

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'vi' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <BrowserRouter>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">{t('home')}</Link></li>
                        <li><Link to="/about">{t('about')}</Link></li>
                    </ul>
                </nav>

                <button onClick={toggleLanguage} className="btn btn-primary">
                    {t('switchLanguage')}
                </button>

                <Routes>
                    <Route path="/" element={<UserList />} />
                    <Route path="/about" element={<About />} />
                </Routes>

                {isAuthenticated ? (
                    <div>
                        <button onClick={handleLogout} className="btn btn-danger">
                            {t('logout')}
                        </button>
                        <App />
                    </div>
                ) : (
                    <Login onLogin={handleLogin} />
                )}
            </div>
        </BrowserRouter>
    );
};

export default Main;
