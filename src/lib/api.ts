import axios from 'axios';

// Make sure this matches your backend API port (not frontend port)
const API_BASE_URL = 'http://localhost:8000';

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to include auth token in requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface AskRequest {
  prompt: string;
}

interface AskResponse {
  response: string;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
}

interface UserResponse {
  id: number;
  email: string;
  preferred_language: string;
  verse_theme: string;
  streak: number;
  last_checked: string | null;
}

export const api = {
  // Authentication endpoints
  login: async (username: string, password: string): Promise<LoginResponse> => {
    console.log(`Attempting login for user: ${username}`);
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    
    try {
      const response = await apiClient.post<LoginResponse>('/auth/login', formData.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      console.log('Login successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('Login request failed:', error);
      throw error;
    }
  },
  
  register: async (email: string, password: string, fullName?: string, preferredLanguage = 'en', verseTheme = 'gita'): Promise<UserResponse> => {
    console.log(`Attempting to register user: ${email} with name: ${fullName}, language: ${preferredLanguage}, theme: ${verseTheme}`);
    const data = {
      email,
      password,
      full_name: fullName,
      preferred_language: preferredLanguage,
      verse_theme: verseTheme,
    };
    console.log('Registration payload:', data);
    
    try {
      const response = await apiClient.post<UserResponse>('/auth/register', data);
      console.log('Registration successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('Registration request failed:', error);
      throw error;
    }
  },
  
  getCurrentUser: async (): Promise<UserResponse> => {
    console.log('Fetching current user data');
    try {
      const response = await apiClient.get<UserResponse>('/users/me');
      console.log('Current user data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      throw error;
    }
  },
  
  // Profile update endpoint - implement this when you add the backend endpoint
  updateUserProfile: async (data: { full_name?: string }): Promise<UserResponse> => {
    console.log('Updating user profile:', data);
    try {
      // This is a placeholder - you'll need to implement this endpoint in your backend
      const response = await apiClient.patch<UserResponse>('/users/me', data);
      console.log('Profile update successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    }
  },
  
  // Ask endpoint
  askQuestion: async (question: string): Promise<string> => {
    try {
      const response = await apiClient.post<AskResponse>('/ask', {
        prompt: question,
      });
      return response.data.response;
    } catch (error) {
      console.error('Error asking question:', error);
      throw error;
    }
  },
}; 