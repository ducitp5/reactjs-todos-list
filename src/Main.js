import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TodoList from './TodoList';
import Login from './components/Login';
import UserList from "./components/UserList";
import About from "./components/About";
import './i18n';
import translations from "./locales/translations";
import CounterWithProvider from "./features/counter/Counter";


const Main = () => {
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

    const { t: i18nT, i18n } = useTranslation(); // `t` from react-i18next
    const [useStatic, setUseStatic] = useState(false); // Toggle between i18next and static translations

    const togglei18nextLanguage = () => {
        setUseStatic(false); // Enable static translations
        const newLang = i18n.language === 'en' ? 'vi' : 'en';
        i18n.changeLanguage(newLang);
    };

    const [language, setLanguage] = useState('en'); // Default language

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
                        <li><Link to="/counter">Counter</Link></li>
                    </ul>
                </nav>

                {/* Buttons to toggle language */}
                <button onClick={togglei18nextLanguage} className="btn btn-primary">
                    {t('switchLanguage')} - i18next
                </button>

                <button onClick={toggleStaticLanguage} className="btn btn-secondary">
                    {t('switchLanguage')} - Static
                </button>

                <Routes>
                    <Route path="/" element={<UserList />} />
                    <Route path="/about" element={<About />} />

                    <Route path="/counter" element={<CounterWithProvider />} />
                </Routes>

                {isAuthenticated ? (
                    <div>
                        <button onClick={handleLogout} className="btn btn-danger">
                            {t('logout')}
                        </button>
                        <TodoList />
                    </div>
                ) : (
                    <Login onLogin={handleLogin} />
                )}
            </div>
        </BrowserRouter>
    );
};

export default Main;
