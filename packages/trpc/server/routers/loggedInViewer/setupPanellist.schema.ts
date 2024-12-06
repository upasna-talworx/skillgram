import { z } from "zod";

export const ZPanellistSetupInputSchema = z.object({
  name: z.string(),
  company: z.string(),
  yoe: z.number(),
  skills: z.array(z.string()),
});

export type PanellistSetupInputSchema = z.infer<typeof ZPanellistSetupInputSchema>;
