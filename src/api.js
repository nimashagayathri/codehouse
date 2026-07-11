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
export const getCandidateProfile = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/api/candidates/profile`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.json();
};

export const updateCandidateProfile = async (profileData) => {
  const token = localStorage.getItem('token');

  // profileData may not have yearsOfExperience set initially, default it to 0
  if (profileData.yearsOfExperience === undefined) {
    profileData.yearsOfExperience = 0;
  }

  let response = await fetch(`${API_URL}/api/candidates/profile`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(profileData)
  });

  // If the profile does not exist yet, backend returns 404. We should create it via POST
  if (response.status === 404) {
    response = await fetch(`${API_URL}/api/candidates/profile`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profileData)
    });
  }

  return response.json();
};

export const getAllCandidates = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/api/candidates`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    return response.json();
  }
  // If candidates endpoint fails, try applications endpoint
  const response2 = await fetch(`${API_URL}/api/applications`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response2.json();
};
export const scheduleInterview = async (data) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/api/interviews/schedule`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
};

export const getMyInterviews = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/api/interviews/my-interviews`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.json();
};
export const evaluateCandidate = async (data) => {
  const token = localStorage.getItem('token');
  let response = await fetch(`${API_URL}/api/evaluations`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  // If evaluation already exists (409 Conflict), fetch it and do a PUT request
  if (response.status === 409) {
    const getRes = await fetch(`${API_URL}/api/evaluations/application/${data.jobApplicationId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const existingEval = await getRes.json();

    if (existingEval && existingEval.id) {
      response = await fetch(`${API_URL}/api/evaluations/${existingEval.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    }
  }

  return response.json();
};

export const getJobRecommendations = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/api/applications/recommendations`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.json();
};

export const getRankedApplications = async (jobId) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/api/applications/ranked/${jobId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.json();
};

export const getMyApplications = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/api/applications/my-applications`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.json();
};