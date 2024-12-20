import { z } from "zod";

export const ZAddHiringManagerSchema = z.object({
  jobId: z.number(),
  emails: z.array(z.string()),
});

export type AddHiringManagerSchema = z.infer<typeof ZAddHiringManagerSchema>;
