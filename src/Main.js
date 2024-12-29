// src/Main.js
import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TodoList from './TodoList';
import Login from './components/Login';
import LanguageToggle from './components/LanguageToggle';
import NavigationRoutes from './components/NavigationRoutes';
import './i18n';
import translations from './locales/translations';

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
                <LanguageToggle
                    t={t}
                    togglei18nextLanguage={togglei18nextLanguage}
                    toggleStaticLanguage={toggleStaticLanguage}
                />

                <NavigationRoutes t={t} />

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
