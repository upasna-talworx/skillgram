import { z } from "zod";

export const ZApplyJobRoundSchema = z.object({
  applicationId: z.number(),
  jobId: z.number(),
});

export type ApplyJobRoundSchema = z.infer<typeof ZApplyJobRoundSchema>;
