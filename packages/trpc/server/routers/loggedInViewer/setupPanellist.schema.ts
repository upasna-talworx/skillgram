import { z } from "zod";

export const ZPanellistSetupInputSchema = z.object({
  name: z.string(),
  company: z.string(),
  yoe: z.number({
    invalid_type_error: "Years of experience must be a number",
  }),
  skills: z.array(z.string()),
});

export type PanellistSetupInputSchema = z.infer<typeof ZPanellistSetupInputSchema>;
