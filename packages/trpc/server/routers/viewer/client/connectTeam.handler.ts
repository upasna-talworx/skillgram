import logger from "@calcom/lib/logger";
import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import { TRPCError } from "@trpc/server";

import type { ConnectTeam } from "./connectTeam.schema";

type connectTeamInput = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: ConnectTeam;
};

export const connectTeamHandler = async ({ ctx, input }: connectTeamInput) => {
  const { user } = ctx;
  try {
    const connect = await prisma.jobRound.update({
      where: {
        roundId: input.roundId,
      },
      data: {
        teamId: input.teamId,
      },
    });

    return { connect };
  } catch (e) {
    logger.error(e);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Could not connect Team",
    });
  }
};
