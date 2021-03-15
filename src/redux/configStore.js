import {combineReducers,createStore,applyMiddleware} from 'redux'
import {QuanLiPhimReducer} from './reducers/QuanLiPhimReducer'
import reduxThunk from 'redux-thunk'
const rootReducer=combineReducers({
   QuanLiPhimReducer
});
export const store= createStore(rootReducer,applyMiddleware(reduxThunk))