import { useCallback } from 'react';
import useLoaderStore from '@/src/store/global/loaderStore';

/**
 * A hook that provides functions to show and hide the global loader
 * @returns An object with showLoader and hideLoader functions
 */
const useGlobalLoader = () => {
  const { showLoader, hideLoader } = useLoaderStore();

  /**
   * Wraps an async function with loader functionality
   * @param fn The async function to wrap
   * @param loadingMessage The message to display while loading
   * @returns A function that wraps the original function with loader functionality
   */
  const withLoader = useCallback(
    <T extends (...args: any[]) => Promise<any>>(
      fn: T,
      loadingMessage = 'Loading...'
    ) => {
      return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
        try {
          showLoader(loadingMessage);
          const result = await fn(...args);
          return result;
        } finally {
          hideLoader();
        }
      };
    },
    [showLoader, hideLoader]
  );

  return {
    showLoader,
    hideLoader,
    withLoader,
  };
};

export default useGlobalLoader; 