import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { uploadResume } from '../api';

const GROQ_API_KEY = "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";

function AIResumeParser() {
  const [parsed, setParsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resumeText, setResumeText] = useState('');
  const [aiResult, setAiResult] = useState(null);

  const handleParse = async () => {
    if (!resumeText.trim()) {
      alert('Please paste your resume text first!');
      return;
    }
    if (!GROQ_API_KEY) {
      alert('Groq API key is missing! Add REACT_APP_GROQ_API_KEY to your .env file.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + GROQ_API_KEY
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [{
              role: 'user',
              content: `Analyze this resume and extract information. Return ONLY a JSON object with these fields:
              {
                "name": "candidate name",
                "email": "email if found",
                "location": "location if found",
                "skills": ["skill1", "skill2"],
                "experience": "years of experience",
                "education": "highest education",
                "score": 85
              }
              
              Resume text: ${resumeText}`
            }],
            temperature: 0.3
          })
        }
      );
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(`API Error ${response.status}: ${errData?.error?.message || JSON.stringify(errData)}`);
      }
      const data = await response.json();
      const resultText = data.choices[0].message.content;
      const jsonMatch = resultText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('Could not parse AI response as JSON');
      const result = JSON.parse(jsonMatch[0]);
      setAiResult(result);
      setParsed(true);
    } catch (err) {
      console.error(err);
      alert('AI Analysis failed: ' + err.message);
    }
    setLoading(false);
  };

  const [uploadingPdf, setUploadingPdf] = useState(false);

  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please upload a valid PDF file.');
      return;
    }

    setUploadingPdf(true);
    const formData = new FormData();
    formData.append('File', file);

    try {
      const data = await uploadResume(formData);
      if (data.extractedText) {
        setResumeText(data.extractedText);
        alert('PDF text extracted! You can now analyze it.');
      } else {
        alert(data.message || 'PDF could not be parsed or was empty.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to upload and parse PDF: ' + err.message);
    }
    setUploadingPdf(false);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="jobseeker" />

      <div className="flex-1 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">AI Resume Parser </h2>
          <p className="text-slate-400 mt-1">Paste your resume and let Gemini AI analyze it!</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-6 max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-slate-800">Paste Your Resume Text</h3>

            <div className="relative">
              <input type="file" accept="application/pdf" id="pdf-upload" className="hidden" onChange={handlePdfUpload} />
              <label htmlFor="pdf-upload" className="cursor-pointer bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-bold text-sm border border-slate-300 hover:bg-slate-200 transition">
                {uploadingPdf ? 'Uploading...' : ' Upload PDF'}
              </label>
            </div>
          </div>

          <textarea
            rows="8"
            placeholder="Paste your resume text here, or upload a PDF above..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            className="w-full border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition mb-4"
          />
          <button
            onClick={handleParse}
            disabled={loading || uploadingPdf}
            className="w-full bg-purple-600 text-white p-3 rounded-xl font-bold hover:bg-purple-700 transition duration-300 disabled:opacity-50"
          >
            {loading ? ' Analyzing with Groq AI...' : ' Analyze with Groq AI'}
          </button>
        </div>

        {parsed && aiResult && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-2xl mx-auto">
            <h3 className="text-lg font-bold text-slate-800 mb-6">AI Analysis Results</h3>

            <div className="mb-6">
              <h4 className="font-bold text-slate-600 mb-2"> Personal Info</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <p className="text-slate-700"><span className="font-semibold">Name:</span> {aiResult.name}</p>
                <p className="text-slate-700"><span className="font-semibold">Email:</span> {aiResult.email}</p>
                <p className="text-slate-700"><span className="font-semibold">Location:</span> {aiResult.location}</p>
                <p className="text-slate-700"><span className="font-semibold">Experience:</span> {aiResult.experience}</p>
                <p className="text-slate-700"><span className="font-semibold">Education:</span> {aiResult.education}</p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-bold text-slate-600 mb-2"> Extracted Skills</h4>
              <div className="flex flex-wrap gap-2">
                {aiResult.skills?.map((skill) => (
                  <span key={skill} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-100 p-6 rounded-2xl text-center">
              <p className="text-slate-500 mb-1 font-medium">AI Profile Score</p>
              <p className="text-5xl font-extrabold text-purple-600">{aiResult.score}%</p>
              <p className="text-slate-400 mt-2 text-sm">
                {aiResult.score >= 80 ? 'Strong profile! Ready to apply.' :
                  aiResult.score >= 60 ? 'Good profile! Some improvements needed.' :
                    'Keep improving your profile!'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AIResumeParser;
