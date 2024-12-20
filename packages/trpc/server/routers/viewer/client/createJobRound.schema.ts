import { z } from "zod";

export const ZCreateJobRoundSchema = z.object({
  jobId: z.number(),
  rounds: z.array(
    z.object({
      type: z.enum(["QUIZ", "INTERVIEW", "RESUME_UPLOAD", "AI_INTERVIEW", "OTHER"]),
      maxScore: z.number(),
    })
  ),
});

export type CreateJobRoundSchema = z.infer<typeof ZCreateJobRoundSchema>;
