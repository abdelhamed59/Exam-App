// List of sign up steps, each step is a string that represents the current step in the sign up process.
export const SIGNUP_STEPS = ["email", "otp", "userInfo", "password"] as const;
// Type for the current step in the sign up process.
export type SignupStep = (typeof SIGNUP_STEPS)[number];
