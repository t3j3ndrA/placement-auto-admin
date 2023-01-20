import * as yup from "yup";

export default yup
  .object({
    email: yup.string().required("Email cannot be empty"),
    password: yup.string().required("Password cannot be empty"),
  })
  .required();
