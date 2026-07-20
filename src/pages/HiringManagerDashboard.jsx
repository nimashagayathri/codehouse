import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { evaluateCandidate } from '../api';

const API_URL = 'http://localhost:5223';

function HiringManagerDashboard() {
  const [decisions, setDecisions] = useState({});
  const [loading, setLoading] = useState({});

  const candidates = [
    { id: 1, name: "Kasun Perera", position: "Software Engineer", date: "2026-07-01", appId: 1 },
    { id: 2, name: "Saman Silva", position: "UI/UX Designer", date: "2026-07-03", appId: 2 },
    { id: 3, name: "Dilani Fernando", position: "Frontend Developer", date: "2026-07-05", appId: 3 },
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchDecisions = async () => {
      const token = localStorage.getItem('token');
      const newDecisions = {};

      for (const candidate of candidates) {
        try {
          const res = await fetch(`${API_URL}/api/evaluations/application/${candidate.appId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            if (data.decision) {
              newDecisions[candidate.id] = data.decision;
            }
          }
        } catch (err) {
          console.error('Failed to fetch evaluation for appId', candidate.appId);
        }
      }
      setDecisions(newDecisions);
    };

    fetchDecisions();
  }, []);

  const handleDecision = async (candidate, decision) => {
    setLoading({ ...loading, [candidate.id]: true });
    try {
      const data = await evaluateCandidate({
        jobApplicationId: candidate.appId,
        decision: decision,
        notes: `${decision} by Hiring Manager`,
        score: decision === 'Hired' ? 90 : 40
      });
      if (data.evaluation) {
        setDecisions({ ...decisions, [candidate.id]: decision });
        alert(`${candidate.name} - ${decision}! `);
      } else {
        alert(data.message || 'Failed!');
      }
    } catch (err) {
      alert('Connection failed!');
    }
    setLoading({ ...loading, [candidate.id]: false });
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="manager" />

      <div className="flex-1 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Hiring Manager Dashboard </h2>
          <p className="text-slate-400 mt-1">Review candidates and make hiring decisions.</p>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <p className="text-slate-500 font-medium">Shortlisted Candidates</p>
              <span className="text-2xl"></span>
            </div>
            <h3 className="text-4xl font-extrabold text-blue-700">12</h3>
            <p className="text-green-500 text-sm mt-2">↑ 4 this week</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <p className="text-slate-500 font-medium">Pending Interviews</p>
              <span className="text-2xl"></span>
            </div>
            <h3 className="text-4xl font-extrabold text-blue-700">5</h3>
            <p className="text-yellow-500 text-sm mt-2">→ Awaiting feedback</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <p className="text-slate-500 font-medium">Hired This Month</p>
              <span className="text-2xl"></span>
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
                {candidates.map((candidate) => (
                  <tr key={candidate.id} className="border-b border-slate-50">
                    <td className="py-3 text-slate-700 font-medium">{candidate.name}</td>
                    <td className="text-slate-500">{candidate.position}</td>
                    <td className="text-slate-500">{candidate.date}</td>
                    <td>
                      {decisions[candidate.id] ? (
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${decisions[candidate.id] === 'Hired'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                          }`}>
                          {decisions[candidate.id]}
                        </span>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDecision(candidate, 'Hired')}
                            disabled={loading[candidate.id]}
                            className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600 font-semibold"
                          >
                            {loading[candidate.id] ? '' : 'Hire'}
                          </button>
                          <button
                            onClick={() => handleDecision(candidate, 'Rejected')}
                            disabled={loading[candidate.id]}
                            className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 font-semibold"
                          >
                            {loading[candidate.id] ? '' : 'Reject'}
                          </button>
                        </div>
                      )}
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

export default HiringManagerDashboard;