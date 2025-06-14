import { legacy_createStore as createStore, applyMiddleware, compose} from 'redux';
import rootSaga from '../../sagas';
import reducers from './reducer';
import logger from 'redux-logger';

const createSagaMiddleware = require('redux-saga').default;

const composeEnhancers = compose;

const sagaMiddleware = createSagaMiddleware();
const middleWares = [sagaMiddleware, logger];

const store = createStore(reducers, composeEnhancers(applyMiddleware(...middleWares)));

sagaMiddleware.run(rootSaga);
export default store;
