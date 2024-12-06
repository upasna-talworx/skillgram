import { z } from "zod";

export const ZClientSetupInputSchema = z.object({
  name: z.string(),
});

export type ClientSetupInputSchema = z.infer<typeof ZClientSetupInputSchema>;
