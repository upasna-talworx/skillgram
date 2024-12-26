import { z } from "zod";

export const ZDeleteJobSchema = z.object({
  jobId: z.number(),
});

export type DeleteJobSchema = z.infer<typeof ZDeleteJobSchema>;
