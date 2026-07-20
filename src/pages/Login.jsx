import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, forgotPassword } from '../api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [forgotMode, setForgotMode] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address to reset password.');
      return;
    }
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const data = await forgotPassword(email);
      setMessage(data.message || 'If this email exists, a reset link will be sent.');
    } catch (err) {
      setError('Connection failed. Make sure backend is running.');
    }
    setLoading(false);
  };

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

        <div className="text-center mb-6 mt-2">
          <div className="h-20 flex items-center justify-center overflow-visible mb-2">
            <img src="/logo.png" alt="CodeHouse" className="h-48 md:h-64 object-contain transform scale-[1.5]" />
          </div>
          <p className="text-slate-500 mt-2 text-sm font-semibold uppercase tracking-widest">AI Recruitment Platform</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-blue-900/5 border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome back</h2>
          <p className="text-slate-400 text-sm mb-6">Sign in to continue to Code House</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl mb-4 text-sm">
              ️ {error}
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

          <div className="mb-2">
            <label className="block text-slate-600 text-sm font-semibold">Password</label>

          </div>

          {!forgotMode && (
            <div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full border-2 border-slate-200 text-slate-800 p-3 rounded-xl focus:outline-none focus:border-blue-600 transition placeholder-slate-300 mb-2"
              />
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => { setForgotMode(true); setError(''); setMessage(''); }}
                  className="text-xs text-blue-600 font-bold hover:text-blue-700 transition"
                >
                  Forgot Password?
                </button>
              </div>
            </div>
          )}

          {message && (
            <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-xl mb-6 text-sm font-bold text-center">
              {message}
            </div>
          )}

          {forgotMode ? (
            <div className="space-y-3">
              <button
                onClick={handleForgotPassword}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl font-bold transition duration-300 shadow-md disabled:opacity-50"
              >
                {loading ? ' Sending...' : 'Send Reset Link 📧'}
              </button>
              <button
                onClick={() => { setForgotMode(false); setError(''); setMessage(''); }}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 p-3 rounded-xl font-bold transition duration-300"
              >
                Back to Login
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-blue-800 hover:bg-blue-900 text-white p-3 rounded-xl font-bold transition duration-300 shadow-md mb-6"
            >
              {loading ? ' Signing in...' : 'Sign In '}
            </button>
          )}

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-slate-400 text-xs font-semibold">OR</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          {/* ===== Google Sign In Mockup Button ===== */}
          <button
            type="button"
            onClick={() => alert("Google Sign-In is coming soon!")}
            className="w-full bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 p-3 rounded-xl font-bold transition duration-300 shadow-sm flex items-center justify-center gap-3 mb-6"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="h-5 w-5"
            />
            Sign in with Google
          </button>
          <p className="text-center text-slate-500 text-sm">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-700 font-semibold hover:text-blue-800 transition">Register here</a>
          </p>

          <p
            onClick={() => setShowHint(!showHint)}
            className="text-center text-slate-300 mt-4 text-xs cursor-pointer hover:text-slate-400 transition"
          >
            Need help signing in?
          </p>

          {showHint && (
            <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl mt-3 text-xs text-slate-500 transform transition-all duration-300">
              <p className="font-bold mb-2 text-blue-700">Demo Accounts:</p>
              <p>jobseeker@gmail.com / 123456</p>
              <p>recruiter@gmail.com / 123456</p>
              <p>manager@gmail.com / 123456</p>
              <p>admin@gmail.com / 123456</p>
            </div>
          )}
        </div>

        <p className="text-center text-slate-400 mt-6 text-xs font-medium">
          © 2026 CodeHouse Technologies. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Login;