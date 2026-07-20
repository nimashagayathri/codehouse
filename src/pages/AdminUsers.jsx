import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { getAllUsers, updateUserStatus, updateUserRole } from '../api';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchUsers();
  }, [roleFilter]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers(roleFilter);
      if (Array.isArray(data)) {
        setUsers(data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await updateUserStatus(id, newStatus);
      setUsers(users.map((user) =>
        user.id === id ? { ...user, isActive: newStatus } : user
      ));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const toggleRole = async (id, newRole) => {
    try {
      const res = await updateUserRole(id, newRole);
      if (res.message) {
        setUsers(users.map((user) =>
          user.id === id ? { ...user, role: newRole } : user
        ));
      }
    } catch (err) {
      alert('Failed to update role');
    }
  };

  const filteredUsers = users.filter((user) => {
    const nameMatch = user?.fullName?.toLowerCase()?.includes(searchTerm.toLowerCase()) || false;
    const emailMatch = user?.email?.toLowerCase()?.includes(searchTerm.toLowerCase()) || false;
    return nameMatch || emailMatch;
  });

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="admin" />

      <div className="flex-1 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">User Management </h2>
          <p className="text-slate-400 mt-1">Manage all platform users.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-100 flex gap-4">
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition"
            />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-48 border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition"
            >
              <option value="">All Roles</option>
              <option value="Candidate">Job Seeker</option>
              <option value="Recruiter">Recruiter</option>
              <option value="HiringManager">Hiring Manager</option>
            </select>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center py-10 text-slate-500 font-medium"> Loading users...</div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-10 text-slate-500 font-medium">No users found.</div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-3 text-slate-400 font-medium text-sm">Name</th>
                    <th className="pb-3 text-slate-400 font-medium text-sm">Email</th>
                    <th className="pb-3 text-slate-400 font-medium text-sm">Role</th>
                    <th className="pb-3 text-slate-400 font-medium text-sm">Status</th>
                    <th className="pb-3 text-slate-400 font-medium text-sm">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user?.id || Math.random()} className="border-b border-slate-50 hover:bg-slate-50 transition">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                            {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800">{user?.fullName || 'Unknown User'}</p>
                            <p className="text-xs text-slate-400">ID: {String(user?.id || 'N/A').substring(0, 8)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="text-slate-500 font-medium">{user?.email || 'No Email'}</td>
                      <td>
                        <select
                          value={user?.role || ''}
                          onChange={(e) => toggleRole(user?.id, e.target.value)}
                          className="px-3 py-1 bg-slate-100 text-slate-800 border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:border-blue-500"
                        >
                          <option value="Candidate">Candidate</option>
                          <option value="Recruiter">Recruiter</option>
                          <option value="HiringManager">Hiring Manager</option>
                          <option value="Admin">Admin</option>
                        </select>
                      </td>
                      <td>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user?.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {user?.isActive ? 'Active' : 'Disabled'}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => toggleStatus(user?.id, user?.isActive)}
                          className={`text-white px-4 py-1.5 rounded-lg text-sm font-semibold shadow-sm transition ${user?.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                        >
                          {user?.isActive ? 'Disable Access' : 'Enable Access'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;