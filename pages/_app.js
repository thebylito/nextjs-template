// @flow
import React from 'react';
import App from 'next/app';
import { END } from 'redux-saga';
import { wrapper } from 'appStore/wrapper';
import withReduxSaga from 'next-redux-saga';
import { PersistGate } from 'redux-persist/integration/react';
import { useStore } from 'react-redux';

// class WrappedApp extends App {
//   getInitialProps = async ({ Component, ctx }) => {
//     // 1. Wait for all page actions to dispatch
//     const pageProps = {
//       ...(Component.getInitialProps
//         ? await Component.getInitialProps(ctx)
//         : {}),
//     };

//     // 2. Stop the saga if on server
//     if (ctx.req) {
//       ctx.store.dispatch(END);
//       await ctx.store.sagaTask.toPromise();
//     }

//     // 3. Return props
//     return {
//       pageProps,
//     };
//   };

//   render() {
//     const { Component, pageProps } = this.props;
//     return (
//       <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
//         <Component {...pageProps} />
//       </PersistGate>
//     );
//   }
// }

function WrappedApp({ Component, pageProps }) {
  const store = useStore(state => state);
  return (
    <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
      <Component {...pageProps} />
    </PersistGate>
  );
}

WrappedApp.getInitialProps = async ({ Component, ctx }) => {
  // 1. Wait for all page actions to dispatch
  const pageProps = {
    ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
  };

  // 2. Stop the saga if on server
  if (ctx.req) {
    ctx.store.dispatch(END);
    await ctx.store.sagaTask.toPromise();
  }

  // 3. Return props
  return {
    pageProps,
  };
};

export default wrapper.withRedux(withReduxSaga(WrappedApp));
