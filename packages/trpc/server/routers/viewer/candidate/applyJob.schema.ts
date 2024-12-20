import { z } from "zod";

// have to make them optional as required
export const ZApplyJobSchema = z.object({
  jobId: z.number(),
  email: z.string(),
  candidateId: z.number().optional().nullable(),
  status: z.enum(["EMAIL_SENT", "ACCOUNT_CREATED", "IN_PROCESS", "COMPLETED"]),
  verdict: z.enum(["STRONG_HIRE", "HIRE", "WEAK_HIRE", "NO_HIRE", "IN_PROCESS"]),
});

export type ApplyJobSchema = z.infer<typeof ZApplyJobSchema>;
