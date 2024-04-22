import {configureStore} from '@reduxjs/toolkit'
import restListReducer from './restListSlice'
import cartReducer from './cartSlice'
import paymentReducer from './paymentSlice'
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};
  
const reducer = combineReducers({
    restList : restListReducer,
    cart: cartReducer,
    payment:paymentReducer
});
  
const persistedReducer = persistReducer(persistConfig, reducer);
  

const appStore = configureStore({
    reducer : persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    })
})

export default appStore