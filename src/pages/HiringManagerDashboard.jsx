import Sidebar from '../components/Sidebar';

function HiringManagerDashboard() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="manager" />

      <div className="flex-1 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Hiring Manager Dashboard 🎯</h2>
          <p className="text-slate-400 mt-1">Review candidates and make hiring decisions.</p>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <p className="text-slate-500 font-medium">Shortlisted Candidates</p>
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="text-4xl font-extrabold text-blue-700">12</h3>
            <p className="text-green-500 text-sm mt-2">↑ 4 this week</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <p className="text-slate-500 font-medium">Pending Interviews</p>
              <span className="text-2xl">📅</span>
            </div>
            <h3 className="text-4xl font-extrabold text-blue-700">5</h3>
            <p className="text-yellow-500 text-sm mt-2">→ Awaiting feedback</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <p className="text-slate-500 font-medium">Hired This Month</p>
              <span className="text-2xl">🎉</span>
            </div>
            <h3 className="text-4xl font-extrabold text-blue-700">3</h3>
            <p className="text-green-500 text-sm mt-2">↑ 1 this month</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-800">Shortlisted Candidates</h3>
          </div>
          <div className="p-6">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-3 text-slate-400 font-medium text-sm">Name</th>
                  <th className="pb-3 text-slate-400 font-medium text-sm">Position</th>
                  <th className="pb-3 text-slate-400 font-medium text-sm">Interview Date</th>
                  <th className="pb-3 text-slate-400 font-medium text-sm">Decision</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-50">
                  <td className="py-3 text-slate-700 font-medium">Kasun Perera</td>
                  <td className="text-slate-500">Software Engineer</td>
                  <td className="text-slate-500">2026-07-01</td>
                  <td className="flex gap-2 py-3">
                    <button className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600">Hire</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600">Reject</button>
                  </td>
                </tr>
                <tr className="border-b border-slate-50">
                  <td className="py-3 text-slate-700 font-medium">Saman Silva</td>
                  <td className="text-slate-500">UI/UX Designer</td>
                  <td className="text-slate-500">2026-07-03</td>
                  <td className="flex gap-2 py-3">
                    <button className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600">Hire</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600">Reject</button>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 text-slate-700 font-medium">Dilani Fernando</td>
                  <td className="text-slate-500">Frontend Developer</td>
                  <td className="text-slate-500">2026-07-05</td>
                  <td className="flex gap-2 py-3">
                    <button className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600">Hire</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600">Reject</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HiringManagerDashboard;