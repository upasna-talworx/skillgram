import { z } from "zod";

export const ZGetJobSchema = z.object({
  jobId: z.number(),
});

export type GetJobSchema = z.infer<typeof ZGetJobSchema>;
