import axios from 'axios';

// Create a dedicated axios instance for the weather API
const weatherApiClient = axios.create({
  baseURL: 'https://api.weatherapi.com/v1', // Replace with your actual API base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// You can add API key as a parameter to each request
// or set it in the headers if required by the API
const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key

// Example function to get current weather
export const getCurrentWeather = async (location: string) => {
  try {
    const response = await weatherApiClient.get('/current.json', {
      params: {
        key: API_KEY,
        q: location,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Weather API Error:', error);
    throw error;
  }
};

// Example function to get forecast
export const getForecast = async (location: string, days: number = 3) => {
  try {
    const response = await weatherApiClient.get('/forecast.json', {
      params: {
        key: API_KEY,
        q: location,
        days,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Weather API Error:', error);
    throw error;
  }
};

// Example function to search for locations
export const searchLocations = async (query: string) => {
  try {
    const response = await weatherApiClient.get('/search.json', {
      params: {
        key: API_KEY,
        q: query,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Weather API Error:', error);
    throw error;
  }
};

export default {
  getCurrentWeather,
  getForecast,
  searchLocations,
}; 