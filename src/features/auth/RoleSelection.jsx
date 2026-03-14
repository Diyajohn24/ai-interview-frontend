import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Building2, ArrowRight } from 'lucide-react';
import './Auth.css';

const RoleSelection = () => {
    const navigate = useNavigate();

    const handleRoleSelect = (role) => {
        // In a real app, we'd store the selected role in state/context before redirecting to actual signup.
        // Here we'll just mock it and send them to a simulated dashboard for demonstration
        if (role === 'seeker') {
            navigate('/seeker/dashboard');
        } else {
            navigate('/hirer/dashboard');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box glass-panel fade-in">
                <h2 className="auth-title">Choose Your Path</h2>
                <p className="auth-subtitle">How would you like to use Aureeture today?</p>

                <div className="role-options">
                    <button
                        className="role-card glass-panel"
                        onClick={() => handleRoleSelect('seeker')}
                    >
                        <div className="role-icon-wrapper seeker-icon">
                            <User size={40} />
                        </div>
                        <h3>I'm looking for a job</h3>
                        <p>Take AI interviews, get reports, and auto-apply.</p>
                        <ArrowRight className="role-arrow text-primary-light" />
                    </button>

                    <button
                        className="role-card glass-panel"
                        onClick={() => handleRoleSelect('hirer')}
                    >
                        <div className="role-icon-wrapper hirer-icon">
                            <Building2 size={40} />
                        </div>
                        <h3>I want to hire</h3>
                        <p>Review AI-ranked candidates and automate hiring.</p>
                        <ArrowRight className="role-arrow text-accent-cyan" />
                    </button>
                </div>

                <div className="auth-footer">
                    Already have an account? <Link to="/login" className="text-primary-light">Log in here</Link>
                </div>
            </div>
        </div>
    );
};

export default RoleSelection;
