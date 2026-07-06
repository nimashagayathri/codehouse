import { useState } from 'react';
import Sidebar from '../components/Sidebar';

function JobSearch() {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [applied, setApplied] = useState([]);

  const allJobs = [
    { id: 1, title: "Software Engineer", company: "Google", location: "Colombo", type: "Full Time", salary: "LKR 150,000", match: "95%" },
    { id: 2, title: "Frontend Developer", company: "Microsoft", location: "Remote", type: "Full Time", salary: "LKR 120,000", match: "88%" },
    { id: 3, title: "UI/UX Designer", company: "Facebook", location: "Kandy", type: "Part Time", salary: "LKR 80,000", match: "76%" },
    { id: 4, title: "Data Analyst", company: "Amazon", location: "Colombo", type: "Full Time", salary: "LKR 130,000", match: "82%" },
    { id: 5, title: "Backend Developer", company: "Apple", location: "Remote", type: "Contract", salary: "LKR 160,000", match: "91%" },
  ];

  const [jobs, setJobs] = useState(allJobs);

  const handleSearch = () => {
    const filtered = allJobs.filter((job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) &&
      job.location.toLowerCase().includes(location.toLowerCase())
    );
    setJobs(filtered);
  };

  const handleApply = (id) => {
    if (!applied.includes(id)) {
      setApplied([...applied, id]);
      alert('Application Submitted! ✅');
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="jobseeker" />

      <div className="flex-1 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Find Jobs 🔍</h2>
          <p className="text-slate-400 mt-1">Discover AI-matched job opportunities for you.</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Job title or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition"
          />
          <input
            type="text"
            placeholder="Location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-48 border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-800 transition"
          >
            Search
          </button>
        </div>

        {/* Job Cards */}
        <div className="space-y-4">
          {jobs.length === 0 ? (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center text-slate-400">
              No jobs found! Try different keywords.
            </div>
          ) : (
            jobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{job.title}</h3>
                  <p className="text-slate-500 mt-1">{job.company} • {job.location}</p>
                  <div className="flex gap-2 mt-3">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">{job.type}</span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">{job.salary}</span>
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">🤖 AI Match: {job.match}</span>
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default JobSearch;