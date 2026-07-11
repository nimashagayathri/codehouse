import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home, FolderOpen, Calendar, Search, User, FileText,
  Sparkles, FileEdit, Users, Award,
  BarChart3, Settings, Shield, LogOut, Menu
} from 'lucide-react';
function Sidebar({ role }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const menus = {
    jobseeker: [
      { label: 'Dashboard', icon: <Home size={18} />, path: '/jobseeker' },
      { label: 'My Applications', icon: <FolderOpen size={18} />, path: '/my-applications' },
      { label: 'My Interviews', icon: <Calendar size={18} />, path: '/my-interviews' },
      { label: 'Find Jobs', icon: <Search size={18} />, path: '/jobs' },
      { label: 'My Profile', icon: <User size={18} />, path: '/profile' },
      { label: 'AI Resume', icon: <FileText size={18} />, path: '/ai-resume' },
      { label: 'AI Jobs', icon: <Sparkles size={18} />, path: '/recommendations' },
    ],
    recruiter: [
      { label: 'Dashboard', icon: <Home size={18} />, path: '/recruiter' },
      { label: 'Post Job', icon: <FileEdit size={18} />, path: '/post-job' },
      { label: 'Candidates', icon: <Users size={18} />, path: '/candidates' },
      { label: 'Interviews', icon: <Calendar size={18} />, path: '/interviews' },
      { label: 'AI Ranking', icon: <Award size={18} />, path: '/ai-ranking' },
    ],
    manager: [
      { label: 'Dashboard', icon: <Home size={18} />, path: '/hiring-manager' },
      { label: 'Candidates', icon: <Users size={18} />, path: '/candidates' },
      { label: 'Interviews', icon: <Calendar size={18} />, path: '/interviews' },
      { label: 'AI Ranking', icon: <Award size={18} />, path: '/ai-ranking' },
    ],
    admin: [
      { label: 'Dashboard', icon: <Home size={18} />, path: '/admin' },
      { label: 'Users', icon: <Shield size={18} />, path: '/users' },
      { label: 'Analytics', icon: <BarChart3 size={18} />, path: '/analytics' },
    ],
  };

  const currentMenu = menus[role] || [];

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false); // Close menu after navigation on mobile
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      {/* Mobile Hamburger Menu */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-blue-900 text-white p-4 flex justify-between items-center z-50">
        <div>
          <h1 className="text-lg font-extrabold">
            Code<span className="text-blue-300">House</span>
          </h1>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white text-2xl focus:outline-none"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Desktop Sidebar (Hidden on Mobile) */}
      <div className="hidden md:flex md:w-64 md:min-h-screen bg-blue-900 text-white flex-col fixed md:relative">
        {/* Logo */}
        <div className="p-4 border-b border-blue-800 flex justify-center bg-white rounded-tr-3xl mb-4 h-24 items-center overflow-visible">
          <img src="/logo.png" alt="CodeHouse" className="h-32 md:h-40 object-contain transform scale-[2]" />
        </div>

        {/* Desktop Menu */}
        <nav className="flex-1 p-4 space-y-1">
          {currentMenu.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition duration-200 ${window.location.pathname === item.path
                ? 'bg-blue-700'
                : 'hover:bg-blue-800'
                }`}
            >
              <span className="flex justify-center items-center h-6 w-6">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-blue-800">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-blue-800 transition duration-200">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar (Visible on Mobile) */}
      {isOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-blue-900 text-white z-40 shadow-lg">
          <nav className="p-4 space-y-1">
            {currentMenu.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition duration-200 ${window.location.pathname === item.path
                  ? 'bg-blue-700'
                  : 'hover:bg-blue-800'
                  }`}
              >
                <span className="flex justify-center items-center h-6 w-6">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
          {/* Logout in mobile menu */}
          <div className="p-4 border-t border-blue-800">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-blue-800 transition duration-200">
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* Overlay when menu is open (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default Sidebar;
