import { z } from "zod";

export const ZCandidateSetupInputSchema = z.object({
  name: z.string(),
  image: z.string(),
  bio: z.string(),
  resume: z.string(),
});

export type CandidateSetupInputSchema = z.infer<typeof ZCandidateSetupInputSchema>;
