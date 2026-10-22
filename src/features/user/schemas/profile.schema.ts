import { z } from "zod";

export const profile = z.object({
  firstName: z
    .string()
    .nonempty("First name is required")
    .min(2, "First name must be more than 2 characters")
    .max(20, "First name must be less than 20 characters"),

  lastName: z
    .string()
    .nonempty("Last name is required")
    .min(2, "Last name must be more than 2 characters")
    .max(20, "Last name must be less than 20 characters"),


  phone: z
    .string()
    .nonempty("Phone number is required")
    .regex(
    /^01[0125][0-9]{8}$/,
    "Please enter a valid Egyptian mobile number"
  ),

  profilePhoto: z.string().optional(),
});