import React, { useState } from 'react';
import App from './App';
import Login from './components/Login';

const Main = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('isAuthenticated') === 'true' // Retrieve login state
    );

    const handleLogin = () => {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true'); // Persist login state
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated'); // Clear login state
    };

    return (
        <>
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
        </>
    );
};

export default Main;
