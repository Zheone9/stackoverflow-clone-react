import React, { useEffect } from "react";

import { useDispatch } from "react-redux";

import validateForm from "../../../helpers/newQuestion/validateForm";
import { setNewQuestion, startNewQuestion } from "../../../actions/entries";

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
  useEffect(() => {
    return () => {
      console.log("se salio");
      dispatch(setNewQuestion(false));
    };
  }, []);
  const handleSubmit = async (values, actions) => {
    const isValid = validateForm(values);
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
      <h4 className="mb-2">Publicar una nueva pregunta</h4>
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
