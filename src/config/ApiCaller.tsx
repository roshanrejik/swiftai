import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { API_URLS } from "./EndPoints";
import { MessageShow } from "../Utils/Utils";
import { EventRegister } from "react-native-event-listeners";
import { Events } from "../constants/Constant";
import { Colors } from "../constants/Colors";

// const { user, setUser } = useAuth()
interface ApiRequestConfig extends AxiosRequestConfig {
  headers?: { [key: string]: string };
}

interface ApiResponse<T = any> extends AxiosResponse<T> {
  data: { success?: boolean; fileKey?: string } & T;
}

interface ApiError {
  name?: string;
  message?: string;
  response?: ApiResponse;
}

const API_AXIOS: AxiosInstance = Axios.create({
  baseURL: API_URLS.BaseURL,
});

API_AXIOS.interceptors.request.use(async (config: any) => {
  const token = await AsyncStorage.getItem("UserAuthToken"); //get your user token here
  config.headers = {
    "x-auth-token": token || "",
    "Content-Type": "application/json",
    Accept: "application/json",
    ...config.headers,
  };
  return config;
});

API_AXIOS.interceptors.response.use(
  (response: ApiResponse) => {
    console.log("Interceptor response", response);
    return response;
  },
  async (error: { response?: ApiResponse }) => {
    const response = error.response;
    console.log("Interceptor--error", response?.data);
    // console.log(error?.message)
    if (response?.data === undefined) {
      MessageShow("error", "", "Please Connect to a working Internet");
      return;
    }

    if (response?.status === 401) {
      try {
        console.log("%c{Error 401}", "color: red", response);
        
        // Clear auth storage
        await AsyncStorage.multiRemove(["UserAuthToken", "auth-storage"]);
        
        // Emit unauthorized event for other parts of the app to handle
        EventRegister.emit(Events.UNAUTHORIZED);
        
      } catch (err: ApiError | any) {
        console.log(`%c${err.name}`, "color: red", err?.message);
      }
    } else {
      let status = response?.status.toString();
      console.log(
        `%c${status[0] === "2" ? "Response " : "Error " + status}`,
        `color: ${status[0] === "2" ? Colors.green : Colors.red}`,
        response
      );
      MessageShow("error", "", response?.data?.error?.message);
    }
    return Promise.reject(error);
  }
);

const onSuccess = <T,>(response: ApiResponse<T>): T => {
  return response.data;
};

const onFailure = (error: any) => {
  console.log(error, "error=========");
  throw error;
};

const ForceError = <T,>(data: ApiResponse<T>) => {
  throw { response: data };
};

export class ApiCaller {
  static Get = async (
    endPoint = "",
    headers?: ApiRequestConfig["headers"]
  ): Promise<any> => {
    try {
      const result = await API_AXIOS.get(`/${endPoint}`, { headers });
      if (result?.data?.success) {
        return onSuccess(result);
      } else {
        return Promise.reject(ForceError(result));
      }
    } catch (error) {
      return onFailure(error);
    }
  };

  static Post = async <T = any,>(
    endPoint = "",
    body = {},
    headers?: ApiRequestConfig["headers"]
  ): Promise<T> => {
    try {
      const result = await API_AXIOS.post(`/${endPoint}`, body, { headers });
      if (result.data) {
        return onSuccess(result);
      } else {
        return onFailure(result);
      }
      // if (result?.data?.success || result?.data?.fileKey) {
      //   return onSuccess(result);
      // } else {
      //   return Promise.reject(ForceError(result));
      // }
    } catch (error) {
      return onFailure(error);
    }
  };

  static Put = async <T = any,>(
    endPoint = "",
    body = {},
    headers?: ApiRequestConfig["headers"]
  ): Promise<T> => {
    try {
      const result = await API_AXIOS.put(`/${endPoint}`, body, { headers });
      if (result?.data?.success) {
        return onSuccess(result);
      } else {
        return Promise.reject(ForceError(result));
      }
    } catch (error) {
      return onFailure(error);
    }
  };
}

export const API_INSTANCE = API_AXIOS;
