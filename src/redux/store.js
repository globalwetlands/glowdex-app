import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit'

import globalSettingsSlice from './globalSettingsSlice'
import gridItemsSlice from './gridItemsSlice'

const createPersistedReducer = ({ key, reducer, config = {} }) => {
  const persistConfig = {
    key,
    storage,
    ...config,
  }

  const persistedReducer = persistReducer(persistConfig, reducer)
  return persistedReducer
}

const rootReducer = combineReducers({
  globalSettings: globalSettingsSlice,
  gridItems: gridItemsSlice,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})
export const persistor = persistStore(store)
