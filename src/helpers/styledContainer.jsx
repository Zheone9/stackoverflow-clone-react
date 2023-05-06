import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const StyledContainer = ({ children }) => {
  const location = useLocation();
  const routeLocation = location.pathname.split("/")[1];
  const isProfileRoute = routeLocation === "profile";
  useEffect(() => {
    if ("auth" === routeLocation) {
      document.body.style.backgroundColor = "#F2F2F2"; // Establecer el color de fondo del body
    } else {
      document.body.style.backgroundColor = ""; // Restablecer el color de fondo del body al estilo predeterminado
    }

    // Limpiar el estilo cuando el componente se desmonta
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [location.pathname]);
  return (
    <div className={`container${isProfileRoute ? " no-padding" : ""}`}>
      {children}
    </div>
  );
};

export default StyledContainer;
