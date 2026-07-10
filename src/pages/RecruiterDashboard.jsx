import Sidebar from '../components/Sidebar';

function RecruiterDashboard() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="recruiter" />

      <div className="flex-1 p-4 md:p-8 pt-20 md:pt-0">
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">Recruiter Dashboard 👔</h2>
          <p className="text-sm md:text-base text-slate-400 mt-1">Manage your job postings and candidates.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm md:text-base text-slate-500 font-medium">Active Job Posts</p>
              <span className="text-xl md:text-2xl">📋</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-blue-700">8</h3>
            <p className="text-green-500 text-xs md:text-sm mt-2">↑ 3 this week</p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm md:text-base text-slate-500 font-medium">Total Applications</p>
              <span className="text-xl md:text-2xl">📨</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-blue-700">124</h3>
            <p className="text-green-500 text-xs md:text-sm mt-2">↑ 12 this week</p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm md:text-base text-slate-500 font-medium">Interviews Scheduled</p>
              <span className="text-xl md:text-2xl">📅</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-blue-700">15</h3>
            <p className="text-green-500 text-xs md:text-sm mt-2">↑ 5 this week</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
          <div className="p-4 md:p-6 border-b border-slate-100">
            <h3 className="text-lg md:text-xl font-bold text-slate-800">Recent Candidates</h3>
          </div>
          <div className="p-4 md:p-6 overflow-x-auto">
            <table className="w-full text-left text-sm md:text-base">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-3 text-slate-400 font-medium text-xs md:text-sm">Name</th>
                  <th className="pb-3 text-slate-400 font-medium text-xs md:text-sm">Job Applied</th>
                  <th className="pb-3 text-slate-400 font-medium text-xs md:text-sm">AI Score</th>
                  <th className="pb-3 text-slate-400 font-medium text-xs md:text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-50">
                  <td className="py-3 text-slate-700 font-medium">Kasun Perera</td>
                  <td className="text-slate-500">Software Engineer</td>
                  <td><span className="text-green-600 font-bold">92%</span></td>
                  <td><span className="bg-green-100 text-green-700 px-2 md:px-3 py-1 rounded-full text-xs font-semibold">Shortlisted</span></td>
                </tr>
                <tr className="border-b border-slate-50">
                  <td className="py-3 text-slate-700 font-medium">Saman Silva</td>
                  <td className="text-slate-500">UI/UX Designer</td>
                  <td><span className="text-yellow-600 font-bold">75%</span></td>
                  <td><span className="bg-yellow-100 text-yellow-700 px-2 md:px-3 py-1 rounded-full text-xs font-semibold">Pending</span></td>
                </tr>
                <tr>
                  <td className="py-3 text-slate-700 font-medium">Dilani Fernando</td>
                  <td className="text-slate-500">Frontend Developer</td>
                  <td><span className="text-red-600 font-bold">45%</span></td>
                  <td><span className="bg-red-100 text-red-700 px-2 md:px-3 py-1 rounded-full text-xs font-semibold">Rejected</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecruiterDashboard;