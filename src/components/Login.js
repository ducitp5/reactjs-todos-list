import React, { useState } from 'react';
import axios from 'axios'; // Install axios for HTTP requests

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert(1111);
        let response;
        try {
            // Send login request to backend
            response = await axios.post(
                'http://localhost:5000/api/login',
                {
                    username,
                    password,
                }
            );

            // alert(response.data.message); // Show success message
            console.log(223344, response);
            alert(2222);

            onLogin(response.data.user); // Pass the logged-in user info
        } catch (error) {
            alert(9999)
            console.log(1234, response, error);

            alert(4444);
            // alert(error.response?.data?.error || 'Login failed!');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password 33</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
