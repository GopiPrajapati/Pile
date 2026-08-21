import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { createMigrate, persistReducer, persistStore } from 'redux-persist';
import authReducer from './slices/authSlice';
import eventsReducer from './slices/eventsSlice';
import favoritesReducer from './slices/favoritesSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
  // Events are intentionally excluded so each launch retrieves current data.
  whitelist: ['auth', 'favorites'],
  // Earlier app builds stored whole event objects in `favorites.items`.
  // The Toolkit slice stores stable event IDs in `favorites.ids` instead.
  migrate: createMigrate(
    {
      1: state => {
        const legacyItems = state?.favorites?.items;
        if (!Array.isArray(legacyItems)) return state;

        return {
          ...state,
          favorites: {
            ids: legacyItems.map(event =>
              String(
                event.event_date_id ??
                  event.id ??
                  event.event_id ??
                  event.event_url ??
                  '',
              ),
            ),
          },
        };
      },
    },
    { debug: __DEV__ },
  ),
};

const rootReducer = combineReducers({
  auth: authReducer,
  events: eventsReducer,
  favorites: favoritesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
export default store;
