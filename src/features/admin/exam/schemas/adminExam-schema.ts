import { z } from "zod";

export const examSearchFiltersSchema = z.object({
  search: z.string().trim(),

  immutable: z.enum(["None", "Mutable", "Immutable"]),

  diplomaId: z.string(),
});

export const adminExamSchema = z.object({
  image: z.string().optional(),
  title: z.string().nonempty("Title is required"),
  description: z.string(),
  duration:z.number().max(120,"exam duration must be less than or equal 120 minutes"),
  diplomaId:z.string().nonempty("Diploma is required")
});
