import {combineReducers, configureStore} from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import {persistReducer} from "redux-persist";
import {persistStore} from "redux-persist";

import {userReducer} from "./slices/userSlice";
import {pizzaReducer} from "./slices/pizzaSlice";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const reducer = combineReducers({
    user: userReducer,
    pizza: pizzaReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
