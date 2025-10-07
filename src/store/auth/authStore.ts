import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "../api/apiService";
import { API_URLS } from "@/src/config/EndPoints";
import { router } from "expo-router";
import { Toast } from "toastify-react-native";


export interface User {
  id?: string;
  email: string;
  fullName: string;
  phoneNo: string;
  dateOfBirth: string;
  profileImage: string;

  // Add other user properties as needed
}

interface AuthState {
  // State
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  avatars: string[] | null;



  _hasAuthStoreHydrated: boolean;
  setHasAuthStoreHydrated: (state: boolean) => void;

  // Actions
  deleteAccount: () => Promise<void>;
  updateAvatarsList: (ava: string[]) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    email: string;
    password: string;
    fullName: string;
    dateOfBirth: string;
    phoneNo: string;
  }, profileImage: string) => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<void>;
  clearError: () => void;
  resendOtp: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  resetPassword: (password: string, email: string) => Promise<void>;
  editProfile: (body: User) => Promise<void>;
  socialLogin: (body: any) => Promise<void>;
  validateToken: () => Promise<boolean>;
}

const
  useAuthStore = create<AuthState>()(
    persist(
      (set, get) => ({
        // Initial state
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        avatars: [],
        _hasAuthStoreHydrated: false,
        setHasAuthStoreHydrated: (state) => set({ _hasAuthStoreHydrated: state }),

        // Actions
        deleteAccount: async () => {
          try {
            set({ isLoading: true, error: null });

            const response = await apiClient.delete(API_URLS.DELETE_ACCOUNT);

            // After account deletion, clear local state
            set({
              token: null,
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
            });



            // Remove token from axios headers
            delete apiClient.defaults.headers.common.Authorization;

            return response?.data;
          } catch (error: any) {
            set({
              isLoading: false,
              error: error.response?.data?.message || "Delete account failed",
              isAuthenticated: false,
            });
            return error;
          }
        },

        updateAvatarsList: (list) => set(() => ({ avatars: list })),

        login: async (email: string, password: string) => {
          try {
            set({ isLoading: true, error: null });
            const response = await apiClient.post(API_URLS.LOGIN, {
              email,
              password,
            });
            if (response.data?.data?.authToken) {
              const { authToken } = response.data?.data;
              const user = response.data?.data;
              if (authToken) {
                // Update state with user data and token
                set({
                  token: authToken,
                  user,
                  isAuthenticated: true,
                  isLoading: false,
                  error: null,
                });
              }
            }
            return response?.data;
          } catch (error: any) {

            set({
              isLoading: false,
              error: error.response?.data?.message || "Login failed",
              isAuthenticated: false,
            });

            return error;
          }
        },
        socialLogin: async (body: any): Promise<void> => {
          const { socialId, platform, email, fullName, socialToken, fcmToken, socialPlatform } = body;

          try {
            set({ isLoading: true, error: null });

            const response = await apiClient.post(API_URLS.SOCIAL_LOGIN, {
              socialId,
              platform,
              email,
              fullName,
              socialToken,
              fcmToken,
              socialPlatform,
            });

            console.log("Backend Response:", response);

            const authToken = response?.data?.data?.authToken;
            const user = response?.data?.data;

            if (authToken) {
              set({
                token: authToken,
                user,
                isAuthenticated: true,
                isLoading: false,
                error: null,
              });
            } else {
              throw new Error("Invalid login response from server");
            }
          } catch (error: any) {
            const message =
              error?.response?.data?.message ||
              error?.message ||
              "Login failed due to network or server issue";

            console.error("Social login error:", message);

            set({
              isLoading: false,
              isAuthenticated: false,
              error: message,
            });

            throw new Error(message); // propagate error to caller
          }
        },


        googleLogin: async (email: string, password: string) => {
          try {
            set({ isLoading: true, error: null });

            // const response = await apiClient.post(API_URLS.LOGIN, {
            //   email,
            //   password,
            // });
            // if (response.data?.data?.authToken) {
            //   const { authToken } = response.data?.data;
            //   const user = response.data?.data;
            //   if (authToken) {
            //     // Update state with user data and token
            //     set({
            //       token: authToken,
            //       user,
            //       isAuthenticated: true,
            //       isLoading: false,
            //       error: null,
            //     });
            //   }
            // }
            // return response?.data;
          } catch (error: any) {

            set({
              isLoading: false,
              error: error.response?.data?.message || "Login failed",
              isAuthenticated: false,
            });

            return error;
          }
        },


        changePassword: async (oldPassword: string, newPassword: string) => {
          try {
            set({ isLoading: true, error: null });

            const response = await apiClient.post(API_URLS.CHANGE_PASSWORD, {
              oldPassword,
              newPassword,
            });
            set({
              isLoading: false,
              error: null,
            });
            return response?.data;
          } catch (error: any) {
            set({
              isLoading: false,
              error: error.response?.data?.message || "Change password failed",
              isAuthenticated: false,
            });

            return error;
          }
        },

        resetPassword: async (password: string, email: string) => {
          try {
            set({ isLoading: true, error: null });

            const response = await apiClient.post(API_URLS.RESET_PASSWORD, {
              password,
              email,
            });
            set({
              token: null,
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
            });
            return response?.data;
          } catch (error: any) {
            set({
              isLoading: false,
              error: error.response?.data?.message || "Reset password failed",
              isAuthenticated: false,
            });

            return error;
          }
        },

        verifyOtp: async (email: string, otp: string) => {
          try {
            set({ isLoading: true, error: null });

            const response = await apiClient.post(API_URLS.VERIFY_OTP, {
              email,
              otp,
            });
            const { authToken, user } = response.data?.data;

            set({
              token: authToken,
              user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            return response?.data;
            // Update axios headers with new token
          } catch (error: any) {
            set({
              isLoading: false,
              error: error.response?.data?.message || "Login failed",
              isAuthenticated: false,
            });
          }
        },
        resendOtp: async (email: string) => {
          try {
            set({ isLoading: true, error: null });

            const response = await apiClient.post(API_URLS.RESEND_OTP, {
              email,
            });
            const { authToken, user } = response.data?.data;

            set({
              token: authToken,
              user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            return response?.data;
            // Update axios headers with new token
          } catch (error: any) {
            set({
              isLoading: false,
              error: error.response?.data?.error?.message || "Failed to send OTP",
              isAuthenticated: false,
            });
            return error;
          }
        },
        register: async (userData, profileImage): Promise<any> => {

          try {
            set({ isLoading: true, error: null });

            // Create FormData for multipart/form-data request
            const formData = new FormData();

            // Add user data fields
            formData.append('fullName', userData.fullName);
            formData.append('email', userData.email);
            formData.append('password', userData.password);

            if (userData.phoneNo) {
              formData.append('phoneNo', userData.phoneNo || '');
            }
            if (userData.dateOfBirth) {
              formData.append('dateOfBirth', userData.dateOfBirth || '');
            }


            // Add profile image if provided
            if (profileImage) {
              formData.append('profile', {
                uri: profileImage.uri,
                type: 'image/jpeg',
                name: 'profile.jpg',
              } as any);
            }




            // Use fetch instead of axios

            const response = await apiClient.post(API_URLS.SIGNUP, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });


            // Handle response structure based on your API
            const { token: authToken, user } = response.data || response;

            // Update state with user data and token
            set({
              token: authToken,
              user,
              isAuthenticated: false,
              isLoading: false,
              error: null,
            });

            // Update axios headers with new token for future requests
            // apiClient.defaults.headers.common.Authorization = `Bearer ${authToken}`;
            return response;
          } catch (error: any) {
            set({
              isLoading: false,
              error: error?.message || "Registration failed",
              isAuthenticated: false,
            });
            return error;
          }
        },

        logout: async () => {
          try {
            set({ isLoading: true, error: null });

            const response = await apiClient.post("/auth/logout");

            // Clear state
            set({
              token: null,
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
            });

            // Remove token from axios headers
            delete apiClient.defaults.headers.common.Authorization;
            return response?.data;
          } catch (error: any) {
            set({
              isLoading: false,
              error: error.response?.data?.message || "Logout failed",
              isAuthenticated: false,
            });
          }
        },
        editProfile: async (body: User) => {
          try {
            set({ isLoading: true, error: null });

            // Create FormData for multipart/form-data request
            const formData = new FormData();

            // Add user data fields
            formData.append('fullName', body.fullName);
            // formData.append('email', body.email);
            if (body.phoneNo) {
              formData.append('phoneNo', body.phoneNo || "");
            }
            if (body.dateOfBirth) {
              formData.append('dob', body.dateOfBirth || "");
            }


            // Add profile image if provided and it's a local URI
            if (body.profileImage) {
              formData.append('profile', {
                uri: body.profileImage?.uri,
                type: body.profileImage?.mimeType || 'image/jpeg',
                name: body.profileImage?.fileName || 'profile.jpeg',
              } as any);
            }
            const userIsSocial = useAuthStore.getState()?.user?.isSocial;
            const response = await apiClient.patch(API_URLS.EDIT_PROFILE, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });

            let userData = response.data.data;

            if (userIsSocial) {
              userData = {
                ...userData,
                isSocial: true,
              };
            }

            set({ isLoading: false, error: null, user: userData });

            Toast.success(response?.data?.message || "Your details updated successfully");

            router.replace({
              pathname: "/(mainstack)/profile",
            });

            return response?.data;
          } catch (error: any) {
            console.log(error, "error")
            set({
              isLoading: false,
              error: error?.message || "Something went wrong",
            });
            Toast.error(error?.message || "Something went wrong");
          }
        },

        clearError: () => {
          set({ error: null });
        },

        validateToken: async () => {
          try {
            const { token } = get();
            if (!token) {
              return false;
            }

            // Make a simple API call to validate the token
            // Using user endpoint which requires authentication
            const response = await apiClient.get(API_URLS.VALIDATE_TOKEN);

            if (response.status === 200) {
              return true;
            }
            return false;
          } catch (error) {
            console.log("Token validation failed:", error);
            // Clear invalid token
            set({
              token: null,
              user: null,
              isAuthenticated: false,
              error: null,
            });
            return false;
          }
        },
      }),
      {
        name: "auth-storage", // unique name for the storage
        storage: createJSONStorage(() => AsyncStorage),
        onRehydrateStorage: () => (state) => {
          state?.setHasAuthStoreHydrated(true);
        }, // Use AsyncStorage for React Native
      }
    )
  );

export default useAuthStore;
