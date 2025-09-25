import { create } from 'zustand';
import apiClient from './apiService';

// Define the state interface
interface ApiState {
  // Loading states
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  
  // Data states
  data: any;
  
  // Actions
  fetchData: (endpoint: string, params?: any) => Promise<void>;
  postData: (endpoint: string, data: any) => Promise<void>;
  putData: (endpoint: string, data: any) => Promise<void>;
  deleteData: (endpoint: string) => Promise<void>;
  
  // Reset state
  resetState: () => void;
}

// Create the store
const useApiStore = create<ApiState>((set, get) => ({
  // Initial state
  isLoading: false,
  isError: false,
  errorMessage: null,
  data: null,
  
  // Actions
  fetchData: async (endpoint: string, params?: any) => {
    try {
      set({ isLoading: true, isError: false, errorMessage: null });
      
      const response = await apiClient.get(endpoint, { params });
      
      set({ 
        isLoading: false, 
        data: response.data,
        isError: false,
        errorMessage: null
      });
    } catch (error: any) {
      set({ 
        isLoading: false, 
        isError: true,
        errorMessage: error.response?.data?.message || error.message || 'An error occurred',
        data: null
      });
    }
  },
  
  postData: async (endpoint: string, data: any) => {
    try {
      set({ isLoading: true, isError: false, errorMessage: null });
      
      const response = await apiClient.post(endpoint, data);
      
      set({ 
        isLoading: false, 
        data: response.data,
        isError: false,
        errorMessage: null
      });
    } catch (error: any) {
      set({ 
        isLoading: false, 
        isError: true,
        errorMessage: error.response?.data?.message || error.message || 'An error occurred',
        data: null
      });
    }
  },
  
  putData: async (endpoint: string, data: any) => {
    try {
      set({ isLoading: true, isError: false, errorMessage: null });
      
      const response = await apiClient.put(endpoint, data);
      
      set({ 
        isLoading: false, 
        data: response.data,
        isError: false,
        errorMessage: null
      });
    } catch (error: any) {
      set({ 
        isLoading: false, 
        isError: true,
        errorMessage: error.response?.data?.message || error.message || 'An error occurred',
        data: null
      });
    }
  },
  
  deleteData: async (endpoint: string) => {
    try {
      set({ isLoading: true, isError: false, errorMessage: null });
      
      const response = await apiClient.delete(endpoint);
      
      set({ 
        isLoading: false, 
        data: response.data,
        isError: false,
        errorMessage: null
      });
    } catch (error: any) {
      set({ 
        isLoading: false, 
        isError: true,
        errorMessage: error.response?.data?.message || error.message || 'An error occurred',
        data: null
      });
    }
  },
  
  // Reset state
  resetState: () => {
    set({
      isLoading: false,
      isError: false,
      errorMessage: null,
      data: null
    });
  }
}));

export default useApiStore; 