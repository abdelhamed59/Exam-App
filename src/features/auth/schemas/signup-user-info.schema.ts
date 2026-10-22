import { z } from "zod";

export const signupUserInfoSchema = z.object({
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
  username: z.string().nonempty("Username is required"),
  phone: z.string().nonempty("Phone number is required"),
});
