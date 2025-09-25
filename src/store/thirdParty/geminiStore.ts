import { create } from "zustand";
import geminiApiService from "./geminiApiService";

// Define interfaces for the Gemini data
interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
    finishReason: string;
    safetyRatings: Array<{
      category: string;
      probability: string;
    }>;
  }>;
  promptFeedback: {
    safetyRatings: Array<{
      category: string;
      probability: string;
    }>;
  };
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  isStreaming?: boolean;
}

// Define the state interface
interface GeminiState {
  // State
  response: GeminiResponse | null;
  chatHistory: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  isStreaming: boolean;
  streamedText: string;

  // Actions
  generateText: (
    prompt: string,
    conversationId: string | null,
    options?: {
      temperature?: number;
      maxOutputTokens?: number;
      topP?: number;
      topK?: number;
    }
  ) => Promise<void>;
  analyzeImage: (imageData: string, prompt: string) => Promise<void>;
  addMessageToChat: (message: ChatMessage) => void;
  clearChat: () => void;
  clearError: () => void;
  loadConversationMessages: (conversationId: string) => Promise<void>;
}

// Create the store
const useGeminiStore = create<GeminiState>((set, get) => ({
  // Initial state
  response: null,
  chatHistory: [],
  isLoading: false,
  error: null,
  isStreaming: false,
  streamedText: "",

  // Actions
  generateText: async (prompt: string, conversationId: string | null, options = {}) => {
  try {
    set({
      isLoading: true,
      error: null,
    });

    // Add user message
    const userMessage: ChatMessage = {
      role: "user",
      content: prompt,
      timestamp: Date.now(),
    };
    set((state) => ({
      chatHistory: [...state.chatHistory, userMessage],
    }));

    // 👇 Pehle assistant ka "empty streaming" message add karo
    const streamingMessage: ChatMessage = {
      role: "assistant",
      content: "",
      timestamp: Date.now(),
      isStreaming: true, // yahan true
    };
    set((state) => ({
      chatHistory: [...state.chatHistory, streamingMessage],
    }));

    // Ab API call
    const data = await geminiApiService?.generateText(prompt,conversationId, options);
    
    // Handle both response formats: object with "answer" property or direct string
    let responseText = "";
    if (typeof data === "string") {
      responseText = data;
    } else if (data && typeof data === "object" && data?.answer) {
      responseText = data?.answer;
    } else {
      responseText = data || "";
    }
    

    // Update last assistant message: content + isStreaming true for animation
    set((state) => {
      const updatedHistory = [...state.chatHistory];
      const lastIndex = updatedHistory.length - 1;
      updatedHistory[lastIndex] = {
        ...updatedHistory[lastIndex],
        content: responseText,
        isStreaming: true, // Keep true for AnimatedStreamText to work
      };
      return { chatHistory: updatedHistory, isLoading: false, response: data };
    });

  } catch (error: any) {
    set({
      isLoading: false,
      error:
        error.response?.data?.error?.message ||
        error.message ||
        "Failed to generate text",
      response: null,
    });
  }
}

  ,
  analyzeImage: async (imageData: string, prompt: string) => {
    try {
      set({ isLoading: true, error: null });

      // Add user message to chat history
      const userMessage: ChatMessage = {
        role: "user",
        content: `[Image Analysis] ${prompt}`,
        timestamp: Date.now(),
      };

      set((state) => ({
        chatHistory: [...state.chatHistory, userMessage],
      }));

      const data = await geminiApiService.analyzeImage(imageData, prompt);

      // Extract the text from the response
      const responseText = data.candidates[0]?.content?.parts[0]?.text || "";

      // Add assistant message to chat history
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: responseText,
        timestamp: Date.now(),
      };

      set((state) => ({
        response: data,
        chatHistory: [...state.chatHistory, assistantMessage],
        isLoading: false,
        error: null,
      }));
    } catch (error: any) {
      set({
        isLoading: false,
        error:
          error.response?.data?.error?.message ||
          error.message ||
          "Failed to analyze image",
        response: null,
      });
    }
  },

  addMessageToChat: (message: ChatMessage) => {
    set((state) => ({
      chatHistory: [...state.chatHistory, message],
    }));
  },

  clearChat: () => {
    set({ chatHistory: [] });
  },

  clearError: () => {
    set({ error: null });
  },

  loadConversationMessages: async (conversationId: string) => {
    try {
      set({ isLoading: true, error: null });
      const data = await geminiApiService.getConversationMessages(conversationId);
      
      // Convert API messages to ChatMessage format
      const messages: ChatMessage[] = data?.items?.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
        timestamp: new Date(msg.createdAt).getTime(),
      })) || [];

      set({ 
        chatHistory: messages, 
        isLoading: false 
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || "Failed to load conversation messages",
      });
    }
  },
}));

export default useGeminiStore;
