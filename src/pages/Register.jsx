function Register() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-96">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">Code House</h1>
        <p className="text-center text-gray-400 mb-8">Create Account</p>
        <div className="mb-4">
          <label className="block text-gray-600 mb-1 font-medium">Full Name</label>
          <input type="text" placeholder="Enter your full name" className="w-full border-2 border-gray-200 p-3 rounded-lg focus:outline-none focus:border-blue-500"/>
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-1 font-medium">Email</label>
          <input type="email" placeholder="Enter your email" className="w-full border-2 border-gray-200 p-3 rounded-lg focus:outline-none focus:border-blue-500"/>
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-1 font-medium">Password</label>
          <input type="password" placeholder="Enter your password" className="w-full border-2 border-gray-200 p-3 rounded-lg focus:outline-none focus:border-blue-500"/>
        </div>
        <div className="mb-6">
          <label className="block text-gray-600 mb-1 font-medium">I am a</label>
          <select className="w-full border-2 border-gray-200 p-3 rounded-lg focus:outline-none focus:border-blue-500">
            <option value="">Select Role</option>
            <option value="jobseeker">Job Seeker</option>
            <option value="recruiter">Recruiter</option>
            <option value="hiring_manager">Hiring Manager</option>
          </select>
        </div>
        <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition duration-300">Register</button>
        <p className="text-center text-gray-400 mt-4 text-sm">
          Already have an account?
          <a href="/login" className="text-blue-600 font-medium cursor-pointer"> Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;