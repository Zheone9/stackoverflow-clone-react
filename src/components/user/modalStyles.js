export const getCustomStylesRegisterUsername = () => {
  return {
    overlay: {
      zIndex: 1000000,
      backgroundColor: "rgba(67, 67, 67, 0.93)",
    },
    content: {
      borderRadius: "4px",
      border: "1px",
      display: "flex",
      justifyContent: "center",
      maxHeight: "400px",
      position: "fixed", // Establece la posición del modal como fija en relación a la ventana del navegador
      top: "10%", // Coloca el modal al 50% de la altura de la pantalla
      left: "50%", // Centra el modal horizontalmente
      transform: "translateX(-50%)", // Corrige la posición para tener en cuenta el ancho del modal
      width: "600px", // Ancho fijo del modal
      padding: "1.4rem",
      overflow: "auto",
    },
  };
};

export const getCustomStyles = () => {
  let customStyles = {
    overlay: {
      zIndex: 1000000,
      backgroundColor: "rgba(67, 67, 67, 0.93)",
      display: "flex",
      justifyContent: "center",
    },

    content: {
      background: "#FFFFFF",
      border: "none",
      borderRadius: "4px",
      display: "flex",
      justifyContent: "center",

      position: "fixed", // Establece la posición del modal como fija en relación a la ventana del navegador
      top: "10%", // Coloca el modal al 50% de la altura de la pantalla

      padding: "1.4rem",
      overflow: "auto",
    },
  };

  if (window.matchMedia("(min-width:482px").matches) {
    customStyles.content = {
      ...customStyles.content,
      maxWidth: "468px",

      // Añade o modifica las propiedades de estilo según lo necesario
    };
  }

  return customStyles;
};
