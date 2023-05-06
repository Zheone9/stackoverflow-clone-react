import React from "react";

import { useDispatch } from "react-redux";

import validateForm from "../../../helpers/newQuestion/validateForm";
import { startNewQuestion } from "../../../actions/entries";

import { newEntryValidationSchema } from "../../../helpers/formValidation/formSchema.js";
import EntryForm from "../EntryForm.jsx";

const CreateNewEntry = () => {
  const fields = [
    {
      name: "title",
      label: "Título",
      type: "text",
    },
    {
      name: "body",
      label: "Cuerpo",
      type: "textarea",
    },
    {
      name: "hCaptcha",
      type: "captcha",
    },
  ];

  const submitButton = (
    <div className="div-submit-form">
      <button type="submit" className="submit-button">
        Enviar
      </button>
    </div>
  );

  const siteKeyHcaptcha = import.meta.env.VITE_REACT_HCAPTCHA_SITEKEY;

  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
    const isValid = validateForm(values);
    console.log(values);
    console.log(isValid);
    if (isValid) {
      const success = await dispatch(startNewQuestion(values));
      if (!success) return console.log("crear nueva pregunta falló");
      actions.resetForm();
      window.location.reload();
    } else {
      console.log("invalido");
    }
  };

  return (
    <div className="new-question-container">
      <h2>Publicar una nueva pregunta</h2>
      <div className="div-question-title">
        <EntryForm
          initialValues={{ title: "", body: "", hCaptcha: "" }}
          onSubmit={handleSubmit}
          validationSchema={newEntryValidationSchema}
          submitButton={submitButton}
          fields={fields}
          siteKeyHcaptcha={siteKeyHcaptcha}
        />
      </div>
    </div>
  );
};

export default CreateNewEntry;
