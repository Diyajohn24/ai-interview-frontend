import React, { useState } from 'react';
import { Upload, Link as LinkIcon, Github, Linkedin, Save } from 'lucide-react';
import './Seeker.css';

const SeekerProfile = () => {
    const [formData, setFormData] = useState({
        name: 'Alex Developer',
        headline: 'Senior Frontend Engineer',
        linkedin: 'linkedin.com/in/alexdev',
        github: 'github.com/alexdev',
    });

    const [resumeFile, setResumeFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate save
        alert('Profile saved successfully!');
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header fade-in">
                <div>
                    <h1 className="dashboard-title">Your Profile</h1>
                    <p className="text-secondary">Update your information to get better AI interview matches.</p>
                </div>
            </div>

            <div className="profile-grid fade-in-delay">
                <div className="glass-panel profile-section">
                    <h3 className="section-title">Resume Upload</h3>
                    <p className="text-muted mb-4">Our AI will parse your resume to generate relevant interview questions.</p>

                    <div className="upload-dropzone">
                        <Upload size={40} className="text-primary-light mb-2" />
                        <h4>Drag & Drop your resume</h4>
                        <p className="text-secondary text-sm">PDF, DOCX up to 5MB</p>
                        <input
                            type="file"
                            className="file-input-hidden"
                            id="resume-upload"
                            onChange={(e) => setResumeFile(e.target.files[0])}
                        />
                        <label htmlFor="resume-upload" className="btn btn-outline mt-4">
                            {resumeFile ? resumeFile.name : "Browse Files"}
                        </label>
                    </div>
                </div>

                <form className="glass-panel profile-section" onSubmit={handleSubmit}>
                    <h3 className="section-title">Personal Details</h3>

                    <div className="form-grid">
                        <div className="input-group">
                            <label>Full Name</label>
                            <input type="text" className="glass-input" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                        </div>

                        <div className="input-group">
                            <label>Professional Headline</label>
                            <input type="text" className="glass-input" value={formData.headline} onChange={e => setFormData({ ...formData, headline: e.target.value })} />
                        </div>

                        <div className="input-group">
                            <label><Linkedin size={16} className="inline-icon" /> LinkedIn Profile</label>
                            <input type="text" className="glass-input" value={formData.linkedin} onChange={e => setFormData({ ...formData, linkedin: e.target.value })} />
                        </div>

                        <div className="input-group">
                            <label><Github size={16} className="inline-icon" /> GitHub URL</label>
                            <input type="text" className="glass-input" value={formData.github} onChange={e => setFormData({ ...formData, github: e.target.value })} />
                        </div>
                    </div>

                    <div className="form-actions mt-6">
                        <button type="submit" className="btn btn-primary">
                            <Save size={18} /> Save Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SeekerProfile;
