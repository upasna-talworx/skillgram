import { z } from "zod";

export const ZAdminSetupInputSchema = z.object({
  name: z.string(),
});

export type AdminSetupInputSchema = z.infer<typeof ZAdminSetupInputSchema>;
