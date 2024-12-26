import { z } from "zod";

// have to make them optional as required
export const ZCreateJobSchema = z.object({
  jobDescription: z.string(),
  yearsOfExperience: z.number(),
  jobTitle: z.string(),
  skillsRequired: z.array(z.string()),
});

export type CreateJobSchema = z.infer<typeof ZCreateJobSchema>;
