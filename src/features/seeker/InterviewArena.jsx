import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, Play, Download } from 'lucide-react';
import { startInterview, submitAnswer } from '../../api';
import './InterviewArena.css';

const InterviewArena = () => {
    const [isStarted, setIsStarted] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [transcript, setTranscript] = useState([
        { speaker: 'System', text: 'Initializing AI Avatar Interview...', time: '00:00' }
    ]);
    const [isFinished, setIsFinished] = useState(false);
    const [report, setReport] = useState(null);
    const [interviewId, setInterviewId] = useState(null);
    const [conversation, setConversation] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const now = () => {
        const d = new Date();
        return `${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`;
    };

    const handleStart = async () => {
        setLoading(true);
        try {
            // Customize these values or later pull from user profile
            const data = await startInterview("Candidate", "Frontend Developer", "Sample resume text");
            setInterviewId(data.interviewId);
            setConversation(data.conversation || []);
            setCurrentQuestion(data.question);
            setTranscript(prev => [...prev,
                { speaker: 'AI', text: data.question, time: now() }
            ]);
            setIsStarted(true);
        } catch (e) {
            setTranscript(prev => [...prev,
                { speaker: 'System', text: 'Failed to connect to backend. Is it running?', time: now() }
            ]);
        }
        setLoading(false);
    };

    const handleSubmitAnswer = async () => {
        if (!answer.trim()) return;
        setLoading(true);

        setTranscript(prev => [...prev,
            { speaker: 'You', text: answer, time: now() }
        ]);

        try {
            const data = await submitAnswer(interviewId, conversation, answer);
            setAnswer('');

            if (data.status === 'completed') {
                setReport(data.report);
                setIsFinished(true);
                setTranscript(prev => [...prev,
                    { speaker: 'AI', text: 'Interview complete! Your report is ready.', time: now() }
                ]);
            } else {
                setConversation(data.conversation || []);
                setCurrentQuestion(data.question);
                setTranscript(prev => [...prev,
                    { speaker: 'AI', text: data.question, time: now() }
                ]);
            }
        } catch (e) {
            setTranscript(prev => [...prev,
                { speaker: 'System', text: 'Error submitting answer.', time: now() }
            ]);
        }
        setLoading(false);
    };

    const endCall = () => navigate('/seeker/dashboard');

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
                    <button className="btn btn-primary btn-large mt-4" onClick={handleStart} disabled={loading}>
                        <Play size={20} /> {loading ? 'Connecting...' : 'Join Session'}
                    </button>
                </div>
            ) : (
                <div className="arena-grid fade-in">
                    <div className="main-video-feed glass-panel">
                        <div className="avatar-placeholder text-glow">
                            <div className="pulse-circle"></div>
                            <h3>Aureeture AI</h3>
                            <p>{loading ? 'Thinking...' : 'Speaking...'}</p>
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

                            {!isFinished && (
                                <div className="answer-input-area" style={{padding: '12px', borderTop: '1px solid rgba(255,255,255,0.1)'}}>
                                    <textarea
                                        className="glass-input"
                                        style={{width: '100%', minHeight: '80px', marginBottom: '8px', resize: 'vertical'}}
                                        placeholder="Type your answer here..."
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                        disabled={loading}
                                    />
                                    <button
                                        className="btn btn-primary btn-full"
                                        onClick={handleSubmitAnswer}
                                        disabled={loading || !answer.trim()}
                                    >
                                        {loading ? 'Submitting...' : 'Submit Answer'}
                                    </button>
                                </div>
                            )}
                        </div>

                        {isFinished && (
                            <div className="report-panel glass-panel fade-in">
                                <h3 className="text-accent-cyan mb-2">Interview Complete</h3>
                                <p className="text-sm text-secondary mb-4">Your AI evaluation report is ready.</p>
                                {report && (
                                    <div className="score-overview mb-4">
                                        <span className="score-big">{report.score ?? '—'}</span>
                                        <span className="text-muted">/ 100</span>
                                    </div>
                                )}
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
