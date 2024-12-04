import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { PersistConfig } from 'redux-persist/es/types';
import authReducer from '../slices/authSlice'; 
import themeReducer from '../slices/themeSlice';
import adminReducer from '../slices/adminSlice'
import advertisementRedcer from '../slices/addSlice'
export type RootState = ReturnType<typeof rootReducer>;


const rootReducer = combineReducers({
  auth: authReducer,
  theme:themeReducer,
  admin: adminReducer,
  ad:advertisementRedcer
});


const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage,
  whitelist: ['auth','theme','admin','ad'], 
};


const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


export const persistor = persistStore(store);
export default store;
