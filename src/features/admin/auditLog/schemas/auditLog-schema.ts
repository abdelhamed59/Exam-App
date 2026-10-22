import { z } from "zod";

export const auditLogSearchFiltersSchema = z.object({
  category: z.enum(["DIPLOMA", "EXAM", "QUESTION", "USER", "SYSTEM"]).optional(),
  action: z.enum(["CREATE", "UPDATE", "DELETE", "SET_IMMUTABLE", "SEED_DATA"]).optional(),
  actorUserId: z.string().optional(),
});