import { useContext } from "react";
import { SignupContext } from "./signup-context";
import type { SignupStep } from "./signup-steps";
import type { ISignupUserInfoFormValues } from "../types/signup";

// Interface for the sign up context.
export interface ISignupContext {
  step: SignupStep;
  stepIndex: number;
  email: string;
  userInfo: ISignupUserInfoFormValues | null;
  setEmail: (email: string) => void;
  setUserInfo: (info: ISignupUserInfoFormValues) => void;
  goToStep: (step: SignupStep) => void;
  goNext: () => void;
  goBack: () => void;
}

// Custom hook to use the sign up context.
export function useSignup(): ISignupContext {
  const ctx = useContext(SignupContext);
  // Throw an error if the hook is used outside of the provider.
  if (!ctx) throw new Error("useSignup must be used inside a <SignupProvider>");
  return ctx;
}
