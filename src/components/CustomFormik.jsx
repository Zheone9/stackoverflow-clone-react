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
            className="form-control"
            type={field.type}
            onChange={handleFieldChange}
            size={field.size}
            {...formik.getFieldProps(field.name)}
          />
          {formik.touched[field.name] && formik.errors[field.name] && (
            <p className="p-error-message-input">{formik.errors[field.name]}</p>
          )}
        </div>
      ))}
      {submitButton}
    </form>
  );
};
export default CustomFormik;
