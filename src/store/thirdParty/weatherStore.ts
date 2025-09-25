import { create } from 'zustand';
import weatherApiService from './weatherApiService';

// Define interfaces for the weather data
interface Location {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
 lon: number;
  url: string;
}

interface CurrentWeather {
  temp_c: number;
  temp_f: number;
  condition: {
    text: string;
    icon: string;
  };
  humidity: number;
  wind_kph: number;
  wind_dir: string;
  feelslike_c: number;
  feelslike_f: number;
  uv: number;
  last_updated: string;
}

interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

interface WeatherData {
  location: Location;
  current: CurrentWeather;
  forecast?: {
    forecastday: ForecastDay[];
  };
}

// Define the state interface
interface WeatherState {
  // State
  currentWeather: WeatherData | null;
  forecast: WeatherData | null;
  searchResults: Location[];
  selectedLocation: Location | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchCurrentWeather: (location: string) => Promise<void>;
  fetchForecast: (location: string, days?: number) => Promise<void>;
  searchLocations: (query: string) => Promise<void>;
  selectLocation: (location: Location) => void;
  clearError: () => void;
}

// Create the store
const useWeatherStore = create<WeatherState>((set, get) => ({
  // Initial state
  currentWeather: null,
  forecast: null,
  searchResults: [],
  selectedLocation: null,
  isLoading: false,
  error: null,
  
  // Actions
  fetchCurrentWeather: async (location: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const data = await weatherApiService.getCurrentWeather(location);
      
      set({ 
        currentWeather: data,
        isLoading: false,
        error: null
      });
    } catch (error: any) {
      set({ 
        isLoading: false,
        error: error.response?.data?.error?.message || error.message || 'Failed to fetch weather data',
        currentWeather: null
      });
    }
  },
  
  fetchForecast: async (location: string, days: number = 3) => {
    try {
      set({ isLoading: true, error: null });
      
      const data = await weatherApiService.getForecast(location, days);
      
      set({ 
        forecast: data,
        isLoading: false,
        error: null
      });
    } catch (error: any) {
      set({ 
        isLoading: false,
        error: error.response?.data?.error?.message || error.message || 'Failed to fetch forecast data',
        forecast: null
      });
    }
  },
  
  searchLocations: async (query: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const data = await weatherApiService.searchLocations(query);
      
      set({ 
        searchResults: data,
        isLoading: false,
        error: null
      });
    } catch (error: any) {
      set({ 
        isLoading: false,
        error: error.response?.data?.error?.message || error.message || 'Failed to search locations',
        searchResults: []
      });
    }
  },
  
  selectLocation: (location: Location) => {
    set({ selectedLocation: location });
    // Automatically fetch weather for the selected location
    get().fetchCurrentWeather(location.name);
    get().fetchForecast(location.name);
  },
  
  clearError: () => {
    set({ error: null });
  }
}));

export default useWeatherStore; 