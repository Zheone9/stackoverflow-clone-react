// CustomFormik.js
import React from "react";
import { useFormik } from "formik";
import { TextField } from "@mui/material";

const CustomFormik = ({
  initialValues,
  onSubmit,
  validationSchema,
  submitButton,
  fields,
  handleFieldChange = () => {},
}) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit} onChange={handleFieldChange}>
      {fields.map((field) => (
        <div key={field.name} className="form-group">
          <TextField
            id={`outlined-basic-${field.name}`}
            label={field.label}
            variant="outlined"
            name={field.name}
            fullWidth
            color="primary"
            style={{ maxWidth: "400px" }}
            className="form-control"
            type={field.type}
            onChange={handleFieldChange}
            size="small"
            {...formik.getFieldProps(field.name)}
            sx={{
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#085078", // Cambia esto al color deseado
                },
            }}
            InputProps={{ sx: { fontSize: "0.9rem" } }}
            InputLabelProps={{
              sx: { fontSize: "0.8rem" },
            }}
          />
          {formik.touched[field.name] && formik.errors[field.name] && (
            <p className="p-error-message-input p-small">
              {formik.errors[field.name]}
            </p>
          )}
        </div>
      ))}
      {submitButton}
    </form>
  );
};
export default CustomFormik;
