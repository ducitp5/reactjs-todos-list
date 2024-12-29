import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import UserList from "./components/UserList";
import About from "./components/About";

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

    return (
        <BrowserRouter>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<UserList />} />
                    <Route path="/about" element={<About />} />
                </Routes>

                {isAuthenticated ? (
                    <div>
                        <button onClick={handleLogout} className="btn btn-danger">
                            Logout
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
