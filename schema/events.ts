import { z } from "zod";

export const eventSchema = z.object({
  name: z.string().min(2, "Required"),
  isActive: z.boolean().default(true),
  description: z.string().optional(),
  durationInMinutes: z.coerce
    .number()
    .int()
    .positive("Duration must be greater than zero")
    .max(60 * 12, `Duration must be less than 12 hours (${60 * 12} minutes)`),
});
