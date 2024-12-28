import { z } from "zod";

export const ZListCandidateSchema = z.object({
  jobId: z.number(),
});

export type ListCandidateSchema = z.infer<typeof ZListCandidateSchema>;
