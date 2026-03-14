import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, Play, RefreshCw, Download } from 'lucide-react';
import './InterviewArena.css';

const InterviewArena = () => {
    const [isStarted, setIsStarted] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [transcript, setTranscript] = useState([
        { speaker: 'System', text: 'Initializing AI Avatar Interview...', time: '00:00' }
    ]);
    const [isFinished, setIsFinished] = useState(false);
    const navigate = useNavigate();

    // Simulated interview progression
    useEffect(() => {
        if (!isStarted || isFinished) return;

        const timer1 = setTimeout(() => {
            setTranscript(prev => [...prev, { speaker: 'AI', text: 'Hello Alex. I am Aureeture AI. Thank you for taking the time to interview today for the Frontend Developer role. Shall we begin with your background?', time: '00:05' }]);
        }, 2000);

        const timer2 = setTimeout(() => {
            setTranscript(prev => [...prev, { speaker: 'You', text: 'Yes, absolutely. I have over 4 years of experience building React applications...', time: '00:15' }]);
        }, 8000);

        // End simulation early for demo purposes
        const timer3 = setTimeout(() => {
            setIsFinished(true);
        }, 12000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [isStarted, isFinished]);

    const endCall = () => {
        // Return to dashboard or show report
        navigate('/seeker/dashboard');
    };

    const startCall = () => {
        setIsStarted(true);
    };

    return (
        <div className="arena-wrapper">
            {!isStarted ? (
                <div className="lobby-container glass-panel fade-in">
                    <h2>Ready to Begin?</h2>
                    <p className="text-muted">Ensure your camera and microphone are working. You will have 30 minutes to complete this technical interview.</p>

                    <div className="device-preview">
                        <div className="camera-box">
                            <Video size={48} className="text-secondary opacity-50" />
                            <span>Camera Preview</span>
                        </div>
                    </div>

                    <button className="btn btn-primary btn-large mt-4" onClick={startCall}>
                        <Play size={20} /> Join Session
                    </button>
                </div>
            ) : (
                <div className="arena-grid fade-in">
                    {/* Main Video Area (The AI Avatar) */}
                    <div className="main-video-feed glass-panel">
                        <div className="avatar-placeholder text-glow">
                            <div className="pulse-circle"></div>
                            <h3>Aureeture AI</h3>
                            <p>Speaking...</p>
                        </div>

                        <div className="floating-user-cam">
                            {isVideoOff ? <VideoOff size={24} className="text-muted" /> : <span className="text-xs">You</span>}
                        </div>

                        <div className="call-controls">
                            <button className={`control-btn ${isMuted && 'btn-disabled'}`} onClick={() => setIsMuted(!isMuted)}>
                                {isMuted ? <MicOff /> : <Mic />}
                            </button>
                            <button className={`control-btn ${isVideoOff && 'btn-disabled'}`} onClick={() => setIsVideoOff(!isVideoOff)}>
                                {isVideoOff ? <VideoOff /> : <Video />}
                            </button>
                            <button className="control-btn end-call" onClick={endCall}>
                                <PhoneOff />
                            </button>
                        </div>
                    </div>

                    {/* Sidebar / Tools */}
                    <div className="arena-sidebar">
                        <div className="transcript-panel glass-panel">
                            <div className="panel-header">
                                <MessageSquare size={18} />
                                <h4>Live Transcript</h4>
                            </div>
                            <div className="transcript-messages">
                                {transcript.map((msg, i) => (
                                    <div key={i} className={`msg-bubble ${msg.speaker === 'You' ? 'msg-out' : 'msg-in'}`}>
                                        <span className="msg-sender">{msg.speaker} <small>{msg.time}</small></span>
                                        <p>{msg.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {isFinished && (
                            <div className="report-panel glass-panel fade-in">
                                <h3 className="text-accent-cyan mb-2">Interview Complete</h3>
                                <p className="text-sm text-secondary mb-4">Your AI evaluation report is ready.</p>
                                <div className="score-overview mb-4">
                                    <span className="score-big">92</span>
                                    <span className="text-muted">/ 100</span>
                                </div>
                                <button className="btn btn-primary btn-full mb-2">
                                    <Download size={18} /> Download Full PDF Report
                                </button>
                                <p className="text-xs text-muted text-center mt-2">Cooldown active. Next attempt available in 7 days.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default InterviewArena;
