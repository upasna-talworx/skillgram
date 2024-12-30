import { z } from "zod";

export const ZAddCandidateSchema = z.object({
  jobId: z.number(),
  email: z.string(),
});

export type AddCandidateSchema = z.infer<typeof ZAddCandidateSchema>;
