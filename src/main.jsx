import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import Modal from "react-modal";
import { PersistGate } from "redux-persist/integration/react";
import AppRouter from "./store/AppRouter";
import "./styles/styles.scss";
import configurePersistedStore from "./store/store.js";
const { store, persistor } = configurePersistedStore();
import { GoogleOAuthProvider } from "@react-oauth/google";
Modal.setAppElement("#root");
const clientId =
  "591377311373-lldc1cgd8nu2b03rkv9p1l8qtbdh3pjs.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GoogleOAuthProvider clientId={clientId}>
        <AppRouter />
      </GoogleOAuthProvider>
    </PersistGate>
  </Provider>
);
