import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import './Auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Mock login logic - route based on email demo keyword for preview purposes
        if (email.includes('hire')) {
            navigate('/hirer/dashboard');
        } else {
            navigate('/seeker/dashboard');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box glass-panel fade-in">
                <div className="auth-header">
                    <LogIn size={32} className="text-primary-light" />
                    <h2 className="auth-title">Welcome Back</h2>
                    <p className="auth-subtitle">Login to access your AI interview dashboard.</p>
                </div>

                <form onSubmit={handleLogin} className="auth-form">
                    <div className="input-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            className="glass-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com (use 'hire' for recruiter view)"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="glass-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-full">
                        Log In
                    </button>
                </form>

                <div className="auth-footer">
                    Don't have an account? <Link to="/role-selection" className="text-primary-light">Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
