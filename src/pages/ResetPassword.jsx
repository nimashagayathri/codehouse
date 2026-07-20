import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { resetPassword } from '../api';

function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            setError('Invalid or missing reset token.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        try {
            const data = await resetPassword(token, newPassword);
            if (data.message === 'Password updated successfully.') {
                setMessage('Your password has been reset successfully! Redirecting to login...');
                setTimeout(() => navigate('/login'), 3000);
            } else {
                setError(data.message || 'Failed to reset password.');
            }
        } catch (err) {
            setError('Server error. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white max-w-md w-full p-8 rounded-3xl shadow-xl shadow-blue-900/5 border border-slate-100">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-12 shadow-lg shadow-blue-500/30">
                        <span className="text-3xl text-white block transform -rotate-12">🔑</span>
                    </div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">Reset Password</h2>
                    <p className="text-slate-500 font-medium mt-2">Enter your new password below.</p>
                </div>

                {message && <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-6 text-sm font-semibold text-center border border-green-200">{message}</div>}
                {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-semibold text-center border border-red-200">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">New Password 🌱</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full border-2 border-slate-200 p-3.5 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Confirm Password 🔐</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full border-2 border-slate-200 p-3.5 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20 transition transform active:scale-[0.98] mt-2 disabled:opacity-50"
                    >
                        {loading ? 'Resetting...' : 'Update Password'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
