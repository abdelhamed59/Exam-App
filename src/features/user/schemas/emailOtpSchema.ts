import { z } from "zod";

export const emailOtpSchema = z.object({
  code: z.string().length(6, "Enter the full 6-digit code"),
});