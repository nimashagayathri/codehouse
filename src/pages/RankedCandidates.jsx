import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { getJobs, getRankedApplications, evaluateCandidate } from '../api';

function RankedCandidates() {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [decisions, setDecisions] = useState({});
    const [actionLoading, setActionLoading] = useState({});

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const jobsData = await getJobs();
                if (Array.isArray(jobsData)) {
                    setJobs(jobsData);
                    if (jobsData.length > 0) {
                        handleSelectJob(jobsData[0].id);
                    }
                }
            } catch (err) {
                console.error('Failed to load jobs', err);
            }
            setLoading(false);
        };

        fetchJobs();
    }, []);

    const handleSelectJob = async (jobId) => {
        setSelectedJob(jobId);
        setLoading(true);
        setCandidates([]);
        try {
            const data = await getRankedApplications(jobId);
            if (Array.isArray(data)) {
                setCandidates(data);

                let initialDecisions = {};
                data.forEach(c => {
                    if (c.status === 'Hired') initialDecisions[c.candidateProfileId] = 'Hired';
                    else if (c.status === 'Shortlisted') initialDecisions[c.candidateProfileId] = 'Recommended';
                    else if (c.status === 'Rejected') initialDecisions[c.candidateProfileId] = 'Rejected';
                });
                setDecisions(initialDecisions);
            }
        } catch (err) {
            console.error('Failed to load ranked candidates', err);
        }
        setLoading(false);
    };

    const handleDecision = async (applicationId, candidateId, decision) => {
        // Find candidate to check their score
        const candidateInfo = candidates.find(c => c.candidateProfileId === candidateId);
        if (decision === 'Hired' && candidateInfo && candidateInfo.aiMatchScore < 50) {
            alert('Cannot hire! Candidate must have at least 50% AI Match Score.');
            return;
        }

        setActionLoading({ ...actionLoading, [candidateId]: true });
        try {
            const data = await evaluateCandidate({
                jobApplicationId: applicationId,
                decision: decision,
                feedback: `${decision} via AI Ranking Dashboard`,
                technicalScore: decision === 'Hired' ? 9 : 7,
                communicationScore: decision === 'Hired' ? 9 : 7,
                experienceScore: decision === 'Hired' ? 9 : 7
            });
            if (data.evaluation) {
                setDecisions({ ...decisions, [candidateId]: decision });
                alert(`${decision} successful! `);
            } else {
                alert(data.message || 'Action failed!');
            }
        } catch (err) {
            alert('Connection failed!');
        }
        setActionLoading({ ...actionLoading, [candidateId]: false });
    };

    const [aiQuestions, setAiQuestions] = useState({});
    const [qLoading, setQLoading] = useState({});

    const handleGenerateQuestions = async (candidateId, skills, jobTitle) => {
        const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY;
        if (!GROQ_API_KEY) {
            alert('Groq API Key is missing.');
            return;
        }

        setQLoading({ ...qLoading, [candidateId]: true });
        try {
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + GROQ_API_KEY
                },
                body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    messages: [{
                        role: 'user',
                        content: `You are an expert technical interviewer. The candidate is applying for the "${jobTitle}" role and has these skills: ${skills}. Generate exactly 3 technical interview questions specifically tailored to these skills. Format as a pure JSON array of strings. Do not include markdown formatting or markdown backticks, just the raw valid JSON array. For example: ["Question 1?", "Question 2?", "Question 3?"]`
                    }],
                    temperature: 0.3
                })
            });
            const data = await response.json();
            let rawText = data.choices[0].message.content;

            // Clean up if it returned markdown
            if (rawText.startsWith('```json')) {
                rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
            } else if (rawText.startsWith('```')) {
                rawText = rawText.replace(/```/g, '').trim();
            }

            const questions = JSON.parse(rawText);
            setAiQuestions({ ...aiQuestions, [candidateId]: questions });
        } catch (err) {
            console.error(err);
            alert('Failed to generate questions.');
        }
        setQLoading({ ...qLoading, [candidateId]: false });
    };

    const role = window.location.pathname.includes('manager') ? 'manager' : 'recruiter';

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar role={role} />

            <div className="flex-1 p-8">
                <div className="mb-8 flex justify-between items-end">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">AI Candidate Ranking </h2>
                        <p className="text-slate-400 mt-1">Review candidates ranked by AI matching score.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-500 mb-2">Select Job Posting</label>
                        <select
                            className="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 shadow-sm"
                            value={selectedJob || ''}
                            onChange={(e) => handleSelectJob(e.target.value)}
                        >
                            {jobs.map(job => (
                                <option key={job.id} value={job.id}>{job.title} (#{job.id})</option>
                            ))}
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-48">
                        <p className="text-slate-500 font-medium"> Fetching AI Rankings...</p>
                    </div>
                ) : candidates.length === 0 ? (
                    <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-200 text-center">
                        <p className="text-slate-500">No applications found for this job yet.</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {candidates.map((candidate, index) => (
                            <div key={candidate.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 transition hover:shadow-md">
                                <div className="flex items-center">
                                    {/* Ranking Position */}
                                    <div className="flex-shrink-0 w-16 text-center border-r border-slate-100 pr-4 mr-6">
                                        <p className="text-3xl font-black text-slate-300">#{index + 1}</p>
                                    </div>

                                    {/* Candidate Info */}
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-slate-800">{candidate.candidateName}</h3>
                                        <p className="text-slate-500 text-sm">{candidate.candidateEmail} &bull; {candidate.yearsOfExperience}y Exp</p>

                                        <div className="mt-3 flex flex-wrap gap-1">
                                            {candidate.candidateSkills?.split(',').map((s, i) => (
                                                <span key={i} className="bg-slate-50 border border-slate-200 text-slate-600 px-2 py-0.5 rounded text-xs">
                                                    {s.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* AI Score */}
                                    <div className="mx-6 text-center">
                                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 h-20 w-24 rounded-2xl flex flex-col items-center justify-center">
                                            <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-black text-2xl">
                                                {candidate.aiMatchScore}%
                                            </p>
                                            <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">Match</p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="w-32 border-l border-slate-100 pl-6 flex flex-col gap-2">
                                        {decisions[candidate.candidateProfileId] ? (
                                            <span className={`w-full text-center px-3 py-2 rounded-lg text-xs font-bold ${decisions[candidate.candidateProfileId] === 'Hired'
                                                ? 'bg-green-100 text-green-700'
                                                : decisions[candidate.candidateProfileId] === 'Recommended'
                                                    ? 'bg-yellow-100 text-yellow-700'
                                                    : 'bg-red-100 text-red-700'
                                                }`}>
                                                {decisions[candidate.candidateProfileId]}
                                            </span>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => handleDecision(candidate.id, candidate.candidateProfileId, 'Hired')}
                                                    disabled={actionLoading[candidate.candidateProfileId] || candidate.aiMatchScore < 50}
                                                    title={candidate.aiMatchScore < 50 ? "Insufficient AI Match Score" : "Hire Candidate"}
                                                    className={`${candidate.aiMatchScore < 50 ? 'bg-slate-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'} text-white w-full py-1.5 rounded-lg text-xs font-bold transition`}
                                                >
                                                    {actionLoading[candidate.candidateProfileId] ? '...' : 'Hire'}
                                                </button>
                                                <button
                                                    onClick={() => handleDecision(candidate.id, candidate.candidateProfileId, 'Recommended')}
                                                    disabled={actionLoading[candidate.candidateProfileId]}
                                                    className="bg-blue-500 hover:bg-blue-600 text-white w-full py-1.5 rounded-lg text-xs font-bold transition"
                                                >
                                                    {actionLoading[candidate.candidateProfileId] ? '...' : 'Shortlist'}
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* AI Questions Section */}
                                <div className="mt-6 pt-5 border-t border-slate-100">
                                    {!aiQuestions[candidate.candidateProfileId] && !qLoading[candidate.candidateProfileId] && (
                                        <button
                                            onClick={() => handleGenerateQuestions(candidate.candidateProfileId, candidate.candidateSkills, jobs.find(j => j.id == selectedJob)?.title)}
                                            className="text-sm font-semibold text-purple-600 hover:text-purple-700 bg-purple-50 px-5 py-3 rounded-lg transition w-full text-center"
                                        >
                                             Generate Technical Interview Questions
                                        </button>
                                    )}

                                    {qLoading[candidate.candidateProfileId] && (
                                        <div className="bg-purple-50 rounded-lg p-4 text-center">
                                            <p className="text-sm font-bold text-purple-600 animate-pulse">🤖 Analyzing skills and generating questions...</p>
                                        </div>
                                    )}

                                    {aiQuestions[candidate.candidateProfileId] && (
                                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                            <h4 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
                                                <span>🧠</span> AI Generated Technical Questions
                                            </h4>
                                            <ul className="space-y-3">
                                                {aiQuestions[candidate.candidateProfileId].map((q, qIndex) => (
                                                    <li key={qIndex} className="text-sm text-slate-700 bg-white p-3 rounded border border-slate-100 shadow-sm flex items-start gap-3">
                                                        <span className="font-bold text-slate-400 mt-0.5">Q{qIndex + 1}.</span>
                                                        <span>{q}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div >
        </div >
    );
}

export default RankedCandidates;
