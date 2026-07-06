import { useNavigate } from 'react-router-dom';

function Sidebar({ role }) {
  const navigate = useNavigate();

  const menus = {
    jobseeker: [
      { label: 'Dashboard', icon: '🏠', path: '/jobseeker' },
      { label: 'Find Jobs', icon: '🔍', path: '/jobs' },
      { label: 'My Profile', icon: '👤', path: '/profile' },
      { label: 'AI Resume', icon: '🤖', path: '/ai-resume' },
    ],
    recruiter: [
      { label: 'Dashboard', icon: '🏠', path: '/recruiter' },
      { label: 'Post Job', icon: '📝', path: '/post-job' },
      { label: 'Candidates', icon: '👥', path: '/candidates' },
      { label: 'Interviews', icon: '📅', path: '/interviews' },
    ],
    manager: [
      { label: 'Dashboard', icon: '🏠', path: '/hiring-manager' },
      { label: 'Candidates', icon: '👥', path: '/candidates' },
      { label: 'Interviews', icon: '📅', path: '/interviews' },
    ],
    admin: [
      { label: 'Dashboard', icon: '🏠', path: '/admin' },
      { label: 'Users', icon: '👥', path: '/users' },
      { label: 'Analytics', icon: '📊', path: '/analytics' },
    ],
  };

  const currentMenu = menus[role] || [];

  return (
    <div className="w-64 min-h-screen bg-blue-900 text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-blue-800">
        <h1 className="text-2xl font-extrabold">
          Code<span className="text-blue-300">House</span>
        </h1>
        <p className="text-blue-400 text-xs mt-1">AI Recruitment Platform</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-1">
        {currentMenu.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition duration-200 ${
              window.location.pathname === item.path
                ? 'bg-blue-700 text-white font-semibold'
                : 'text-blue-200 hover:bg-blue-800 hover:text-white'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-blue-800">
        <button
          onClick={() => navigate('/login')}
          className="w-full flex items-center gap-3 p-3 rounded-xl text-blue-200 hover:bg-red-700 hover:text-white transition duration-200"
        >
          <span className="text-xl">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;