import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider'; // Import the useAuth hook
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State for error messages
    const navigate = useNavigate();
    const { login } = useAuth(); // Use the Auth context

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error state on submit
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                username,
                password,
            });

            // If login is successful, store the username in auth context
            if (response.data.username) {
                login(response.data.username);
                navigate('/'); // Redirect to the home page
            }
        } catch (error) {
            setError('Login failed. Please check your credentials.'); // Set error message
            console.error(error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            {error && <div className="alert alert-danger">{error}</div>} {/* Show error message */}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <p className="mt-3">
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;