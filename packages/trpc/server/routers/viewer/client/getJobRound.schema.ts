import { z } from "zod";

export const ZGetJobRoundSchema = z.object({
  jobId: z.number(),
});

export type GetJobRoundSchema = z.infer<typeof ZGetJobRoundSchema>;
