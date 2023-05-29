import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const EntryForm = ({
  initialValues,
  onSubmit,
  validationSchema,
  submitButton,
  fields,
  siteKeyHcaptcha,
}) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  const hCaptchaRef = useRef(null);

  return (
    <form onSubmit={formik.handleSubmit}>
      {fields.map((field) => (
        <div key={field.name} className="form-group">
          {field.type === "textarea" ? (
            <TextField
              id={`outlined-basic-${field.name}`}
              label={field.label}
              name={field.name}
              color="primary"
              multiline
              rows={1}
              fullWidth
              variant="outlined"
              className="form-control"
              {...formik.getFieldProps(field.name)}
            />
          ) : field.type === "captcha" ? null : (
            <TextField
              id={`outlined-basic-${field.name}`}
              label={field.label}
              variant="outlined"
              name={field.name}
              fullWidth
              color="primary"
              className="form-control"
              type={field.type}
              {...formik.getFieldProps(field.name)}
            />
          )}

          {formik.touched[field.name] && formik.errors[field.name] && (
            <p className="p-error-message-input">{formik.errors[field.name]}</p>
          )}
        </div>
      ))}
      <div className="text-center">
        <HCaptcha
          ref={hCaptchaRef}
          sitekey={siteKeyHcaptcha}
          onVerify={(token) => formik.setFieldValue("hCaptcha", token)}
          onExpire={() => {
            formik.setFieldValue("hCaptcha", "");
          }}
        />
      </div>
      {submitButton}
    </form>
  );
};
export default EntryForm;
