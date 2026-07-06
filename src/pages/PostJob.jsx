import { useState } from 'react';
import Sidebar from '../components/Sidebar';

function PostJob() {
  const [form, setForm] = useState({
    title: '', company: '', location: '', type: '', salary: '', skills: '', description: ''
  });
  const [posted, setPosted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePost = () => {
    if (form.title && form.company && form.location && form.type) {
      setPosted(true);
      setTimeout(() => setPosted(false), 3000);
      setForm({ title: '', company: '', location: '', type: '', salary: '', skills: '', description: '' });
    } else {
      alert('Please fill all required fields!');
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="recruiter" />

      <div className="flex-1 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Post a New Job 📝</h2>
          <p className="text-slate-400 mt-1">Create a new job listing for candidates.</p>
        </div>

        {posted && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-2xl mb-6 font-medium">
            ✅ Job Posted Successfully!
          </div>
        )}

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-2xl mx-auto">
          <div className="mb-5">
            <label className="block text-slate-600 mb-2 text-sm font-semibold">Job Title *</label>
            <input type="text" name="title" value={form.title} onChange={handleChange}
              placeholder="e.g. Software Engineer"
              className="w-full border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition"/>
          </div>

          <div className="mb-5">
            <label className="block text-slate-600 mb-2 text-sm font-semibold">Company *</label>
            <input type="text" name="company" value={form.company} onChange={handleChange}
              placeholder="e.g. Google"
              className="w-full border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition"/>
          </div>

          <div className="mb-5">
            <label className="block text-slate-600 mb-2 text-sm font-semibold">Location *</label>
            <input type="text" name="location" value={form.location} onChange={handleChange}
              placeholder="e.g. Colombo / Remote"
              className="w-full border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition"/>
          </div>

          <div className="mb-5">
            <label className="block text-slate-600 mb-2 text-sm font-semibold">Job Type *</label>
            <select name="type" value={form.type} onChange={handleChange}
              className="w-full border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition">
              <option value="">Select Job Type</option>
              <option value="fulltime">Full Time</option>
              <option value="parttime">Part Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </div>

          <div className="mb-5">
            <label className="block text-slate-600 mb-2 text-sm font-semibold">Salary (LKR)</label>
            <input type="text" name="salary" value={form.salary} onChange={handleChange}
              placeholder="e.g. 150,000"
              className="w-full border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition"/>
          </div>

          <div className="mb-5">
            <label className="block text-slate-600 mb-2 text-sm font-semibold">Required Skills</label>
            <input type="text" name="skills" value={form.skills} onChange={handleChange}
              placeholder="e.g. React, Node.js, SQL"
              className="w-full border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition"/>
          </div>

          <div className="mb-6">
            <label className="block text-slate-600 mb-2 text-sm font-semibold">Job Description</label>
            <textarea rows="5" name="description" value={form.description} onChange={handleChange}
              placeholder="Describe the job role..."
              className="w-full border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition"/>
          </div>

          <button onClick={handlePost}
            className="w-full bg-blue-700 text-white p-3 rounded-xl font-bold hover:bg-blue-800 transition duration-300">
            Post Job →
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostJob;