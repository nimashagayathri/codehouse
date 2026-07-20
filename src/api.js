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

export const forgotPassword = async (email) => {
  const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  return response.json();
};

export const resetPassword = async (token, newPassword) => {
  const response = await fetch(`${API_URL}/api/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, newPassword })
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

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status} - ${errorText || 'Empty Response Body'}`);
  }
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

export const uploadResume = async (formData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/api/candidates/upload-resume`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
      // Note: Do not set Content-Type for FormData, fetch does it automatically with boundary
    },
    body: formData
  });
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

export const getAnalyticsSummary = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/api/analytics/summary`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};

export const getAllUsers = async (role = '') => {
  const token = localStorage.getItem('token');
  const url = role ? `${API_URL}/api/admin/users?role=${role}` : `${API_URL}/api/admin/users`;
  const response = await fetch(url, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};

export const updateUserStatus = async (userId, isActive) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/api/admin/users/${userId}/status`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ isActive })
  });
  return response.json();
};

export const updateUserRole = async (userId, newRole) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/api/admin/users/${userId}/role`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ role: newRole })
  });
  return response.json();
};

export const getAuditLogs = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/api/admin/audit-logs`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};

export const getTopJobs = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/api/analytics/top-jobs`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};

export const getHiringTrends = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/api/analytics/hiring-trends`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
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

export const getOrganizations = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/api/organizations`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};

export const createOrganization = async (org) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/api/organizations`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(org)
  });
  return response.json();
};

export const deleteOrganization = async (id) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/api/organizations/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};