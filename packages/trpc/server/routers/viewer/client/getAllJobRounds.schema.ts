import { z } from "zod";

export const ZGetAllJobRoundsSchema = z.object({
  id: z.number(),
});

export type GetJobRoundSchema = z.infer<typeof ZGetAllJobRoundsSchema>;
