import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().nonempty("Email is required").email("Enter a valid email address"),
});
