// src/components/NavigationRoutes.js
import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import UserList from './UserList';
import About from './About';
import CounterWithProvider from '../features/counter/Counter';

const NavigationRoutes = ({ t }) => (
    <div>
        <nav>
            <ul>
                <li><Link to="/">{t('home')}</Link></li>
                <li><Link to="/about">{t('about')}</Link></li>
                <li><Link to="/counter">Counter</Link></li>
            </ul>
        </nav>
        <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/about" element={<About />} />
            <Route path="/counter" element={<CounterWithProvider />} />
        </Routes>
    </div>
);

export default NavigationRoutes;