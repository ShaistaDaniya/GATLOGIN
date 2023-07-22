import { combineReducers } from 'redux';
import phoneNumberReducer from './Reducer';
import reducer from './Reducer' 
import  ApiReducers  from './ApiReducer';
const rootReducer = combineReducers({
  phoneNumber: phoneNumberReducer,
  reducer,
  ApiReducers,

 
});

export default rootReducer;
