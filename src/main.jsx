import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import Modal from "react-modal";
import { PersistGate } from "redux-persist/integration/react";
import AppRouter from "./store/AppRouter";
import "./styles/styles.scss";
import configurePersistedStore from "./store/store.js";
const { store, persistor } = configurePersistedStore();

Modal.setAppElement("#root");
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
);
