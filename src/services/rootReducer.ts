import { combineReducers } from 'redux';
import { rickandmortyAPI } from './rickandmortyAPI';
import userDataReducer from './slices/userDataSlice';
import currentLanguageReducer from './slices/currentLanguageSlice';

const rootReducer = combineReducers({
  userData: userDataReducer,
  currentLanguage: currentLanguageReducer,
  [rickandmortyAPI.reducerPath]: rickandmortyAPI.reducer,
});

export default rootReducer;
