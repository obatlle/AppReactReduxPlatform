import {combineReducers} from 'redux';
import * as balanceReducer from './getBalance'

export default combineReducers (Object.assign(
 balanceReducer,
));
