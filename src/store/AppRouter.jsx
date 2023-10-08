import { BrowserRouter as Router } from "react-router-dom";
import Header from "../components/Header";
import MainContent from "../routers/MainContent";
import React, { useState } from "react";
import { getSocket } from "../socket/socket";
import CustomSnackbar from "../components/user/Profile/CustomSnackbar";

const AppRouter = () => {
  const [messageSnackbar, setMessageSnackbar] = useState(null);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    const socket = getSocket();
    // Comprueba que el socket exista antes de intentar configurar el oyente.
    if (socket) {
      socket.on("aceptarSolicitudAmistad", (data) => {
        setMessageSnackbar(`You are now friends with ${data.username}`);
        setOpen(true);
      });

      // No olvides deshacerte de los listeners cuando el componente se desmonte
      return () => {
        socket.off("aceptarSolicitudAmistad");
      };
    }
  }, []);

  return (
    <Router>
      <Header />
      <MainContent />
      <CustomSnackbar
        message={messageSnackbar}
        onClose={handleClose}
        setOpen={setOpen}
        open={open}
      />
    </Router>
  );
};

export default AppRouter;
