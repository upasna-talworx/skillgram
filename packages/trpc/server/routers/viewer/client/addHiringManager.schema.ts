import { z } from "zod";

export const ZAddHiringManagerSchema = z.object({
  jobId: z.number(),
  email: z.string(),
});

export type AddHiringManagerSchema = z.infer<typeof ZAddHiringManagerSchema>;
