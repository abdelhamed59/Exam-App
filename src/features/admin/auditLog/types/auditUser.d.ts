import type { IPaginatedPayload } from "@/shared/types/api";

export interface IAdminUser {
  id: string;
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  profilePhoto: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
  createdAt: string;
  updatedAt: string;
}



export type IAdminUsersListResponse  = IPaginatedPayload<IAdminUser>;


export interface IAdminUsersParams {
  page: number;
  limit: number;
  role?: "USER" | "ADMIN" | "SUPER_ADMIN";
  immutable?: boolean;
  sortBy?: "username" | "email" | "role" | "createdAt";
  sortOrder?: "asc" | "desc";
  search?: string;
}

