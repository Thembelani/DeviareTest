import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router';

const createRootReducer = (history) => {
  return combineReducers({
      auth: require('./auth').reducer,
      router: connectRouter(history),
    })  
}

export default createRootReducer;