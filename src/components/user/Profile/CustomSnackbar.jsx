import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Box from "@material-ui/core/Box";
import { Slide } from "@mui/material";

const CustomSnackbar = ({ message, onClose, setOpen, open }) => {
  function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
  }
  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      message={message}
      direction="left"
      autoHideDuration={1600}
      TransitionComponent={TransitionUp}
    >
      <SnackbarContent
        message={
          <Box display="flex" alignItems="center">
            <CheckBoxIcon />
            {message}
          </Box>
        }
        sx={{
          backgroundColor: "#3D8EB9",
          color: "white",
          fontSize: "0.77rem",
        }}
      />
    </Snackbar>
  );
};

export default CustomSnackbar;
