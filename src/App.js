// src/Main.js
import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TodoList from './components/TodoList';
import Login from './components/Login';
import LanguageToggle from './components/LanguageToggle';
import NavigationRoutes from './components/NavigationRoutes';
import './i18n';
import translations from './locales/translations';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('isAuthenticated') === 'true'
    );
    const [theme, setTheme] = useState('light'); // Default theme is light

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
        setUseStatic(false);
        const newLang = i18n.language === 'en' ? 'vi' : 'en';
        i18n.changeLanguage(newLang);
    };

    const [language, setLanguage] = useState('en');

    const toggleStaticLanguage = () => {
        setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'vi' : 'en'));
        setUseStatic(true);
    };

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const t = (key) => {
        if (useStatic) {
            return translations[language][key] || key;
        }
        return i18nT(key);
    };

    return (
        <BrowserRouter>
            <div className={`app-container ${theme}`}>
                <LanguageToggle
                    t={t}
                    togglei18nextLanguage={togglei18nextLanguage}
                    toggleStaticLanguage={toggleStaticLanguage}
                />

                <button onClick={toggleTheme} className="btn btn-info">
                    Toggle Theme - {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </button>

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

export default App;
