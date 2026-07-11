import Sidebar from '../components/Sidebar';

function JobSeekerDashboard() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="jobseeker" />

      <div className="flex-1 p-4 md:p-8 pt-20 md:pt-0">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">Welcome, Nimasha! </h2>
          <p className="text-sm md:text-base text-slate-400 mt-1">Here's what's happening with your job search today.</p>
        </div>

        {/* Stats - Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm md:text-base text-slate-500 font-medium">Applications Sent</p>
              <span className="text-xl md:text-2xl"></span>
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-blue-700">5</h3>
            <p className="text-green-500 text-xs md:text-sm mt-2">↑ 2 this week</p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm md:text-base text-slate-500 font-medium">Interviews Scheduled</p>
              <span className="text-xl md:text-2xl"></span>
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-blue-700">2</h3>
            <p className="text-green-500 text-xs md:text-sm mt-2">↑ 1 this week</p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm md:text-base text-slate-500 font-medium">AI Job Matches</p>
              <span className="text-xl md:text-2xl"></span>
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-blue-700">3</h3>
            <p className="text-blue-500 text-xs md:text-sm mt-2">Based on your profile</p>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
          <div className="p-4 md:p-6 border-b border-slate-100">
            <h3 className="text-lg md:text-xl font-bold text-slate-800">Recent Applications</h3>
          </div>
          <div className="p-4 md:p-6 overflow-x-auto">
            <table className="w-full text-left text-sm md:text-base">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-3 text-slate-400 font-medium text-xs md:text-sm">Job Title</th>
                  <th className="pb-3 text-slate-400 font-medium text-xs md:text-sm">Company</th>
                  <th className="pb-3 text-slate-400 font-medium text-xs md:text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-50">
                  <td className="py-3 text-slate-700 font-medium">Software Engineer</td>
                  <td className="text-slate-500">Google</td>
                  <td><span className="bg-yellow-100 text-yellow-700 px-2 md:px-3 py-1 rounded-full text-xs font-semibold">Pending</span></td>
                </tr>
                <tr className="border-b border-slate-50">
                  <td className="py-3 text-slate-700 font-medium">Frontend Developer</td>
                  <td className="text-slate-500">Microsoft</td>
                  <td><span className="bg-blue-100 text-blue-700 px-2 md:px-3 py-1 rounded-full text-xs font-semibold">Interview</span></td>
                </tr>
                <tr>
                  <td className="py-3 text-slate-700 font-medium">UI/UX Designer</td>
                  <td className="text-slate-500">Facebook</td>
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

export default JobSeekerDashboard;