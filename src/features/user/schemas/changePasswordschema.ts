import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().nonempty("Password is required"),
    newPassword: z.string().nonempty("Please enter your new password"),
    confirmPassword:z.string().nonempty("Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
