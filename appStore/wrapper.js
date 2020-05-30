// @flow
import { createStore, applyMiddleware } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './ducks';
import rootSaga from './sagas';

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const makeStore = ({ isServer }) => {
  const sagaMiddleware = createSagaMiddleware();

  if (isServer) {
    //If it's on server side, create a store simply
    return createStore(rootReducer, bindMiddleware([sagaMiddleware]));
  } else {
    //If it's on client side, create a store with a persistability feature
    const { persistStore, persistReducer } = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;

    const persistConfig = {
      key: 'root',
      whitelist: [], // make sure it does not clash with server keys
      storage,
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const store = createStore(
      persistedReducer,
      bindMiddleware([sagaMiddleware])
    );
    store.sagaTask = sagaMiddleware.run(rootSaga);
    store.__persistor = persistStore(store);

    return store;
  }
};

// export an assembled wrapper
export const wrapper = createWrapper(makeStore);
