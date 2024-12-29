import { z } from "zod";

// have to make them optional as required
export const ZCreateJobSchema = z.object({
  yearsOfExperience: z.number(),
  jobTitle: z.string(),
});

export type CreateJobSchema = z.infer<typeof ZCreateJobSchema>;
