import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { getAllUsers, updateUserStatus } from '../api';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

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
      // Update local state instead of refetching to be snappy
      setUsers(users.map((user) =>
        user.id === id ? { ...user, isActive: newStatus } : user
      ));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                    <tr key={user.id} className="border-b border-slate-50">
                      <td className="py-3 text-slate-700 font-medium">{user.fullName}</td>
                      <td className="text-slate-500">{user.email}</td>
                      <td className="text-slate-500 font-medium">{user.role}</td>
                      <td>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                          }`}>
                          {user.isActive ? "Active" : "Disabled"}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => toggleStatus(user.id, user.isActive)}
                          className={`px-3 py-1 rounded-xl text-sm text-white font-semibold ${user.isActive
                              ? "bg-red-500 hover:bg-red-600"
                              : "bg-green-500 hover:bg-green-600"
                            }`}
                        >
                          {user.isActive ? "Disable" : "Enable"}
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