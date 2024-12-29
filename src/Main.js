import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import App from './App';
import Login from './components/Login';
import UserList from "./components/UserList";
import About from "./components/About";
import './i18n';
import translations from "./locales/translations";

const Main = () => {
    const { t: i18nT, i18n } = useTranslation(); // `t` from react-i18next
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('isAuthenticated') === 'true'
    );
    const [useStatic, setUseStatic] = useState(false); // Toggle between i18next and static translations
    const [language, setLanguage] = useState('en'); // Default language

    const handleLogin = () => {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
    };

    const toggleLanguage = () => {
        setUseStatic(false); // Enable static translations
        const newLang = i18n.language === 'en' ? 'vi' : 'en';
        i18n.changeLanguage(newLang);
    };

    const toggleStaticLanguage = () => {
        setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'vi' : 'en'));
        setUseStatic(true); // Enable static translations
    };

    // Function to decide which translation source to use
    const t = (key) => {
        if (useStatic) {
            return translations[language][key] || key; // Fallback to key if translation not found
        }
        return i18nT(key); // Use i18next translation
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

                {/* Buttons to toggle language */}
                <button onClick={toggleLanguage} className="btn btn-primary">
                    {t('switchLanguage')} - i18next
                </button>

                <button onClick={toggleStaticLanguage} className="btn btn-secondary">
                    {t('switchLanguage')} - Static
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
