import { useState } from 'react';
import Sidebar from '../components/Sidebar';

function AIResumeParser() {
  const [parsed, setParsed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleParse = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setParsed(true);
    }, 2000);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="jobseeker" />

      <div className="flex-1 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">AI Resume Parser 🤖</h2>
          <p className="text-slate-400 mt-1">Upload your CV and let AI analyze it for you.</p>
        </div>

        {/* Upload Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-6 max-w-2xl mx-auto">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Upload Your CV</h3>
          <div className="border-2 border-dashed border-slate-300 p-8 rounded-2xl text-center mb-4">
            <p className="text-4xl mb-2">📄</p>
            <p className="text-slate-400 mb-4">Upload your CV and AI will analyze it!</p>
            <input type="file" className="hidden" id="resume-upload" />
            <label htmlFor="resume-upload"
              className="bg-blue-700 text-white px-6 py-2 rounded-xl cursor-pointer hover:bg-blue-800 font-semibold">
              Choose File
            </label>
          </div>
          <button
            onClick={handleParse}
            disabled={loading}
            className="w-full bg-purple-600 text-white p-3 rounded-xl font-bold hover:bg-purple-700 transition duration-300"
          >
            {loading ? '⏳ Analyzing...' : '🤖 Analyze with AI'}
          </button>
        </div>

        {/* AI Results */}
        {parsed && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-bold text-slate-800 mb-6">AI Analysis Results ✨</h3>

            <div className="mb-6">
              <h4 className="font-bold text-slate-600 mb-2">👤 Personal Info</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <p className="text-slate-700"><span className="font-semibold">Name:</span> Nimasha</p>
                <p className="text-slate-700"><span className="font-semibold">Email:</span> nimasha@gmail.com</p>
                <p className="text-slate-700"><span className="font-semibold">Location:</span> Kandy, Sri Lanka</p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-bold text-slate-600 mb-2">🛠️ Extracted Skills</h4>
              <div className="flex flex-wrap gap-2">
                {["React", "JavaScript", "HTML", "CSS", "C#", "SQL", "ASP.NET"].map((skill) => (
                  <span key={skill} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-bold text-slate-600 mb-2">💼 Experience</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <p className="font-semibold text-slate-800">Software Engineering Student</p>
                <p className="text-slate-500">NSBM Green University • 2023 - Present</p>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-100 p-6 rounded-2xl text-center">
              <p className="text-slate-500 mb-1 font-medium">AI Profile Score</p>
              <p className="text-5xl font-extrabold text-purple-600">87%</p>
              <p className="text-slate-400 mt-2 text-sm">Strong profile! Ready to apply for jobs.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AIResumeParser;