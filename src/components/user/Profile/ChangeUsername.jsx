import React from "react";

import { TextField } from "@mui/material";

const ChangeUsername = ({ formik, errorMsg }) => {
  return (
    <div>
      <div className="text-start d-flex div-changeUsername">
        <p className="p-small p-label">Account username</p>
        <TextField
          id={`outlined-basic-username`}
          label="Username"
          variant="outlined"
          name="username"
          fullWidth
          color="primary"
          style={{ maxWidth: "400px" }}
          className="form-control"
          type="text"
          size="small"
          {...formik.getFieldProps("username")}
          sx={{
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#085078", // Cambia esto al color deseado
            },
          }}
          InputProps={{ sx: { fontSize: "0.9rem" } }}
          InputLabelProps={{
            sx: { fontSize: "0.8rem" },
          }}
        />
      </div>
      <div className="text-center">
        <p className="p-error-message-input p-small">
          {formik.errors["username"] || errorMsg}
        </p>
      </div>
    </div>
  );
};
export default ChangeUsername;
