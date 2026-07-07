const API_URL = 'http://localhost:5223';

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return response.json();
};

export const registerUser = async (data) => {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
};
export const getJobs = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/api/jobs`, {
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' 
    }
  });
  return response.json();
};

export const applyJob = async (jobId) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/api/applications/apply`, {
    method: 'POST',
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({ jobPostingId: jobId })
  });
  return response.json();
};

export const postJob = async (jobData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/api/jobs`, {
    method: 'POST',
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(jobData)
  });
  return response.json();
};