import React, { useEffect, useRef, useState } from "react";
import { useForm } from "../../../hooks/useForm";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import HCaptcha from "react-hcaptcha";
import formValidationSchema from "../../../helpers/newQuestion/formValidationSchema";
import validateForm from "../../../helpers/newQuestion/validateForm";
import { startNewQuestion } from "../../../actions/entries";

const CreateNewEntry = () => {
  const [formValues, handleInputChange, reset] = useForm({
    title: "",
    body: "",
    hCaptcha: "",
  });
  const siteKeyHcaptcha = import.meta.env.VITE_REACT_HCAPTCHA_SITEKEY;

  const { title, body } = formValues;
  const dispatch = useDispatch();

  const customError = (msg, props) => {
    if (props.touched && props.error) {
      return (
        <div className="error-message">
          <span role="img" aria-label="error">
            ❗ {msg}
          </span>
        </div>
      );
    }
    return null;
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const isValid = validateForm(values);
    console.log(values);
    console.log(isValid);
    if (isValid) {
      await dispatch(startNewQuestion(values));
      resetForm();
      reset();
      setSubmitting(false);
      window.location.reload();

    } else {
      console.log("invalido");
    }
  };

  const handleVerification = (token, setFieldValue) => {
    console.log("Verified: " + token);
    setFieldValue("hCaptcha", token);
  };

  return (
    <div className="new-question-container">
      <h2>Publicar una nueva pregunta</h2>
      <div className="div-question-title">
        <Formik
          initialValues={{ formValues, hCaptcha: "" }}
          validationSchema={formValidationSchema}
          onSubmit={handleSubmit}
          validateOnMount
        >
          {({ setFieldValue, errors, touched }) => (
            <Form>
              <div>
                <label htmlFor="title">Título</label>
                <Field
                  type="text"
                  name="title"
                  id="title"
                  value={title || ""}
                  onChange={(e) => {
                    handleInputChange(e);
                    setFieldValue("title", e.target.value, true);
                  }}
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  render={(msg, props) =>
                    customError(msg, {
                      touched: touched.title,
                      error: errors.title,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="body">Cuerpo</label>
                <Field
                  as="textarea"
                  name="body"
                  id="body"
                  value={body || ""}
                  onChange={(e) => {
                    handleInputChange(e);
                    setFieldValue("body", e.target.value, true);
                  }}
                />
                <ErrorMessage
                  name="body"
                  component="div"
                  render={(msg, props) =>
                    customError(msg, {
                      touched: touched.body,
                      error: errors.body,
                    })
                  }
                />
              </div>
              <div className="text-center">
                <HCaptcha
                  sitekey={siteKeyHcaptcha}
                  onVerify={(token) => handleVerification(token, setFieldValue)}
                  onExpire={() => {
                    setFieldValue("hCaptcha", "");
                  }}
                />
              </div>

              {errors.hCaptcha && touched.hCaptcha ? (
                <div className="error-message">{errors.hCaptcha}</div>
              ) : null}

              <div className="div-submit-form">
                <button type="submit" className="submit-button">
                  Enviar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateNewEntry;
