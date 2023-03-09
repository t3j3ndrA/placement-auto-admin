import * as yup from "yup";

export default yup
  .object({
    name: yup.string().required("Name is required"),
    description: yup.string(),
    website: yup.string().required("Website is required"),
    email: yup.string().required("Email is required."),
    packageInLPA: yup.number().required("Package in LCPA is required"),
  })
  .required();
