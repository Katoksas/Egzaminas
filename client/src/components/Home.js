import React from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { user, logout } = useAuth(); // Get the user from the Auth context
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Clear user on logout
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="container mt-5">
            <h1>Welcome, {user ? user : 'Guest'}!</h1>
            <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Home;