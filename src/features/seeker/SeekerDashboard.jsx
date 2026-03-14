import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Play, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import './Seeker.css';

const SeekerDashboard = () => {
    // Mock data for the dashboard
    const stats = {
        interviewsCompleted: 3,
        jobsAutoApplied: 12,
        avgScore: "85%",
        nextAvailable: "Ready Now"
    };

    const recentInterviews = [
        { id: 1, role: "Frontend Developer", company: "TechCorp", score: 92, date: "2 days ago", status: "Advanced" },
        { id: 2, role: "React Engineer", company: "Innovate AI", score: 88, date: "5 days ago", status: "Pending" }
    ];

    return (
        <div className="dashboard-container">
            <div className="dashboard-header fade-in">
                <div>
                    <h1 className="dashboard-title">Welcome back, Alex</h1>
                    <p className="text-secondary">Here's your interview progress and AI application status.</p>
                </div>
                <div className="header-actions">
                    <Link to="/seeker/profile" className="btn btn-outline">Edit Profile</Link>
                    <Link to="/seeker/interview" className="btn btn-primary">
                        <Play size={18} /> Start New Interview
                    </Link>
                </div>
            </div>

            <div className="stats-grid fade-in-delay">
                <div className="stat-card glass-panel">
                    <div className="stat-icon-wrapper text-primary-light">
                        <CheckCircle size={24} />
                    </div>
                    <div className="stat-info">
                        <p className="stat-label">Interviews Done</p>
                        <h3 className="stat-value">{stats.interviewsCompleted}</h3>
                    </div>
                </div>

                <div className="stat-card glass-panel">
                    <div className="stat-icon-wrapper text-accent-cyan">
                        <TrendingUp size={24} />
                    </div>
                    <div className="stat-info">
                        <p className="stat-label">Avg. AI Score</p>
                        <h3 className="stat-value">{stats.avgScore}</h3>
                    </div>
                </div>

                <div className="stat-card glass-panel">
                    <div className="stat-icon-wrapper text-accent-pink">
                        <FileText size={24} />
                    </div>
                    <div className="stat-info">
                        <p className="stat-label">Auto-Applied Jobs</p>
                        <h3 className="stat-value">{stats.jobsAutoApplied}</h3>
                    </div>
                </div>

                <div className="stat-card glass-panel">
                    <div className="stat-icon-wrapper" style={{ color: 'var(--green-success)' }}>
                        <Clock size={24} />
                    </div>
                    <div className="stat-info">
                        <p className="stat-label">Cooldown Status</p>
                        <h3 className="stat-value" style={{ fontSize: '1.2rem' }}>{stats.nextAvailable}</h3>
                    </div>
                </div>
            </div>

            <div className="dashboard-content grid-2-col fade-in-delay-2">
                <div className="content-section">
                    <div className="section-header">
                        <h2>Recent AI Interviews</h2>
                        <Link to="#" className="view-all text-primary-light">View All</Link>
                    </div>

                    <div className="card-list">
                        {recentInterviews.map(interview => (
                            <div key={interview.id} className="list-card glass-panel">
                                <div className="card-main">
                                    <h4>{interview.role}</h4>
                                    <p className="text-secondary">{interview.company} • {interview.date}</p>
                                </div>
                                <div className="card-meta">
                                    <div className="score-badge">
                                        {interview.score}%
                                    </div>
                                    <span className={`status-badge ${interview.status.toLowerCase()}`}>
                                        {interview.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="content-section">
                    <div className="section-header">
                        <h2>Auto-Apply Preferences</h2>
                    </div>
                    <div className="glass-panel settings-panel">
                        <p className="text-muted mb-4">We'll automatically apply to jobs that match your AI interview performance and these preferences.</p>

                        <div className="setting-row">
                            <span className="setting-label">Job Roles</span>
                            <span className="setting-value">Frontend, Fullstack</span>
                        </div>
                        <div className="setting-row">
                            <span className="setting-label">Location</span>
                            <span className="setting-value">Remote, New York</span>
                        </div>
                        <div className="setting-row">
                            <span className="setting-label">Minimum Salary</span>
                            <span className="setting-value">$120,000</span>
                        </div>

                        <button className="btn btn-outline btn-full mt-4">Update Preferences</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeekerDashboard;
