import { z } from "zod";

export const ZGetSkillSchema = z.object({
  skillId: z.number(),
});

export type GetSkillSchema = z.infer<typeof ZGetSkillSchema>;
