import * as yup from "yup";
export const signupInputSchema = yup.object().shape({
  firstName: yup.string().required("first name is required"),
  lastName: yup.string().required("last name is required"),
  email: yup
    .string()
    .email()
    .required("email is required"),
  password: yup
    .string()
    .min(8, "password must be atleast 8 charachters long")
    .max(150)
    .required("password is required")
});

export const loginInputSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("email is required"),
  password: yup.string().required("password is required")
});

export const validateEmailSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("email is required")
});

export const validatePasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "password must be atleast 8 charachters long")
    .max(150)
    .required("password is required")
});

export const stepOneSchema = yup.object().shape({
  studioName: yup.string().required(),
  description: yup.string().required(),
  studioType: yup.string().required(),
  pastClients: yup.string()
});

export const stepTwoSchema = yup.object().shape({
  minimumHours: yup.string(),
  studioHours: yup.string().required(),
  policyRules: yup.string()
});

export const stepThreeSchema = yup.object().shape({
  amenities: yup.string().required(),
  mainEquipments: yup.string().required()
});

export const stepFourSchema = yup.object().shape({
  address: yup.string().required(),
  latitude: yup.number().required(),
  longitude: yup.number().required(),
  pricePerHour: yup
    .number()
    .moreThan(0, "price is a required field")
    .required()
});

export const stepFiveSchema = yup.object().shape({
  pictureUrl: yup
    .array()
    .min(1)
    .required()
});
