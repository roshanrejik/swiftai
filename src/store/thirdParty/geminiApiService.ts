import { API_URLS } from "@/src/config/EndPoints";
import axios from "axios";
import useAuthStore from "../auth/authStore";
// Create a dedicated axios instance for the Gemini API


const geminiApiClient = axios.create({
  baseURL: API_URLS.BaseURL,
  // timeout: 30000, // Longer timeout for AI requests
  headers: {
    "Content-Type": "application/json",
   
  },
});

// Your Gemini API key
const API_KEY = "AIzaSyAZEJ4yoOYU6LEkv0M2fV1y_Ktxq7fPNM0"; // Replace with your actual API key

// Function to generate text using Gemini
export const generateText = async (prompt: string, conversationId: string | null, options: {} = {}) => {
  try {
    const token = useAuthStore.getState().token;
    const response = await geminiApiClient.post(
      `/chat/ask`,
      {
        question: prompt,
        conversationId: conversationId
      },
      {
        headers: {
          "x-auth-token": `${token}`,
        },
      }
    );

    console.log("Raw API Response:", response.data);
    console.log("Response data.data:", response.data?.data);
    console.log("Response data:", response.data);
    
    // Try different response structures
    if (response.data?.data) {
      console.log("Using response.data.data");
      return response.data.data;
    } else if (response.data) {
      console.log("Using response.data");
      return response.data;
    } else {
      console.log("No data found, returning null");
      return null;
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

// Function to generate text with streaming
export const generateTextStream = async (
  prompt: string,
  options: {
    temperature?: number;
    maxOutputTokens?: number;
    topP?: number;
    topK?: number;
  } = {}
) => {
  try {
    const response = await geminiApiClient.post(
      `/models/gemini-pro:streamGenerateContent?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: options.temperature || 0.7,
          maxOutputTokens: options.maxOutputTokens || 2048,
          topP: options.topP || 0.8,
          topK: options.topK || 40,
        },
      },
      {
        responseType: "stream",
      }
    );
    return response.data;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

// Function to analyze image with Gemini
export const analyzeImage = async (imageData: string, prompt: string) => {
  try {
    const response = await geminiApiClient.post(
      `/models/gemini-pro-vision:generateContent?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
              {
                inlineData: {
                  mimeType: "image/jpeg",
                  data: imageData,
                },
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 2048,
          topP: 0.8,
          topK: 40,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

// Function to get user conversations
export const getConversations = async () => {
  try {
    const token = useAuthStore.getState().token;
    const response = await geminiApiClient.get(
      `/chat/conversations`,
      {
        headers: {
          "x-auth-token": `${token}`,
        },
      }
    );

    return response.data?.data;
  } catch (error) {
    console.error("Get Conversations API Error:", error);
    throw error;
  }
};

// Function to get messages from a specific conversation
export const getConversationMessages = async (conversationId: string) => {
  try {
    const token = useAuthStore.getState().token;
    const response = await geminiApiClient.get(
      `/chat/conversations/${conversationId}/messages`,
      {
        headers: {
          "x-auth-token": `${token}`,
        },
      }
    );

    return response.data?.data;
  } catch (error) {
    console.error("Get Messages API Error:", error);
    throw error;
  }
};

export default {
  generateText,
  generateTextStream,
  analyzeImage,
  getConversations,
  getConversationMessages,
};
