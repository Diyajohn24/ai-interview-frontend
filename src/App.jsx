import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RoleSelection from './features/auth/RoleSelection';
import Login from './features/auth/Login';
import SeekerDashboard from './features/seeker/SeekerDashboard';
import SeekerProfile from './features/seeker/SeekerProfile';
import InterviewArena from './features/seeker/InterviewArena';
import HirerDashboard from './features/hirer/HirerDashboard';
import CandidateView from './features/hirer/CandidateView';

function App() {
  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/login" element={<Login />} />

          {/* Seeker Routes */}
          <Route path="/seeker/dashboard" element={<SeekerDashboard />} />
          <Route path="/seeker/profile" element={<SeekerProfile />} />
          <Route path="/seeker/interview" element={<InterviewArena />} />

          {/* Hirer Routes */}
          <Route path="/hirer/dashboard" element={<HirerDashboard />} />
          <Route path="/hirer/candidates/:jobId" element={<CandidateView />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
