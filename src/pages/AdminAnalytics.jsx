import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { getAnalyticsSummary, getTopJobs, getHiringTrends } from '../api';

function AdminAnalytics() {
  const [summary, setSummary] = useState(null);
  const [hiringTrends, setHiringTrends] = useState([]);
  const [topJobs, setTopJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [summaryData, trendsData, jobsData] = await Promise.all([
          getAnalyticsSummary(),
          getHiringTrends(),
          getTopJobs()
        ]);
        setSummary(summaryData);
        setHiringTrends(trendsData);
        setTopJobs(jobsData);
      } catch (err) {
        console.error("Failed to load analytics data", err);
      }
      setLoading(false);
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar role="admin" />
        <div className="flex-1 flex justify-center items-center h-screen">
          <p className="text-slate-500 font-medium text-lg"> Loading System Analytics...</p>
        </div>
      </div>
    );
  }

  const stats = [
    { label: "Total Candidates", value: summary?.totalCandidates || 0, color: "text-blue-700", icon: "" },
    { label: "Active Jobs", value: summary?.activeJobs || 0, color: "text-green-600", icon: "" },
    { label: "Applications", value: summary?.totalApplications || 0, color: "text-purple-600", icon: "" },
    { label: "Hiring Rate", value: summary?.totalApplications > 0 ? `${Math.round((summary?.hiredApplications / summary?.totalApplications) * 100)}%` : "0%", color: "text-yellow-600", icon: "" },
  ];

  // Render recent 6 months for table
  const recentTrends = hiringTrends.slice(0, 6); // Assuming it returns up to 12 months, slice or take what we have
  const maxJobApps = topJobs.length > 0 ? Math.max(...topJobs.map(j => j.applicationsCount)) : 100;

  const processBarColors = ["bg-blue-500", "bg-purple-500", "bg-green-500", "bg-yellow-500", "bg-red-500"];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="admin" />

      <div className="flex-1 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Analytics Dashboard </h2>
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
            <h3 className="text-lg font-bold text-slate-800">Monthly Recruitment Data </h3>
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
                {recentTrends.length > 0 ? recentTrends.map((row) => (
                  <tr key={row.month} className="border-b border-slate-50">
                    <td className="py-3 text-slate-700 font-medium">{row.monthName}</td>
                    <td className="text-slate-500">{row.applicationsCount}</td>
                    <td className="text-slate-500">{row.hiredCount}</td>
                    <td>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {row.applicationsCount > 0 ? Math.round((row.hiredCount / row.applicationsCount) * 100) : 0}%
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="4" className="py-4 text-center text-slate-400">No data available for this year.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Jobs */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Top Job Categories </h3>
          <div className="space-y-4">
            {topJobs.length > 0 ? topJobs.slice(0, 5).map((item, index) => (
              <div key={item.jobPostingId}>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-600 font-medium">{item.title}</span>
                  <span className="text-slate-400 text-sm">{item.applicationsCount} applications</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3">
                  <div
                    className={`${processBarColors[index % processBarColors.length]} h-3 rounded-full`}
                    style={{ width: `${(item.applicationsCount / maxJobApps) * 100}%` }}
                  />
                </div>
              </div>
            )) : (
              <p className="text-slate-400 text-center py-4">No job applications yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAnalytics;