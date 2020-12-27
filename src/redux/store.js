import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import rootReducer from './root-reducer';
import rootSaga from './root-saga';
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default { store, persistor };