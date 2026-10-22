import type z from "zod";
import type { signupEmailSchema } from "../schemas/signup-email.schema";
import type { signupOtpSchema } from "../schemas/signup-otp.schema";
import type { signupUserInfoSchema } from "../schemas/signup-user-info.schema";
import type { signupPasswordSchema } from "../schemas/signup-password.schema";
import type { IUser } from "@/features/user/types/user";

export type ISignupEmailFormValues = z.infer<typeof signupEmailSchema>;
export type ISignupOtpFormValues = z.infer<typeof signupOtpSchema>;
export type ISignupUserInfoFormValues = z.infer<typeof signupUserInfoSchema>;
export type ISignupPasswordFormValues = z.infer<typeof signupPasswordSchema>;

// Matches the real /auth/register contract exactly (Swagger): everything is
// sent together in ONE call at the very last step, after email + OTP are verified.
export type ISignupCompleteRequest = ISignupUserInfoFormValues &
ISignupPasswordFormValues &
Pick<ISignupEmailFormValues, "email">;

export interface ISignupCompleteResponse {
  user: IUser;
  token: string;
}
