import formValidationSchema from "./formValidationSchema";

const validateForm = (formValues) => {
  try {
    formValidationSchema.validateSync(formValues, { abortEarly: false });
    return true;
  } catch (err) {
    return false;
  }
};
export default validateForm;
