import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { getMyInterviews } from '../api';

function MyInterviews() {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);

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

    const generateGoogleCalendarUrl = (interview) => {
        const title = encodeURIComponent(`Interview for ${interview.jobTitle} at CodeHouse`);
        const details = encodeURIComponent(`Candidate: ${interview.candidateName}\nMode: ${interview.mode}\nNotes: ${interview.notes || 'None'}`);
        const location = encodeURIComponent(interview.meetingLink || interview.location || 'TBA');

        // Format dates to YYYYMMDDTHHMMSSZ (UTC)
        const date = new Date(interview.scheduledAt || interview.createdAt);
        const endDate = new Date(date.getTime() + 60 * 60 * 1000); // 1 hour duration

        const formatGoogleDate = (d) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");

        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${formatGoogleDate(date)}/${formatGoogleDate(endDate)}`;
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar role="jobseeker" />

            <div className="flex-1 p-8">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-800">My Interviews </h2>
                    <p className="text-slate-400 mt-1">View your scheduled interviews and add them to your calendar.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
                    <div className="p-6 border-b border-slate-100">
                        <h3 className="text-lg font-bold text-slate-800">Upcoming Interviews</h3>
                    </div>
                    <div className="p-6">
                        {loading ? (
                            <p className="text-center text-slate-400 py-8 font-medium"> Loading your interviews...</p>
                        ) : interviews.length === 0 ? (
                            <div className="text-center py-12">
                                <span className="text-4xl mb-4 block">️</span>
                                <p className="text-slate-500 font-medium text-lg">No interviews scheduled yet.</p>
                                <p className="text-slate-400 text-sm mt-1">Keep applying to jobs to get noticed!</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {interviews.map((interview) => (
                                    <div key={interview.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 transition hover:shadow-md">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="font-bold text-lg text-slate-800">{interview.jobTitle}</h4>
                                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 ${interview.status === "Scheduled" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                                                    }`}>
                                                    {interview.status}
                                                </span>
                                            </div>
                                            <span className="bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-full text-xs">
                                                {interview.mode}
                                            </span>
                                        </div>

                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-center text-slate-600 text-sm">
                                                <span className="mr-3"></span>
                                                {new Date(interview.scheduledAt || interview.createdAt).toLocaleString()}
                                            </div>
                                            <div className="flex items-center text-slate-600 text-sm">
                                                <span className="mr-3"></span>
                                                <span className="truncate" title={interview.meetingLink || interview.location}>{interview.meetingLink || interview.location || 'TBA'}</span>
                                            </div>
                                            <div className="flex items-center text-slate-600 text-sm">
                                                <span className="mr-3"></span>
                                                Interviewer: {interview.scheduledByName}
                                            </div>
                                        </div>

                                        <a
                                            href={generateGoogleCalendarUrl(interview)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-bold transition duration-200 text-sm"
                                        >
                                            Add to Google Calendar
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyInterviews;
