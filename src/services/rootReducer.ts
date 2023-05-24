import { combineReducers } from 'redux';
import { rickandmortyAPI } from './rickandmortyAPI';
import userDataReducer from './slices/userDataSlice';

const rootReducer = combineReducers({
  userData: userDataReducer,
  [rickandmortyAPI.reducerPath]: rickandmortyAPI.reducer,
});

export default rootReducer;
