import { API_URLS } from "@/src/config/EndPoints";
import axios from "axios";
import { Toast } from "toastify-react-native";
import useAuthStore from "../auth/authStore";
import { router } from "expo-router";
 
// Create an axios instance with default config
const apiClient = axios.create({
  baseURL: API_URLS.BaseURL, // Replace with your actual API base URL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
 
// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  async (config) => {
    // Get token from AsyncStorage
    const token = await useAuthStore.getState().token;
    if (token) {
      if (token) {
        config.headers["x-auth-token"] = `${token}`;
        // config.headers.Authorization = `Bearer ${token}`;
      }
    } 
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
 
// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors here
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      console.log("API Error:", error.response.data.error.message);
      Toast.error(error.response?.data?.error?.message);

      // Handle specific status codes
      if (error.response.status === 401) {
        // Unauthorized - token expired or invalid
        console.log("401 Unauthorized - clearing auth state and redirecting to login");
        
        // Clear auth state
        useAuthStore.getState().logout();
        
        // Redirect to login screen
      
        router.replace("/(auth)");
        
      } else if (error.response.status === 404) {
        // Not found
      } else if (error.response.status === 500) {
        // Server error
      }
    //   return  error.response.data
    } else if (error.request) {
      // Request was made but no response received
      console.error("Network Error:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("Error:", error.message);
    }

    return Promise.reject(error);
  }
);
 
export default apiClient;