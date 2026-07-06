import Sidebar from '../components/Sidebar';

function CandidatesList() {
  const candidates = [
    { id: 1, name: "Kasun Perera", job: "Software Engineer", skills: ["React", "Node.js", "SQL"], score: 92, status: "Shortlisted" },
    { id: 2, name: "Saman Silva", job: "UI/UX Designer", skills: ["Figma", "CSS", "Adobe XD"], score: 75, status: "Pending" },
    { id: 3, name: "Dilani Fernando", job: "Frontend Developer", skills: ["React", "JavaScript", "HTML"], score: 88, status: "Shortlisted" },
    { id: 4, name: "Nuwan Jayasinghe", job: "Backend Developer", skills: ["C#", "ASP.NET", "SQL"], score: 45, status: "Rejected" },
    { id: 5, name: "Amaya Bandara", job: "Data Analyst", skills: ["Python", "Excel", "Power BI"], score: 81, status: "Pending" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="recruiter" />

      <div className="flex-1 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Candidates List 👥</h2>
          <p className="text-slate-400 mt-1">Review and manage all applicants.</p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Search candidates..."
            className="flex-1 border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition"
          />
          <select className="w-48 border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition">
            <option value="">All Status</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
          <button className="bg-blue-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-800 transition">
            Filter
          </button>
        </div>

        {/* Candidates */}
        <div className="space-y-4">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl">
                  👤
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{candidate.name}</h3>
                  <p className="text-slate-500">{candidate.job}</p>
                  <div className="flex gap-2 mt-1">
                    {candidate.skills.map((skill) => (
                      <span key={skill} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{candidate.score}%</p>
                  <p className="text-xs text-slate-500">AI Score</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  candidate.status === "Shortlisted" ? "bg-green-100 text-green-700" :
                  candidate.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                  "bg-red-100 text-red-700"
                }`}>
                  {candidate.status}
                </span>
                <button className="bg-blue-700 text-white px-4 py-2 rounded-xl hover:bg-blue-800 text-sm font-semibold">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CandidatesList;