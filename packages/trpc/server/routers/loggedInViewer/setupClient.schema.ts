import { z } from "zod";

export const ZClientSetupInputSchema = z.object({
  name: z.string(),
  companyID: z.number(),
});

export type ClientSetupInputSchema = z.infer<typeof ZClientSetupInputSchema>;
