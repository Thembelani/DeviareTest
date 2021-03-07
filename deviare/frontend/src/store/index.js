//'https://gist.github.com/steniowagner/b3c9e1dccfea7bf61d585020232b3c97'

import { createMemoryHistory } from 'history'; 
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'; 
import { routerMiddleware } from 'connected-react-router'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist';

import createRootReducer from './redux';
import sagas from './sagas';

const persistConfig = {
    key: 'root',
    storage
} 

const middleware = [];

const history = createMemoryHistory();
  
const persistedReducer = persistReducer(persistConfig, createRootReducer(history));

/* ------------- Saga Middleware ------------- */
const sagaMonitor = null
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
middleware.push(sagaMiddleware);

/* ------------- Router Middleware ------------- */
const routeMiddleware = routerMiddleware(history);
middleware.push(routeMiddleware);

const store = createStore(persistedReducer, {}, applyMiddleware(...middleware));

const persistor = persistStore(store);

console.log(store.getState());
sagaMiddleware.run(sagas);

export { store, persistor, history }; 