import * as Yup from "yup";

const formValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, "El título debe tener al menos 5 caracteres")
    .max(50, "El título debe tener un máximo de 50 caracteres")
    .required("El título es obligatorio"),
  body: Yup.string()
    .min(10, "El cuerpo debe tener al menos 10 caracteres")
    .max(500, "El cuerpo debe tener un máximo de 500 caracteres")
    .required("El cuerpo es obligatorio"),
  hCaptcha: Yup.string().required("Por favor completa el captcha"),
});
export default formValidationSchema;
