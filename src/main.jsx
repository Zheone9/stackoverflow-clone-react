import React, { createContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useSelector } from "react-redux";
// Agregue useSelector para seleccionar user de tu store de redux
import Modal from "react-modal";
import { PersistGate } from "redux-persist/integration/react";
import AppRouter from "./store/AppRouter";
import "./styles/styles.scss";
import configurePersistedStore from "./store/store.js";

const { store, persistor } = configurePersistedStore();
import { GoogleOAuthProvider } from "@react-oauth/google";

Modal.setAppElement("#root");
import { ProSidebarProvider } from "react-pro-sidebar";
import { io } from "socket.io-client";
import { initSocket } from "./socket/socket";
export const SocketContext = createContext();

const clientId =
  "591377311373-lldc1cgd8nu2b03rkv9p1l8qtbdh3pjs.apps.googleusercontent.com";

// Muevo el cuerpo principal a su propio componente para poder usar hooks
const MainComponent = () => {
  const user = useSelector((state) => state.auth?.user);
  // Selecciona user de tu store de redux

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(
      io("http://localhost:8080", {
        withCredentials: true,
      })
    );
  }, []);

  initSocket();

  return (
    <SocketContext.Provider value={socket}>
      <AppRouter />
    </SocketContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GoogleOAuthProvider clientId={clientId}>
        <ProSidebarProvider>
          <MainComponent />
        </ProSidebarProvider>
      </GoogleOAuthProvider>
    </PersistGate>
  </Provider>
);
