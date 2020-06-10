import dynamic from 'next/dynamic';
import React from 'react';
import '@styles/index.css';

const MyApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default dynamic(() => Promise.resolve(MyApp), { ssr: false });
