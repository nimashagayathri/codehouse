import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { getJobs, applyJob } from '../api';

function JobSearch() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [applied, setApplied] = useState(() => {
  const saved = localStorage.getItem('appliedJobs');
  return saved ? JSON.parse(saved) : [];
});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        if (Array.isArray(data)) {
          setJobs(data);
        }
      } catch (err) {
        console.error('Error fetching jobs:', err);
      }
      setLoading(false);
    };
    fetchJobs();
  }, []);

  const handleApply = async (jobId) => {
    if (!applied.includes(jobId)) {
      try {
        await applyJob(jobId);
        setApplied([...applied, jobId]);
        localStorage.setItem('appliedJobs', JSON.stringify([...applied, jobId]));
        alert('Application Submitted! ✅');
      } catch (err) {
        alert('Failed to apply!');
      }
    }
  };

  const filteredJobs = jobs.filter((job) =>
    job.title?.toLowerCase().includes(search.toLowerCase()) ||
    job.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="jobseeker" />

      <div className="flex-1 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Find Jobs 🔍</h2>
          <p className="text-slate-400 mt-1">Discover job opportunities for you.</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Job title or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition"
          />
          <button className="bg-blue-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-800 transition">
            Search
          </button>
        </div>

        {/* Job Cards */}
        {loading ? (
          <div className="text-center text-slate-400 py-12">⏳ Loading jobs...</div>
        ) : filteredJobs.length === 0 ? (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center text-slate-400">
            No jobs found!
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{job.title}</h3>
                  <p className="text-slate-500 mt-1">{job.recruiterName} • {job.location}</p>
                  <div className="flex gap-2 mt-3">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">{job.employmentType || 'Full Time'}</span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">LKR {job.salary?.toLocaleString()}</span>
                    {job.requiredSkills && (
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">🛠️ {job.requiredSkills}</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleApply(job.id)}
                  className={`px-6 py-2 rounded-xl font-bold text-white transition duration-300 ${
                    applied.includes(job.id)
                      ? 'bg-slate-400 cursor-not-allowed'
                      : 'bg-blue-700 hover:bg-blue-800'
                  }`}
                >
                  {applied.includes(job.id) ? 'Applied ✅' : 'Apply Now'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default JobSearch;