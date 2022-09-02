import type { AppProps } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import '../styles/globals.css';
import store from '../utils/dispatch';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
