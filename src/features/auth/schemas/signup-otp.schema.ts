import { z } from "zod";

export const signupOtpSchema = z.object({
  code: z.string().length(6, "Enter the full 6-digit code"),
});
