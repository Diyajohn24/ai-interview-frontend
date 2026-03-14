import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search, Filter, ChevronDown, Check, X, ShieldCheck, Mail, FileText, ArrowLeft, Star } from 'lucide-react';
import './Hirer.css';

const CandidateView = () => {
    const { jobId } = useParams();
    const [showAutoHire, setShowAutoHire] = useState(false);
    const [autoHireCount, setAutoHireCount] = useState(3);

    // Mock data for candidates ranked by AI Score
    const candidates = [
        { id: 1, name: 'Sarah Jenkins', score: 94, skills: ['React', 'TypeScript', 'CSS'], match: 'Excellent', status: 'Pending' },
        { id: 2, name: 'David Chen', score: 91, skills: ['Vue', 'JavaScript', 'Tailwind'], match: 'Strong', status: 'Pending' },
        { id: 3, name: 'Maya Patel', score: 88, skills: ['React', 'Python', 'Redux'], match: 'Good', status: 'Notified' },
        { id: 4, name: 'James Wilson', score: 82, skills: ['Angular', 'CSS', 'HTML'], match: 'Average', status: 'Pending' },
        { id: 5, name: 'Elena Rodriguez', score: 79, skills: ['React', 'Node.js'], match: 'Average', status: 'Pending' }
    ];

    const handleAutoHire = () => {
        alert(`System will automatically send hire offers to the top ${autoHireCount} candidates based on AI evaluations.`);
        setShowAutoHire(false);
    };

    return (
        <div className="hirer-container">
            <div className="mb-4 fade-in">
                <Link to="/hirer/dashboard" className="back-link">
                    <ArrowLeft size={16} /> Back to Dashboard
                </Link>
            </div>

            <div className="hirer-header fade-in">
                <div>
                    <h1 className="hirer-title">Senior Frontend Developer</h1>
                    <p className="text-secondary">Candidates ranked by Aureeture AI Performance</p>
                </div>
                <div className="header-actions">
                    <button className="btn btn-outline">
                        <Filter size={18} /> Filter List
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowAutoHire(true)}
                    >
                        <Zap size={18} /> Auto-Hire Top Candidates
                    </button>
                </div>
            </div>

            <div className="candidate-list-wrapper glass-panel fade-in-delay">
                <table className="candidate-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Candidate</th>
                            <th>AI Score</th>
                            <th>Key Skills</th>
                            <th>Match Level</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates.map((c, index) => (
                            <tr key={c.id}>
                                <td className="rank-cell">
                                    {index < 3 ? <Star size={16} className="text-primary-light" fill="currentColor" /> : `#${index + 1}`}
                                </td>
                                <td>
                                    <div className="candidate-name">{c.name}</div>
                                </td>
                                <td>
                                    <div className="score-badge">
                                        {c.score}%
                                    </div>
                                </td>
                                <td>
                                    <div className="skill-tags">
                                        {c.skills.map(skill => <span key={skill} className="tag">{skill}</span>)}
                                    </div>
                                </td>
                                <td>
                                    <span className={`match-badge ${c.score >= 90 ? 'match-high' : c.score >= 85 ? 'match-med' : 'match-low'}`}>
                                        {c.match}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-cell">
                                        <button className="icon-btn text-accent-cyan" title="View Report"><FileText size={18} /></button>
                                        <button className="icon-btn" title="Manual Hire"><Check size={18} className="text-green-success" /></button>
                                        <button className="icon-btn" title="Contact"><Mail size={18} /></button>
                                        <button className="icon-btn text-red-error" title="Reject"><X size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showAutoHire && (
                <div className="modal-overlay">
                    <div className="modal-content glass-panel fade-in">
                        <h2 className="mb-2">Configure Auto-Hire</h2>
                        <p className="text-secondary mb-4">The AI will automatically send offers to the top-ranked candidates based on your criteria.</p>

                        <div className="input-group mb-4">
                            <label>Number of candidates to hire:</label>
                            <input
                                type="number"
                                className="glass-input"
                                value={autoHireCount}
                                onChange={(e) => setAutoHireCount(e.target.value)}
                                min="1"
                                max={candidates.length}
                            />
                        </div>

                        <div className="modal-actions">
                            <button className="btn btn-outline" onClick={() => setShowAutoHire(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleAutoHire}>
                                Confirm Auto-Hire ({autoHireCount})
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CandidateView;
