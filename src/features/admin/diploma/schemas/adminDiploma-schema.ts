import { z } from "zod";

export const diplomaSearchFiltersSchema = z.object({
  search: z.string().trim(),

  immutable: z.enum(["None", "Mutable", "Immutable"]),
});



export const adminDiplomaSchema = z.object({
  image: z.string().optional(),
  title: z.string().nonempty("Title is required"),
  description: z.string(),
});
