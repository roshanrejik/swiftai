import * as yup from "yup";
const emojiRegex =
  /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{1FB00}-\u{1FBFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2300}-\u{23FF}\u{2B50}\u{2B55}\u{3030}\u{303D}\u{3297}\u{3299}\u{25B6}\u{25C0}\u{25FB}-\u{25FE}\u{2B1B}\u{2B1C}\u{2B50}\u{2B55}\u{2194}-\u{21AA}\u{2B05}-\u{2B07}\u{2934}\u{2935}\u{2795}\u{2796}\u{2797}\u{27A1}\u{27B0}\u{27BF}\u{2B05}\u{2B06}\u{2B07}\u{2934}\u{2935}\u{2B1B}\u{2B1C}\u{2B50}\u{2B55}]/gu;

const ValidationSchema = {
  loginValidation: yup.object().shape({
    emailOrUsername: yup
      .string()
      .required("Please enter a valid email")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
      .matches(/^[\x00-\x7F]*$/, "Email should not contain emojis"),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
  }),
  forgetPasswordValidation: yup.object().shape({
    email: yup
      .string()
      .required("Please enter a valid email")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
      .matches(/^[\x00-\x7F]*$/, "Email should not contain emojis"),
  }),
signupValidation: yup.object().shape({
  email: yup
    .string()
    .required("Please enter a valid email")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
    .matches(/^[\x00-\x7F]*$/, "Email should not contain emojis"),

  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least 1 lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least 1 uppercase letter")
    .matches(/[0-9]/, "Password must contain at least 1 number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least 1 special character"
    )
    .required("Password is required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),

  fullName: yup.string().required("Username is required"),

  phoneNo: yup
    .string()
    .nullable()
    .notRequired()
    .matches(
      /^\+?[0-9\s\-()]{9,}$/,
      "Enter a valid phone number with at least 9 digits"
    ),

  dateOfBirth: yup.string().nullable().notRequired(),
}),


  socialSignInValidation: yup.object().shape({
    // email: yup
    //   .string()
    //   .email('Please enter a valid email or user name')
    //   .required('Email Address is Required'),
    username: yup.string().required("Please enter a valid user name"),
    fullName: yup.string().required("Full name is required"),
    dob: yup.string().required("Age is required"),
    phoneNo: yup.string().notRequired(),
    gender: yup.string().required("Gender is required"),
  }),
  resetPasswordValidation: yup.object().shape({
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least 1 lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least 1 uppercase letter")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least 1 special character"
      )
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  }),
  changePasswordValidation: yup.object().shape({
    oldPassword: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least 1 lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least 1 uppercase letter")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least 1 special character"
      )
      .required("Password is required"),
    newPassword: yup
      .string()
      .min(8, "New Password must be at least 8 characters")
      .matches(/[a-z]/, "New Password must contain at least 1 lowercase letter")
      .matches(/[A-Z]/, "New Password must contain at least 1 uppercase letter")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "New Password must contain at least 1 special character"
      )
      .required("New Password is required")
      .notOneOf(
        [yup.ref("currentPassword"), null],
        "New Password must not match with current password"
      ),
    reEnterPassword: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .oneOf([yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm Password is required"),
  }),
  editProfileValidation: yup.object().shape({
    username: yup.string().required("Please enter a valid user name"),
    name: yup
      .string()
      .required("Full name is required")
      .matches(
        /^[^\d]{3,}$/,
        "Full name should not contain numbers and be at least 3 characters long"
      ),
  }),
  contactSuppoValidation: yup.object().shape({
    email: yup
      .string()
      .notRequired()
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
      .matches(/^[\x00-\x7F]*$/, "Email should not contain emojis"),
    message: yup
      .string()
      .min(10, "Message Name must be at least 10 characters")
      .max(300, "Message must not exceed 300 characters")
      .required("Please enter a valid message"),
    fullName: yup
      .string()
      .min(2, "Full Name must be at least 2 characters")
      .max(50, "Full Name must be at most 50 characters")
      .notRequired(),
  }),
  editProfile: yup.object().shape({
    // email: yup
    //   .string()
    //   .notRequired()
    //   .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
    //   .matches(/^[\x00-\x7F]*$/, "Email should not contain emojis"),
    // name: yup
    //   .string()
    //   .min(2, "Full Name must be at least 2 characters")
    //   .max(100, "Full Name must be at most 50 characters")
    //   .required(),
    // phoneNumber: yup
    //   .string()
    //   .min(5, "Full Name must be at least 2 characters")
    //   .max(50, "Phone no. Name must be at most 50 digits")
    //   .notRequired(),
    // age: yup.number().lessThan(1000, "Age Name must be at most 3 digits"),
  }),
};

export default ValidationSchema;
