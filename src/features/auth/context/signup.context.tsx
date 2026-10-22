import { useCallback, useMemo, useState, type ReactNode } from "react";
import { SIGNUP_STEPS, type SignupStep } from "./signup-steps";
import { SignupContext } from "./signup-context";
import type { ISignupContext } from "./use-signup";
// Provider component for the sign up context.
export function SignupProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<SignupStep>("email");
  const [email, setEmail] = useState("");
  const [userInfo, setUserInfo] = useState<ISignupContext["userInfo"]>(null);

  const stepIndex = SIGNUP_STEPS.indexOf(step) + 1;

  const goToStep = useCallback((next: SignupStep) => setStep(next), []);

  const goNext = useCallback(() => {
    setStep((current) => {
      const nextIndex = SIGNUP_STEPS.indexOf(current) + 1;
      return nextIndex < SIGNUP_STEPS.length ? SIGNUP_STEPS[nextIndex] : current;
    });
  }, []);

  const goBack = useCallback(() => {
    setStep((current) => {
      const prevIndex = SIGNUP_STEPS.indexOf(current) - 1;
      return prevIndex >= 0 ? SIGNUP_STEPS[prevIndex] : current;
    });
  }, []);
// Memoize the context value to avoid unnecessary re-renders.
  const value = useMemo(
    () => ({ step, stepIndex, email, userInfo, setEmail, setUserInfo, goToStep, goNext, goBack }),
    [step, stepIndex, email, userInfo, goToStep, goNext, goBack],
  );
// Provide the context value to the children components.
  return <SignupContext.Provider value={value}>{children}</SignupContext.Provider>;
}
