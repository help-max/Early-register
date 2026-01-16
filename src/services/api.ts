import axios from 'axios';

interface EarlyRegistrationRequest {
  first_name: string;
  second_name: string;
  email: string;
  question_1: string;
  question_2: string;
  question_3: string;
}

interface EarlyRegistrationResponse {
  code: number;
  type: string;
  message: string;
  data?: {
    message: string;
  };
  errors?: Record<string, string[]>;
}

interface GoogleAuthResponse {
  code: number;
  type: string;
  message: string;
  data: {
    access_token: string;
    user: {
      id: string;
      email: string;
      name: string;
    };
  };
}

const API_BASE_URL = 'https://admin.delveng.com/api/development';
const API_KEY = '28256581897442759569065762791816';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem('auth_token', token);
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('auth_token');
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('auth_token');
};

export async function handleGoogleAuth(accessToken: string): Promise<GoogleAuthResponse> {
  try {
    const response = await apiClient.post('/auth/google/callback', {
      access_token: accessToken,
    });
    
    if (response.data.data?.access_token) {
      setAuthToken(response.data.data.access_token);
    }
    
    return response.data;
  } catch (error) {
    console.error('Google authentication failed:', error);
    throw error;
  }
}

export async function submitEarlyRegistration(data: EarlyRegistrationRequest): Promise<EarlyRegistrationResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/early-registration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return errorData;
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('API request failed:', error);
    throw new Error('Network error occurred while submitting registration');
  }
}

export { apiClient };
export type { EarlyRegistrationRequest, EarlyRegistrationResponse, GoogleAuthResponse };
