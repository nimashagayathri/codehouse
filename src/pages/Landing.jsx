import React from 'react';
import { ArrowRight, Briefcase, Users, Cpu, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Landing() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 border-t-4 border-blue-600">

            {/* Navigation */}
            <nav className="container mx-auto px-6 py-6 flex justify-between items-center h-24">
                <div className="flex items-center justify-center h-24 w-48 overflow-visible">
                    <img src="/logo.png" alt="CodeHouse" className="h-32 md:h-48 object-contain transform scale-[1.8] origin-left" />
                </div>
                <div className="hidden md:flex gap-8 items-center text-sm font-semibold text-slate-500">
                    <a href="#features" className="hover:text-blue-600 transition">Features</a>
                    <a href="#solutions" className="hover:text-blue-600 transition">Solutions</a>
                    <a href="#enterprise" className="hover:text-blue-600 transition">Enterprise</a>
                </div>
                <div className="flex gap-4 items-center">
                    <button
                        onClick={() => navigate('/login')}
                        className="text-slate-600 font-bold text-sm hover:text-blue-700 transition"
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => navigate('/register')}
                        className="text-white px-6 py-2.5 rounded-full font-bold text-sm transition shadow-lg flex items-center gap-2"
                        style={{ backgroundColor: '#0c37adff' }}
                    >
                        Get Started <ArrowRight size={16} />
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="container mx-auto px-6 pt-8 pb-16 text-center max-w-4xl">
                <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-6 uppercase tracking-wider text-white" style={{ backgroundColor: '#0c37adff' }}>
                    Next-Gen AI Recruitment
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-4 leading-tight">
                    Find exceptional talent,<br />
                    <span style={{ color: '#0c37adff' }}>powered by Intelligence.</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-500 mb-8 max-w-2xl mx-auto leading-relaxed">
                    CodeHouse revolutionizes the hiring process by automating resume parsing, skill matching, and candidate ranking using deeply integrated AI capabilities.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate('/register')}
                        className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full font-bold text-lg transition flex items-center justify-center gap-2 shadow-xl"
                    >
                        Start Recruiting Now
                    </button>
                    <button
                        onClick={() => navigate('/jobs')}
                        className="bg-white border-2 border-slate-200 text-slate-700 hover:border-slate-300 px-8 py-4 rounded-full font-bold text-lg transition flex items-center justify-center gap-2"
                    >
                        Explore Jobs <Briefcase size={20} />
                    </button>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-white border-y border-slate-200 py-16 mt-12">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-400">
                        <div>
                            <p className="text-4xl font-black text-slate-900 uppercase">99%</p>
                            <p className="text-sm font-semibold text-slate-500 mt-2">AI Match Accuracy</p>
                        </div>
                        <div>
                            <p className="text-4xl font-black text-slate-900 uppercase">3X</p>
                            <p className="text-sm font-semibold text-slate-500 mt-2">Faster Hiring</p>
                        </div>
                        <div>
                            <p className="text-4xl font-black text-slate-900 uppercase">10k+</p>
                            <p className="text-sm font-semibold text-slate-500 mt-2">Placed Candidates</p>
                        </div>
                        <div>
                            <p className="text-4xl font-black text-slate-900 uppercase">24/7</p>
                            <p className="text-sm font-semibold text-slate-500 mt-2">Automated Screening</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Grids */}
            <section className="container mx-auto px-6 py-24" id="features">
                <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">Enterprise-grade capabilities out of the box</h2>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-lg transition">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                            <Cpu size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">AI Resume Parsing</h3>
                        <p className="text-slate-500 leading-relaxed text-sm">
                            Instantly extract skills, experience, and educational background from PDF profiles with state-of-the-art NLP models.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-lg transition">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                            <Users size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Smart Candidate Ranking</h3>
                        <p className="text-slate-500 leading-relaxed text-sm">
                            Automatically score and rank job applicants against job requirements to instantly identify top-tier talent.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-lg transition">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                            <ShieldCheck size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Roles & Permissions</h3>
                        <p className="text-slate-500 leading-relaxed text-sm">
                            Secure RBAC workflows designed for organizational collaboration between seekers, recruiters, and managers.
                        </p>
                    </div>

                </div>
            </section>

            {/* Solutions Section */}
            <section className="bg-blue-50 py-24" id="solutions">
                <div className="container mx-auto px-6 text-center max-w-4xl">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Comprehensive Recruitment Solutions</h2>
                    <p className="text-slate-600 text-lg mb-12">Whether you are a fast-growing startup or an established corporation, CodeHouse adapts to your hiring needs with custom workflows and seamless automation.</p>
                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100 flex-1">
                            <h4 className="font-bold text-blue-700 text-xl mb-2">For Recruiters</h4>
                            <p className="text-slate-500 text-sm">Post jobs and manage candidates effortlessly in one centralized hub.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100 flex-1">
                            <h4 className="font-bold text-blue-700 text-xl mb-2">For Hiring Managers</h4>
                            <p className="text-slate-500 text-sm">Evaluate top AI-ranked talent and automatically schedule interviews.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enterprise Section */}
            <section className="container mx-auto px-6 py-24 text-center" id="enterprise">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Trusted by Forward-Thinking Enterprises</h2>
                <p className="text-slate-500 text-lg mb-12 max-w-2xl mx-auto">Join the next generation of companies utilizing our proprietary Llama-3 AI infrastructure to cut hiring costs by up to 40%.</p>
                <div className="flex flex-wrap justify-center gap-8 opacity-60">
                    <div className="text-2xl font-black text-slate-400 tracking-widest uppercase">Acme Corp</div>
                    <div className="text-2xl font-black text-slate-400 tracking-widest uppercase">Globex</div>
                    <div className="text-2xl font-black text-slate-400 tracking-widest uppercase">Initech</div>
                    <div className="text-2xl font-black text-slate-400 tracking-widest uppercase">Stark Ind.</div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
                <div className="container mx-auto px-6 text-center">
                    <p className="mb-4">© 2026 CodeHouse AI Technologies. University Assessment Release.</p>
                </div>
            </footer>
        </div>
    );
}

export default Landing;
