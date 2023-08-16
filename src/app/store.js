import { configureStore, combineReducers } from "@reduxjs/toolkit";
import transactionsReducer from "../features/transactions/transactionsSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "../features/user/userSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({ transactions: transactionsReducer, user: userReducer })
);

let store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          "user/fetchLogin/fulfilled",
          "transactions/post/fulfilled",
        ],
      },
    }),
});
const storeConfig = {
  manualPersist: true,
};
let persistor = persistStore(store, storeConfig);
export { store, persistor };
