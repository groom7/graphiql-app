import { combineReducers } from 'redux';
import { rickandmortyAPI } from './rickandmortyAPI';

const rootReducer = combineReducers({
  [rickandmortyAPI.reducerPath]: rickandmortyAPI.reducer,
});

export default rootReducer;
