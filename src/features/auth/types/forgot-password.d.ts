import type z from "zod";
import type { forgotPasswordSchema } from "../schemas/forgot-password.schema";

export type IForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

// What actually gets sent to the API — the form only collects `email`;
// `redirectUrl` is an app concern (where the emailed link should land),
// added in the mutation, not typed by the user.
export interface IForgotPasswordRequest extends IForgotPasswordFormValues {
  redirectUrl: string;
}