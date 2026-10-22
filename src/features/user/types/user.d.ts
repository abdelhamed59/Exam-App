import { changePasswordSchema } from './../schemas/changePasswordschema';
import type z from "zod";
import type { ROLES } from "../constants/role.constant";
import type { profile } from "../schemas/profile.schema";
import type { changeEmailSchema } from "../schemas/changeEmailSchema";
import type { emailOtpSchema } from "../schemas/emailOtpSchema";

export type IRole = (typeof ROLES)[keyof typeof ROLES];

export interface IUser {
  id: string;
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;

  profilePhoto: string | null;

  emailVerified: boolean;
  phoneVerified: boolean;

  role: IRole;

  createdAt: string;
  updatedAt: string;
}

export interface ICurrentUserResponse {
  user: IUser;
}


export type IProfileValues=z.infer<typeof profile>


export interface IUpdateProfileRequest {
  firstName: string;
  lastName: string;
  profilePhoto?: string;
  phone: string;
}

export type IChangeEmailFormValues = z.infer<typeof changeEmailSchema>;

export interface IRequestEmailChangeResponse {
  message: string;
  code?: string;
}

export type IEmailOtpFormValues = z.infer<typeof emailOtpSchema>;

export interface IConfirmEmailChangeResponse {
  message: string;
  user: IUser;
}


export type IChangePassword=z.infer<typeof changePasswordSchema>
export interface IChangePasswordResponse {
  message: string;
}