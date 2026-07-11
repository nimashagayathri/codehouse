import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Sidebar({ role }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const menus = {
    jobseeker: [
      { label: 'Dashboard', icon: '🏠', path: '/jobseeker' },
      { label: 'My Applications', icon: '📂', path: '/my-applications' },
      { label: 'Find Jobs', icon: '🔍', path: '/jobs' },
      { label: 'My Profile', icon: '👤', path: '/profile' },
      { label: 'AI Resume', icon: '🤖', path: '/ai-resume' },
      { label: 'AI Jobs', icon: '✨', path: '/recommendations' },
    ],
    recruiter: [
      { label: 'Dashboard', icon: '🏠', path: '/recruiter' },
      { label: 'Post Job', icon: '📝', path: '/post-job' },
      { label: 'Candidates', icon: '👥', path: '/candidates' },
      { label: 'Interviews', icon: '📅', path: '/interviews' },
      { label: 'AI Ranking', icon: '🏆', path: '/ai-ranking' },
    ],
    manager: [
      { label: 'Dashboard', icon: '🏠', path: '/hiring-manager' },
      { label: 'Candidates', icon: '👥', path: '/candidates' },
      { label: 'Interviews', icon: '📅', path: '/interviews' },
      { label: 'AI Ranking', icon: '🏆', path: '/ai-ranking' },
    ],
    admin: [
      { label: 'Dashboard', icon: '🏠', path: '/admin' },
      { label: 'Users', icon: '👥', path: '/users' },
      { label: 'Analytics', icon: '📊', path: '/analytics' },
    ],
  };

  const currentMenu = menus[role] || [];

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false); // Close menu after navigation on mobile
  };

  const handleLogout = () => { localStorage.clear(); navigate('/login'); };

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
          ☰
        </button>
      </div>

      {/* Desktop Sidebar (Hidden on Mobile) */}
      <div className="hidden md:flex md:w-64 md:min-h-screen bg-blue-900 text-white flex-col fixed md:relative">
        {/* Logo */}
        <div className="p-6 border-b border-blue-800">
          <h1 className="text-2xl font-extrabold">
            Code<span className="text-blue-300">House</span>
          </h1>
          <p className="text-blue-400 text-xs mt-1">AI Recruitment Platform</p>
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
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-blue-800">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-blue-800 transition duration-200">
            <span className="text-xl">🚪</span>
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
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
          {/* Logout in mobile menu */}
          <div className="p-4 border-t border-blue-800">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-blue-800 transition duration-200">
              <span className="text-xl">🚪</span>
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
