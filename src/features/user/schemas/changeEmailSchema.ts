import { z } from "zod";

export const changeEmailSchema = z.object({
  newEmail: z.string().nonempty("Email is required").email("Enter a valid email address"),
});