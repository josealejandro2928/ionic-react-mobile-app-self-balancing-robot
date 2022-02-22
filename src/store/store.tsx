import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
const { composeWithDevTools } = require('redux-devtools-extension');

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
