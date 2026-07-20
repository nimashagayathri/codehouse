import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { scheduleInterview, getMyInterviews } from '../api';

function InterviewSchedule() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    jobApplicationId: '',
    scheduledAt: '',
    mode: '',
    location: '',
    notes: ''
  });
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const data = await getMyInterviews();
        if (Array.isArray(data)) {
          setInterviews(data);
        }
      } catch (err) {
        console.error('Error fetching interviews:', err);
      }
      setLoading(false);
    };
    fetchInterviews();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateGoogleCalendarUrl = (interview) => {
    const title = encodeURIComponent(`Interview for ${interview.jobTitle} at CodeHouse`);
    const details = encodeURIComponent(`Candidate: ${interview.candidateName}\nMode: ${interview.mode}\nNotes: ${interview.notes || 'None'}`);
    const location = encodeURIComponent(interview.meetingLink || interview.location || 'TBA');

    const date = new Date(interview.scheduledAt || interview.createdAt);
    const endDate = new Date(date.getTime() + 60 * 60 * 1000); // 1 hour

    const formatGoogleDate = (d) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${formatGoogleDate(date)}/${formatGoogleDate(endDate)}`;
  };

  const generateOutlookCalendarUrl = (interview) => {
    const title = encodeURIComponent(`Interview for ${interview.jobTitle} at CodeHouse`);
    const details = encodeURIComponent(`Candidate: ${interview.candidateName}\nMode: ${interview.mode}\nNotes: ${interview.notes || 'None'}`);
    const location = encodeURIComponent(interview.meetingLink || interview.location || 'TBA');

    const date = new Date(interview.scheduledAt || interview.createdAt);
    const endDate = new Date(date.getTime() + 60 * 60 * 1000); // 1 hour

    return `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${title}&startdt=${date.toISOString().replace(/.\d{3}Z$/, 'Z')}&enddt=${endDate.toISOString().replace(/.\d{3}Z$/, 'Z')}&body=${details}&location=${location}`;
  };

  const handleSchedule = async () => {
    if (form.jobApplicationId && form.scheduledAt && form.mode) {
      try {
        const data = await scheduleInterview({
          jobApplicationId: parseInt(form.jobApplicationId),
          scheduledAt: form.scheduledAt,
          mode: form.mode,
          location: form.location,
          notes: form.notes
        });
        if (data.interview) {
          setInterviews([...interviews, data.interview]);
          setForm({ jobApplicationId: '', scheduledAt: '', mode: '', location: '', notes: '' });
          setAdded(true);
          setTimeout(() => setAdded(false), 3000);
        } else {
          alert(data.message || 'Failed to schedule!');
        }
      } catch (err) {
        alert('Connection failed!');
      }
    } else {
      alert('Please fill all required fields!');
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="recruiter" />

      <div className="flex-1 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Interview Schedule </h2>
          <p className="text-slate-400 mt-1">Schedule and manage candidate interviews.</p>
        </div>

        {added && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-2xl mb-6 font-medium">
            Interview Scheduled Successfully!
          </div>
        )}

        {/* Schedule Form */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Schedule New Interview</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-600 mb-2 text-sm font-semibold">Application ID</label>
              <input type="number" name="jobApplicationId" value={form.jobApplicationId} onChange={handleChange}
                placeholder="e.g. 1"
                className="w-full border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition" />
            </div>
            <div>
              <label className="block text-slate-600 mb-2 text-sm font-semibold">Date & Time</label>
              <input type="datetime-local" name="scheduledAt" value={form.scheduledAt} onChange={handleChange}
                className="w-full border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition" />
            </div>
            <div>
              <label className="block text-slate-600 mb-2 text-sm font-semibold">Interview Mode</label>
              <select name="mode" value={form.mode} onChange={handleChange}
                className="w-full border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition">
                <option value="">Select Mode</option>
                <option value="Online">Online</option>
                <option value="OnSite">On-site</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-600 mb-2 text-sm font-semibold">Location / Link</label>
              <input type="text" name="location" value={form.location} onChange={handleChange}
                placeholder="e.g. Google Meet / Office"
                className="w-full border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition" />
            </div>
            <div className="col-span-2">
              <label className="block text-slate-600 mb-2 text-sm font-semibold">Notes</label>
              <input type="text" name="notes" value={form.notes} onChange={handleChange}
                placeholder="e.g. Please join on time"
                className="w-full border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition" />
            </div>
          </div>
          <button onClick={handleSchedule}
            className="mt-4 bg-blue-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-800 transition">
            Schedule Interview 
          </button>
        </div>

        {/* Interviews Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-800">Upcoming Interviews</h3>
          </div>
          <div className="p-6">
            {loading ? (
              <p className="text-center text-slate-400"> Loading interviews...</p>
            ) : interviews.length === 0 ? (
              <p className="text-center text-slate-400">No interviews scheduled!</p>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-3 text-slate-400 font-medium text-sm">Candidate</th>
                    <th className="pb-3 text-slate-400 font-medium text-sm">Job</th>
                    <th className="pb-3 text-slate-400 font-medium text-sm">Date</th>
                    <th className="pb-3 text-slate-400 font-medium text-sm">Mode</th>
                    <th className="pb-3 text-slate-400 font-medium text-sm">Status</th>
                    <th className="pb-3 text-slate-400 font-medium text-sm">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {interviews.map((interview) => (
                    <tr key={interview.id} className="border-b border-slate-50">
                      <td className="py-3 text-slate-700 font-medium">{interview.candidateName}</td>
                      <td className="text-slate-500">{interview.jobTitle}</td>
                      <td className="text-slate-500">{new Date(interview.scheduledAt || interview.createdAt).toLocaleDateString()}</td>
                      <td><span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">{interview.mode}</span></td>
                      <td>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${interview.status === "Scheduled" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                          }`}>
                          {interview.status}
                        </span>
                      </td>
                      <td className="flex gap-2">
                        <a
                          href={generateGoogleCalendarUrl(interview)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-slate-100 text-slate-600 hover:bg-blue-100 hover:text-blue-700 px-3 py-1 rounded-xl text-xs font-bold transition">
                          Google
                        </a>
                        <a
                          href={generateOutlookCalendarUrl(interview)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-slate-100 text-slate-600 hover:bg-blue-100 hover:text-blue-700 px-3 py-1 rounded-xl text-xs font-bold transition">
                          Outlook
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewSchedule;