import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { getCandidateProfile, updateCandidateProfile } from '../api';

function CandidateProfile() {
  const [profile, setProfile] = useState({
    fullName: '', phone: '', location: '', summary: '', skills: ''
  });
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getCandidateProfile();
        if (data.id) {
          setProfile(data);
          setSkills(data.skills ? data.skills.split(', ') : []);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleAddSkill = () => {
    if (newSkill.trim() !== '' && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSave = async () => {
    try {
      const data = await updateCandidateProfile({
        ...profile,
        skills: skills.join(', ')
      });
      // The backend returns an object like { message: "...", profile: { ... } }
      if (data.profile) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        alert(data.message || 'Failed to save profile!');
      }
    } catch (err) {
      alert('Connection failed!');
    }
  };

  if (loading) return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="jobseeker" />
      <div className="flex-1 p-8 flex items-center justify-center">
        <p className="text-slate-400"> Loading profile...</p>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="jobseeker" />

      <div className="flex-1 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">My Profile </h2>
          <p className="text-slate-400 mt-1">Manage your personal information and skills.</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-6">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center text-4xl">
              
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800">{profile.fullName}</h3>
              <p className="text-slate-500">{profile.email}</p>
              <p className="text-slate-400 text-sm">{profile.location}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-600 mb-2 text-sm font-semibold">Full Name</label>
              <input type="text" value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition" />
            </div>
            <div>
              <label className="block text-slate-600 mb-2 text-sm font-semibold">Phone</label>
              <input type="text" value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition" />
            </div>
            <div>
              <label className="block text-slate-600 mb-2 text-sm font-semibold">Location</label>
              <input type="text" value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="w-full border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition" />
            </div>
            <div>
              <label className="block text-slate-600 mb-2 text-sm font-semibold">Summary</label>
              <input type="text" value={profile.summary}
                onChange={(e) => setProfile({ ...profile, summary: e.target.value })}
                className="w-full border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition" />
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Skills ️</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map((skill) => (
              <span key={skill} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium text-sm flex items-center gap-1">
                {skill}
                <button onClick={() => handleRemoveSkill(skill)} className="text-red-400 hover:text-red-600 ml-1 font-bold">×</button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="text" placeholder="Add a skill..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
              className="flex-1 border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition" />
            <button onClick={handleAddSkill}
              className="bg-blue-700 text-white px-4 py-2 rounded-xl hover:bg-blue-800 font-semibold">
              Add
            </button>
          </div>
        </div>

        {/* CV Upload */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">CV / Resume </h3>
          <div className="border-2 border-dashed border-slate-300 p-8 rounded-2xl text-center">
            <p className="text-4xl mb-2"></p>
            <p className="text-slate-400 mb-4">Drag & drop your CV here or click to upload</p>
            <input type="file" className="hidden" id="cv-upload" />
            <label htmlFor="cv-upload"
              className="bg-blue-700 text-white px-6 py-2 rounded-xl cursor-pointer hover:bg-blue-800 font-semibold">
              Upload CV
            </label>
          </div>
        </div>

        {saved && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-2xl mb-4 font-medium">
             Profile Saved Successfully!
          </div>
        )}
        <button onClick={handleSave}
          className="w-full bg-blue-700 text-white p-3 rounded-xl font-bold hover:bg-blue-800 transition duration-300">
          Save Profile
        </button>
      </div>
    </div>
  );
}

export default CandidateProfile;