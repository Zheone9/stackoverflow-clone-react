import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  menu: {
    backgroundColor: "red", // Define el color de fondo del menú
    borderRadius: "10px", // Define el borde del menú
  },
  menuItem: {
    color: "white", // Define el color de letra de los ítems del menú
    fontSize: "16px", // Define el tamaño de letra de los ítems del menú
    "&:hover": {
      // Define los estilos CSS para el estado "hover" de los ítems del menú
      backgroundColor: "blue",
      color: "black",
    },
  },
}));
export default useStyles;
