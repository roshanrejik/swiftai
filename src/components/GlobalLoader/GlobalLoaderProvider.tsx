import React from 'react';
import GlobalLoader from './index';
import useLoaderStore from '@/src/store/global/loaderStore';

interface GlobalLoaderProviderProps {
  children: React.ReactNode;
}

const GlobalLoaderProvider: React.FC<GlobalLoaderProviderProps> = ({ children }) => {
  const { isLoading, message } = useLoaderStore();

  return (
    <>
      {children}
      <GlobalLoader visible={isLoading} message={message} />
    </>
  );
};

export default GlobalLoaderProvider; 