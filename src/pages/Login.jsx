import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill all fields!');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const data = await loginUser(email, password);

      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('name', data.fullName);

        if (data.role === 'Candidate') navigate('/jobseeker');
        else if (data.role === 'Recruiter') navigate('/recruiter');
        else if (data.role === 'HiringManager') navigate('/hiring-manager');
        else if (data.role === 'Admin') navigate('/admin');
      } else {
        setError(data.message || 'Invalid email or password!');
      }
    } catch (err) {
      setError('Connection failed! Make sure backend is running.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-800 rounded-2xl mb-4 shadow-lg">
            <span className="text-3xl">🎯</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
            Code<span className="text-blue-700">House</span>
          </h1>
          <p className="text-slate-400 mt-2 text-sm">AI-Powered Recruitment Platform</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-1">Welcome back 👋</h2>
          <p className="text-slate-400 text-sm mb-6">Sign in to continue to Code House</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl mb-4 text-sm">
              ⚠️ {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-slate-600 mb-2 text-sm font-semibold">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-slate-200 text-slate-800 p-3 rounded-xl focus:outline-none focus:border-blue-600 transition placeholder-slate-300"
            />
          </div>

          <div className="mb-6">
            <label className="block text-slate-600 mb-2 text-sm font-semibold">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full border-2 border-slate-200 text-slate-800 p-3 rounded-xl focus:outline-none focus:border-blue-600 transition placeholder-slate-300"
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-800 hover:bg-blue-900 text-white p-3 rounded-xl font-bold transition duration-300 shadow-md"
          >
            {loading ? '⏳ Signing in...' : 'Sign In '}
          </button>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-slate-400 text-xs">OR</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          <p className="text-center text-slate-500 text-sm">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-700 font-semibold hover:text-blue-800">Register here</a>
          </p>

          <p
            onClick={() => setShowHint(!showHint)}
            className="text-center text-slate-300 mt-4 text-xs cursor-pointer hover:text-slate-400"
          >
            Need help signing in?
          </p>
          {showHint && (
            <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl mt-3 text-xs text-slate-500">
              <p className="font-bold mb-2 text-blue-700">Demo Accounts:</p>
              <p>jobseeker@gmail.com / 1234</p>
              <p>recruiter@gmail.com / 1234</p>
              <p>manager@gmail.com / 1234</p>
              <p>admin@gmail.com / 1234</p>
            </div>
          )}
        </div>

        <p className="text-center text-slate-400 mt-6 text-xs">
          © 2026 Code House. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Login;