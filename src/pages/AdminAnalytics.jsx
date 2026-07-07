import Sidebar from '../components/Sidebar';

function AdminAnalytics() {
  const stats = [
    { label: "Total Users", value: "245", color: "text-blue-700", icon: "👥" },
    { label: "Active Jobs", value: "48", color: "text-green-600", icon: "💼" },
    { label: "Applications", value: "312", color: "text-purple-600", icon: "📨" },
    { label: "Hired", value: "28", color: "text-yellow-600", icon: "🎉" },
  ];

  const monthlyData = [
    { month: "January", applications: 50, hired: 5 },
    { month: "February", applications: 62, hired: 8 },
    { month: "March", applications: 78, hired: 10 },
    { month: "April", applications: 55, hired: 6 },
    { month: "May", applications: 90, hired: 12 },
    { month: "June", applications: 72, hired: 9 },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="admin" />

      <div className="flex-1 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Analytics Dashboard 📊</h2>
          <p className="text-slate-400 mt-1">Monitor platform performance and recruitment trends.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <p className="text-slate-500 font-medium">{stat.label}</p>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <h3 className={`text-4xl font-extrabold ${stat.color}`}>{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Monthly Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 mb-6">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-800">Monthly Recruitment Data 📅</h3>
          </div>
          <div className="p-6">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-3 text-slate-400 font-medium text-sm">Month</th>
                  <th className="pb-3 text-slate-400 font-medium text-sm">Applications</th>
                  <th className="pb-3 text-slate-400 font-medium text-sm">Hired</th>
                  <th className="pb-3 text-slate-400 font-medium text-sm">Success Rate</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((row) => (
                  <tr key={row.month} className="border-b border-slate-50">
                    <td className="py-3 text-slate-700 font-medium">{row.month}</td>
                    <td className="text-slate-500">{row.applications}</td>
                    <td className="text-slate-500">{row.hired}</td>
                    <td>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {Math.round((row.hired / row.applications) * 100)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Jobs */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Top Job Categories 🏆</h3>
          <div className="space-y-4">
            {[
              { job: "Software Engineer", count: 85, color: "bg-blue-500" },
              { job: "Frontend Developer", count: 71, color: "bg-purple-500" },
              { job: "UI/UX Designer", count: 62, color: "bg-green-500" },
              { job: "Data Analyst", count: 48, color: "bg-yellow-500" },
            ].map((item) => (
              <div key={item.job}>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-600 font-medium">{item.job}</span>
                  <span className="text-slate-400 text-sm">{item.count} applications</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3">
                  <div
                    className={`${item.color} h-3 rounded-full`}
                    style={{ width: `${(item.count / 85) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAnalytics;