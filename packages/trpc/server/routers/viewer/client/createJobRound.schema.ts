import { z } from "zod";

export const ZCreateJobRoundSchema = z.object({
  jobId: z.number(),
  roundType: z.enum(["QUIZ", "INTERVIEW", "RESUME_UPLOAD", "AI_INTERVIEW", "OTHER"]),
  maxScore: z.number(),
  roundNumber: z.number(),
});

export type CreateJobRoundSchema = z.infer<typeof ZCreateJobRoundSchema>;
