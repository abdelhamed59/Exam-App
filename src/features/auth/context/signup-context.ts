import { createContext } from "react";
import type { ISignupContext } from "./use-signup";

// Create the sign up context.
export const SignupContext = createContext<ISignupContext | null>(null);
