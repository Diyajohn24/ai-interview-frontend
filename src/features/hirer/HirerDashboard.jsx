import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Briefcase, Zap, Plus, ArrowUpRight } from 'lucide-react';
import './Hirer.css';

const HirerDashboard = () => {
    const stats = {
        activeJobs: 4,
        totalApplicants: 156,
        aiReviewed: 142,
        autoHired: 3
    };

    const activeJobs = [
        { id: 1, title: 'Senior Frontend Developer', dept: 'Engineering', applicants: 45, aiReviewed: 40, topScore: 94 },
        { id: 2, title: 'Product Designer', dept: 'Design', applicants: 28, aiReviewed: 28, topScore: 89 },
        { id: 3, title: 'Backend Engineer (Node.js)', dept: 'Engineering', applicants: 62, aiReviewed: 55, topScore: 98 },
    ];

    return (
        <div className="hirer-container">
            <div className="hirer-header fade-in">
                <div>
                    <h1 className="hirer-title">Recruitment Dashboard</h1>
                    <p className="text-secondary">Manage your active listings and review AI-ranked candidates.</p>
                </div>
                <button className="btn btn-primary">
                    <Plus size={18} /> Create New Job
                </button>
            </div>

            <div className="stats-header fade-in-delay">
                <div className="stat-pill glass-panel">
                    <Briefcase size={20} className="text-primary-light" />
                    <div className="stat-text">
                        <span>{stats.activeJobs}</span> Active Jobs
                    </div>
                </div>

                <div className="stat-pill glass-panel">
                    <Users size={20} className="text-accent-cyan" />
                    <div className="stat-text">
                        <span>{stats.totalApplicants}</span> Total Applicants
                    </div>
                </div>

                <div className="stat-pill glass-panel">
                    <Zap size={20} className="text-accent-pink" />
                    <div className="stat-text">
                        <span>{stats.aiReviewed}</span> AI Evaluated
                    </div>
                </div>
            </div>

            <div className="job-listings fade-in-delay-2">
                <h2 className="mb-4">Active Postings</h2>

                <div className="job-grid">
                    {activeJobs.map(job => (
                        <div key={job.id} className="job-card glass-panel">
                            <div className="job-card-header">
                                <div>
                                    <h3>{job.title}</h3>
                                    <span className="dept-tag">{job.dept}</span>
                                </div>
                                <div className="top-score">
                                    <span className="score-val">{job.topScore}</span>
                                    <span className="text-xs text-muted">Top Score</span>
                                </div>
                            </div>

                            <div className="job-card-stats mt-4">
                                <div className="mini-stat">
                                    <span className="val">{job.applicants}</span>
                                    <span className="lbl">Applied</span>
                                </div>
                                <div className="mini-stat">
                                    <span className="val">{job.aiReviewed}</span>
                                    <span className="lbl">AI Reviewed</span>
                                </div>
                            </div>

                            <div className="job-card-footer mt-4">
                                <Link to={`/hirer/candidates/${job.id}`} className="btn btn-outline btn-full">
                                    View Candidates <ArrowUpRight size={16} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HirerDashboard;
