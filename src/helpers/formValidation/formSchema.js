import * as Yup from "yup";

export const loginFormSchema = Yup.object({
  username: Yup.string()
    .min(6, "Username must be at least 6 characters ")
    .max(10, "Username must be 10 or fewer characters long")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
export const newEntryValidationSchema = Yup.object({
  title: Yup.string()
    .min(10, "Title must be at least 10 characters ")
    .max(60, "Title must be 60 or fewer characters long")
    .required("Title is required"),
  body: Yup.string()
    .min(20, "Body must be at least 20 characters")
    .max(200, "Body must be 200 or fewer characters long")
    .required("Body is required"),
});
export const registerFormSchema = Yup.object({
  username: Yup.string()
    .min(6, "Username must be at least 6 characters ")
    .max(10, "Username must be 10 or fewer characters long")
    .required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});
