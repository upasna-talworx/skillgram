import { z } from "zod";

// have to make them optional as required
export const ZConnectTeam = z.object({
  teamId: z.number(),
  roundId: z.number(),
});

export type ConnectTeam = z.infer<typeof ZConnectTeam>;
