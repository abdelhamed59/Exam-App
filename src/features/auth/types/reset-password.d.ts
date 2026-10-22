import type z from "zod";
import type { resetPasswordSchema } from "../schemas/reset-password.schema";

export type IResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

// What actually gets sent to the API — the token comes from the emailed
// link (URL), not from the form, and the field is `newPassword` server-side
// even though the form/schema calls it `password`.
export interface IResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}