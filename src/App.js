import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import JobSeekerDashboard from './pages/JobSeekerDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import HiringManagerDashboard from './pages/HiringManagerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import JobSearch from './pages/JobSearch';
import PostJob from './pages/PostJob';
import CandidateProfile from './pages/CandidateProfile';
import InterviewSchedule from './pages/InterviewSchedule';
import CandidatesList from './pages/CandidatesList';
import AIResumeParser from './pages/AIResumeParser';
import AdminUsers from './pages/AdminUsers';
import AdminAnalytics from './pages/AdminAnalytics';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobseeker" element={<JobSeekerDashboard />} />
        <Route path="/recruiter" element={<RecruiterDashboard />} />
        <Route path="/hiring-manager" element={<HiringManagerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/jobs" element={<JobSearch />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/profile" element={<CandidateProfile />} />
        <Route path="/interviews" element={<InterviewSchedule />} />
        <Route path="/candidates" element={<CandidatesList />} />
        <Route path="/ai-resume" element={<AIResumeParser />} />
        <Route path="/users" element={<AdminUsers />} />
        <Route path="/analytics" element={<AdminAnalytics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;