import {
  applyMiddleware,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { userEntryReducer } from "../reducers/userEntryReducer";
import { userReducer } from "../reducers/userReducer";
import authReducer from "../reducers/authReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Usa el almacenamiento local predeterminado
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Solo persiste el estado de 'auth', agrega otros estados aquí si es necesario
};

const reducer = combineReducers({
  userEntries: userEntryReducer,
  auth: authReducer,
  user: userReducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);

export default () => {
  let store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            // Ignora las acciones de persist/PERSIST y persist/REHYDRATE
            "persist/PERSIST",
            "persist/REHYDRATE",
          ],
        },
      }).concat(thunk),
  });
  let persistor = persistStore(store);
  return { store, persistor };
};
