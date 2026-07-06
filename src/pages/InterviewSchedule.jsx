import { useState } from 'react';
import Sidebar from '../components/Sidebar';

function InterviewSchedule() {
  const [interviews, setInterviews] = useState([
    { id: 1, candidate: "Kasun Perera", job: "Software Engineer", date: "2026-07-01", time: "10:00 AM", type: "Online", status: "Confirmed" },
    { id: 2, candidate: "Saman Silva", job: "UI/UX Designer", date: "2026-07-03", time: "02:00 PM", type: "On-site", status: "Pending" },
    { id: 3, candidate: "Dilani Fernando", job: "Frontend Developer", date: "2026-07-05", time: "11:00 AM", type: "Online", status: "Confirmed" },
  ]);

  const [form, setForm] = useState({ candidate: '', job: '', date: '', time: '', type: '' });
  const [added, setAdded] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSchedule = () => {
    if (form.candidate && form.job && form.date && form.time && form.type) {
      setInterviews([...interviews, { id: interviews.length + 1, ...form, status: "Pending" }]);
      setForm({ candidate: '', job: '', date: '', time: '', type: '' });
      setAdded(true);
      setTimeout(() => setAdded(false), 3000);
    } else {
      alert('Please fill all fields!');
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="recruiter" />

      <div className="flex-1 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Interview Schedule 📅</h2>
          <p className="text-slate-400 mt-1">Schedule and manage candidate interviews.</p>
        </div>

        {added && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-2xl mb-6 font-medium">
            ✅ Interview Scheduled Successfully!
          </div>
        )}

        {/* Schedule Form */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Schedule New Interview</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-600 mb-2 text-sm font-semibold">Candidate Name</label>
              <input type="text" name="candidate" value={form.candidate} onChange={handleChange}
                placeholder="e.g. Kasun Perera"
                className="w-full border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition"/>
            </div>
            <div>
              <label className="block text-slate-600 mb-2 text-sm font-semibold">Job Position</label>
              <input type="text" name="job" value={form.job} onChange={handleChange}
                placeholder="e.g. Software Engineer"
                className="w-full border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition"/>
            </div>
            <div>
              <label className="block text-slate-600 mb-2 text-sm font-semibold">Date</label>
              <input type="date" name="date" value={form.date} onChange={handleChange}
                className="w-full border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition"/>
            </div>
            <div>
              <label className="block text-slate-600 mb-2 text-sm font-semibold">Time</label>
              <input type="time" name="time" value={form.time} onChange={handleChange}
                className="w-full border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition"/>
            </div>
            <div>
              <label className="block text-slate-600 mb-2 text-sm font-semibold">Interview Type</label>
              <select name="type" value={form.type} onChange={handleChange}
                className="w-full border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition">
                <option value="">Select Type</option>
                <option value="Online">Online</option>
                <option value="On-site">On-site</option>
              </select>
            </div>
          </div>
          <button onClick={handleSchedule}
            className="mt-4 bg-blue-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-800 transition">
            Schedule Interview →
          </button>
        </div>

        {/* Interviews Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-800">Upcoming Interviews</h3>
          </div>
          <div className="p-6">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-3 text-slate-400 font-medium text-sm">Candidate</th>
                  <th className="pb-3 text-slate-400 font-medium text-sm">Job</th>
                  <th className="pb-3 text-slate-400 font-medium text-sm">Date</th>
                  <th className="pb-3 text-slate-400 font-medium text-sm">Time</th>
                  <th className="pb-3 text-slate-400 font-medium text-sm">Type</th>
                  <th className="pb-3 text-slate-400 font-medium text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {interviews.map((interview) => (
                  <tr key={interview.id} className="border-b border-slate-50">
                    <td className="py-3 text-slate-700 font-medium">{interview.candidate}</td>
                    <td className="text-slate-500">{interview.job}</td>
                    <td className="text-slate-500">{interview.date}</td>
                    <td className="text-slate-500">{interview.time}</td>
                    <td><span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">{interview.type}</span></td>
                    <td>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        interview.status === "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {interview.status}
                      </span>
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

export default InterviewSchedule;