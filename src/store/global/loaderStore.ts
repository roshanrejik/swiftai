import { create } from 'zustand';

interface LoaderState {
  isLoading: boolean;
  message: string;
  showLoader: (message?: string) => void;
  hideLoader: () => void;
}

const useLoaderStore = create<LoaderState>((set) => ({
  isLoading: false,
  message: 'Loading...',
  showLoader: (message = 'Loading...') => set({ isLoading: true, message }),
  hideLoader: () => set({ isLoading: false }),
}));

export default useLoaderStore; 