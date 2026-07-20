import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { getJobRecommendations } from '../api';

function Recommendations() {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const data = await getJobRecommendations();
                if (Array.isArray(data)) {
                    setRecommendations(data);
                }
            } catch (err) {
                console.error('Failed to load recommendations', err);
            }
            setLoading(false);
        };

        fetchRecommendations();
    }, []);

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar role="jobseeker" />

            <div className="flex-1 p-8">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-800">AI Job Recommendations </h2>
                    <p className="text-slate-400 mt-1">Jobs curated specifically for you based on your unique skills and experience.</p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-48">
                        <p className="text-slate-500 font-medium"> Analyzing your profile...</p>
                    </div>
                ) : recommendations.length === 0 ? (
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
                        <p className="text-slate-500">No recommendations found. Make sure your profile has skills listed!</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {recommendations.map((job) => (
                            <div key={job.jobPostingId} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800">{job.title}</h3>
                                        <p className="text-slate-500 text-sm mt-1">{job.location} • {job.employmentType}</p>
                                    </div>
                                    <div className="bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-xl text-center">
                                        <p className="text-indigo-700 font-extrabold text-xl">{job.matchScore}%</p>
                                        <p className="text-indigo-400 text-xs font-semibold">Match Score</p>
                                    </div>
                                </div>
                                <p className="text-slate-600 mb-4 text-sm">{job.description}</p>

                                <div className="mb-4">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Required Skills</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {job.requiredSkills.split(',').map((skill, index) => (
                                            <span key={index} className="bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-xs font-medium">
                                                {skill.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-sm mb-4 border border-blue-100">
                                    <span className="font-bold mr-2"> AI Insight:</span>
                                    {job.recommendationReason}
                                </div>

                                <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100">
                                    <p className="text-slate-500 text-sm">Recruiter: <span className="font-medium text-slate-700">{job.recruiterName}</span></p>
                                    <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-bold hover:bg-blue-700 transition">
                                        View Details
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

export default Recommendations;
