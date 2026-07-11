import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

const API_URL = 'http://localhost:5223';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL + '/api/admin/users', {
        headers: { Authorization: 'Bearer ' + token }
      });
      const data = await response.json();
      if (Array.isArray(data)) setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleUserStatus = async (id, isActive) => {
    try {
      await fetch(API_URL + '/api/admin/users/' + id + '/status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({ isActive: !isActive })
      });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="admin" />

      <div className="flex-1 p-4 md:p-8 pt-20 md:pt-0">
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">Admin Dashboard ️</h2>
          <p className="text-sm md:text-base text-slate-400 mt-1">Monitor and manage the entire platform.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm md:text-base text-slate-500 font-medium">Total Users</p>
              <span className="text-xl md:text-2xl"></span>
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-blue-700">{users.length > 0 ? users.length : '-'}</h3>
            <p className="text-green-500 text-xs md:text-sm mt-2">↑ 12 this week</p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm md:text-base text-slate-500 font-medium">Active Jobs</p>
              <span className="text-xl md:text-2xl"></span>
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-blue-700">48</h3>
            <p className="text-green-500 text-xs md:text-sm mt-2">↑ 5 this week</p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm md:text-base text-slate-500 font-medium">Applications</p>
              <span className="text-xl md:text-2xl"></span>
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-blue-700">312</h3>
            <p className="text-green-500 text-xs md:text-sm mt-2">↑ 28 this week</p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm md:text-base text-slate-500 font-medium">Hired</p>
              <span className="text-xl md:text-2xl"></span>
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-blue-700">28</h3>
            <p className="text-green-500 text-xs md:text-sm mt-2">↑ 3 this week</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
          <div className="p-4 md:p-6 border-b border-slate-100">
            <h3 className="text-lg md:text-xl font-bold text-slate-800">User Management</h3>
          </div>
          <div className="p-4 md:p-6 overflow-x-auto">
            <table className="w-full text-left text-sm md:text-base">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-3 text-slate-400 font-medium text-xs md:text-sm">Name</th>
                  <th className="pb-3 text-slate-400 font-medium text-xs md:text-sm">Email</th>
                  <th className="pb-3 text-slate-400 font-medium text-xs md:text-sm">Role</th>
                  <th className="pb-3 text-slate-400 font-medium text-xs md:text-sm">Status</th>
                  <th className="pb-3 text-slate-400 font-medium text-xs md:text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user?.id || Math.random()} className="border-b border-slate-50">
                    <td className="py-3 text-slate-700 font-medium">{user?.fullName || '-'}</td>
                    <td className="text-slate-500">{user?.email || 'N/A'}</td>
                    <td className="text-slate-500">{user?.role || 'N/A'}</td>
                    <td>
                      <span className={"px-2 md:px-3 py-1 rounded-full text-xs font-semibold " + (user?.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700')}>
                        {user?.isActive ? 'Active' : 'Disabled'}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => toggleUserStatus(user?.id, user?.isActive)}
                        className={"text-white px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm " + (user?.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600')}>
                        {user?.isActive ? 'Disable' : 'Enable'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
