import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, UserSearch, Sparkles } from 'lucide-react';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <div className="hero-section">
                <div className="hero-badge glass-panel">
                    <Sparkles size={16} className="text-accent-cyan" />
                    <span>Next-Generation AI Interviews</span>
                </div>

                <h1 className="hero-title">
                    Hire <span className="text-gradient">Smarter</span>. <br />
                    Interview <span className="text-gradient">Better</span>.
                </h1>

                <p className="hero-subtitle">
                    Experience the future of hiring with our real-time AI Avatar.
                    Dynamic questions, instant feedback, and unbiased evaluations for both recruiters and candidates.
                </p>

                <div className="hero-actions">
                    <Link to="/role-selection" className="btn btn-primary btn-large">
                        Get Started Now
                    </Link>
                </div>
            </div>

            <div className="features-grid">
                <div className="feature-card glass-panel">
                    <div className="feature-icon-wrapper">
                        <Bot size={32} className="feature-icon text-primary-light" />
                    </div>
                    <h3>For Candidates</h3>
                    <p>Practice with our AI Avatar, get detailed performance reports, and auto-apply to top jobs based on your skills.</p>
                </div>

                <div className="feature-card glass-panel">
                    <div className="feature-icon-wrapper">
                        <UserSearch size={32} className="feature-icon text-accent-cyan" />
                    </div>
                    <h3>For Hirers</h3>
                    <p>Review ranked candidate lists, analyze in-depth AI evaluations, and auto-hire the top talent seamlessly.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
