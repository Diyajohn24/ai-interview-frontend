import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="navbar glass-panel">
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    <BrainCircuit className="logo-icon" size={28} />
                    <span className="logo-text text-gradient">Aureeture</span>
                </Link>

                <div className="nav-links">
                    <Link to="/role-selection" className="btn btn-outline">Sign Up</Link>
                    <Link to="/login" className="btn btn-primary">Login</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
