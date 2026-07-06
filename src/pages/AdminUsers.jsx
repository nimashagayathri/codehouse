import { useState } from 'react';
import Sidebar from '../components/Sidebar';

function AdminUsers() {
  const [users, setUsers] = useState([
    { id: 1, name: "Kasun Perera", email: "kasun@gmail.com", role: "Job Seeker", status: "Active" },
    { id: 2, name: "Saman Silva", email: "saman@gmail.com", role: "Recruiter", status: "Active" },
    { id: 3, name: "Dilani Fernando", email: "dilani@gmail.com", role: "Hiring Manager", status: "Disabled" },
    { id: 4, name: "Nuwan Jayasinghe", email: "nuwan@gmail.com", role: "Job Seeker", status: "Active" },
    { id: 5, name: "Amaya Bandara", email: "amaya@gmail.com", role: "Recruiter", status: "Active" },
  ]);

  const toggleStatus = (id) => {
    setUsers(users.map((user) =>
      user.id === id
        ? { ...user, status: user.status === "Active" ? "Disabled" : "Active" }
        : user
    ));
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="admin" />

      <div className="flex-1 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">User Management 👥</h2>
          <p className="text-slate-400 mt-1">Manage all platform users.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-100 flex gap-4">
            <input
              type="text"
              placeholder="Search users..."
              className="flex-1 border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition"
            />
            <select className="w-48 border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition">
              <option value="">All Roles</option>
              <option value="jobseeker">Job Seeker</option>
              <option value="recruiter">Recruiter</option>
              <option value="hiring_manager">Hiring Manager</option>
            </select>
          </div>

          <div className="p-6">
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
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-slate-50">
                    <td className="py-3 text-slate-700 font-medium">{user.name}</td>
                    <td className="text-slate-500">{user.email}</td>
                    <td className="text-slate-500">{user.role}</td>
                    <td>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => toggleStatus(user.id)}
                        className={`px-3 py-1 rounded-xl text-sm text-white font-semibold ${
                          user.status === "Active"
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                      >
                        {user.status === "Active" ? "Disable" : "Enable"}
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

export default AdminUsers;