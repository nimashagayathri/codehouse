import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { getAllCandidates } from '../api';

function CandidatesList() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await getAllCandidates();
        if (Array.isArray(data)) {
          setCandidates(data);
        }
      } catch (err) {
        console.error('Error fetching candidates:', err);
      }
      setLoading(false);
    };
    fetchCandidates();
  }, []);

  const filtered = candidates.filter((c) =>
    c.fullName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="recruiter" />

      <div className="flex-1 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Candidates List </h2>
          <p className="text-slate-400 mt-1">Review and manage all applicants.</p>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Search candidates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        {loading ? (
          <div className="text-center text-slate-400 py-12"> Loading candidates...</div>
        ) : filtered.length === 0 ? (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center text-slate-400">
            No candidates found!
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((candidate) => (
              <div key={candidate.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl">
                    
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">{candidate.fullName}</h3>
                    <p className="text-slate-500">{candidate.email}</p>
                    <p className="text-slate-400 text-sm">{candidate.location}</p>
                    <div className="flex gap-2 mt-1 flex-wrap">
                      {candidate.skills?.split(', ').map((skill) => (
                        <span key={skill} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                    Active
                  </span>
                  <button className="bg-blue-700 text-white px-4 py-2 rounded-xl hover:bg-blue-800 text-sm font-semibold">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CandidatesList;