import Sidebar from '../components/Sidebar';

function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="admin" />

      <div className="flex-1 p-4 md:p-8 pt-20 md:pt-0">
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">Admin Dashboard ⚙️</h2>
          <p className="text-sm md:text-base text-slate-400 mt-1">Monitor and manage the entire platform.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm md:text-base text-slate-500 font-medium">Total Users</p>
              <span className="text-xl md:text-2xl">👥</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-blue-700">245</h3>
            <p className="text-green-500 text-xs md:text-sm mt-2">↑ 12 this week</p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm md:text-base text-slate-500 font-medium">Active Jobs</p>
              <span className="text-xl md:text-2xl">💼</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-blue-700">48</h3>
            <p className="text-green-500 text-xs md:text-sm mt-2">↑ 5 this week</p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm md:text-base text-slate-500 font-medium">Applications</p>
              <span className="text-xl md:text-2xl">📨</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-blue-700">312</h3>
            <p className="text-green-500 text-xs md:text-sm mt-2">↑ 28 this week</p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm md:text-base text-slate-500 font-medium">Hired</p>
              <span className="text-xl md:text-2xl">🎉</span>
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
                <tr className="border-b border-slate-50">
                  <td className="py-3 text-slate-700 font-medium">Kasun Perera</td>
                  <td className="text-slate-500">kasun@gmail.com</td>
                  <td className="text-slate-500">Job Seeker</td>
                  <td><span className="bg-green-100 text-green-700 px-2 md:px-3 py-1 rounded-full text-xs font-semibold">Active</span></td>
                  <td><button className="bg-red-500 text-white px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm hover:bg-red-600">Disable</button></td>
                </tr>
                <tr className="border-b border-slate-50">
                  <td className="py-3 text-slate-700 font-medium">Saman Silva</td>
                  <td className="text-slate-500">saman@gmail.com</td>
                  <td className="text-slate-500">Recruiter</td>
                  <td><span className="bg-green-100 text-green-700 px-2 md:px-3 py-1 rounded-full text-xs font-semibold">Active</span></td>
                  <td><button className="bg-red-500 text-white px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm hover:bg-red-600">Disable</button></td>
                </tr>
                <tr>
                  <td className="py-3 text-slate-700 font-medium">Dilani Fernando</td>
                  <td className="text-slate-500">dilani@gmail.com</td>
                  <td className="text-slate-500">Hiring Manager</td>
                  <td><span className="bg-red-100 text-red-700 px-2 md:px-3 py-1 rounded-full text-xs font-semibold">Disabled</span></td>
                  <td><button className="bg-green-500 text-white px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm hover:bg-green-600">Enable</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;