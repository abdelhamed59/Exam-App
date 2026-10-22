import type z from "zod";
import type { loginSchema } from "../schemas/login.schema";
import type { IUser } from "@/features/user/types/user";

export type ILoginFormValues = z.infer<typeof loginSchema>;

export interface ILoginResponse {
  user: IUser;
  token: string;
}
