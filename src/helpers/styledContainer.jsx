import { useLocation } from "react-router-dom";
import {useEffect} from "react";

const StyledContainer = ({ children }) => {
  const location = useLocation();
  const pathsBackgroundGrey = ["/auth/login", "/auth/register"];


  useEffect(() => {
    if (pathsBackgroundGrey.includes(location.pathname)) {
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
    <div className="container" >
      {children}
    </div>
  );
};

export default StyledContainer;
