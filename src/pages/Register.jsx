import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5223';

function Register() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', role: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (!form.fullName || !form.email || !form.password || !form.role) {
      setError('Please fill all fields!');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters!');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (data.userId) {
        alert('Registration Successful! Please login.');
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed!');
      }
    } catch (err) {
      setError('Connection failed! Make sure backend is running.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="h-16 flex items-center justify-center overflow-visible mb-2">
            <img src="/logo.png" alt="CodeHouse" className="h-40 md:h-48 object-contain transform scale-[1.5]" />
          </div>
          <p className="text-center text-gray-400 mb-6">Create Account</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl mb-4 text-sm">
              ️ {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-slate-600 mb-2 text-sm font-semibold">Full Name</label>
            <input type="text" name="fullName" value={form.fullName} onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:border-blue-500" />
          </div>

          <div className="mb-4">
            <label className="block text-slate-600 mb-2 text-sm font-semibold">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:border-blue-500" />
          </div>

          <div className="mb-4">
            <label className="block text-slate-600 mb-2 text-sm font-semibold">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange}
              placeholder="Min 6 characters"
              className="w-full border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:border-blue-500" />
          </div>

          <div className="mb-6">
            <label className="block text-slate-600 mb-2 text-sm font-semibold">I am a</label>
            <select name="role" value={form.role} onChange={handleChange}
              className="w-full border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:border-blue-500">
              <option value="">Select Role</option>
              <option value="Candidate">Job Seeker</option>
              <option value="Recruiter">Recruiter</option>
              <option value="HiringManager">Hiring Manager</option>
            </select>
          </div>

          <button onClick={handleRegister} disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white p-3 rounded-xl font-bold transition duration-300">
            {loading ? ' Creating account...' : 'Register '}
          </button>

          <p className="text-center text-gray-400 mt-4 text-sm">
            Already have an account?{' '}
            <a href="/login" className="text-blue-700 font-semibold">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;