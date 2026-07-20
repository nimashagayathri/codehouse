import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { getMyApplications } from '../api';

function MyApplications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const data = await getMyApplications();
                if (Array.isArray(data)) {
                    setApplications(data);
                }
            } catch (err) {
                console.error('Failed to load applications', err);
            }
            setLoading(false);
        };

        fetchApplications();
    }, []);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Shortlisted':
            case 'Recommended':
                return <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-lg text-sm">Shortlisted &bull; Interview Pending</span>;
            case 'Hired':
            case 'Accepted':
                return <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-lg text-sm">Offered / Hired </span>;
            case 'Rejected':
                return <span className="bg-red-100 text-red-700 font-bold px-3 py-1 rounded-lg text-sm">Not Selected</span>;
            default:
                return <span className="bg-yellow-100 text-yellow-700 font-bold px-3 py-1 rounded-lg text-sm">Pending Review</span>;
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar role="jobseeker" />

            <div className="flex-1 p-8">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-800">My Applications </h2>
                    <p className="text-slate-400 mt-1">Track the status of your submitted job applications.</p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-48">
                        <p className="text-slate-500 font-medium"> Loading applications...</p>
                    </div>
                ) : applications.length === 0 ? (
                    <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-200 text-center">
                        <p className="text-slate-500">You haven't applied to any jobs yet. Visit 'Find Jobs' to start applying!</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {applications.map((app) => (
                            <div key={app.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center transition hover:shadow-md">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-slate-800">{app.jobTitle || 'Unknown Job'}</h3>
                                    <div className="mt-2 text-slate-500 text-sm">
                                        Applied on: <span className="font-semibold">{new Date(app.appliedAt).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <div className="mx-6 text-center">
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 h-16 w-20 rounded-2xl flex flex-col items-center justify-center shadow-sm">
                                        <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-black text-xl">
                                            {Math.round(app.aiMatchScore)}%
                                        </p>
                                        <p className="text-[9px] uppercase font-bold text-slate-400 mt-1">Match</p>
                                    </div>
                                </div>

                                <div className="w-48 text-right flex flex-col gap-2 items-end border-l border-slate-100 pl-6">
                                    <p className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-1">Status</p>
                                    {getStatusBadge(app.status)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyApplications;
