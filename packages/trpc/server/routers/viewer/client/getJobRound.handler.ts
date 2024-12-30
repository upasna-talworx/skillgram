import logger from "@calcom/lib/logger";
import { prisma } from "@calcom/prisma";

import { TRPCError } from "@trpc/server";

import type { TrpcSessionUser } from "../../../trpc";
import type { GetJobRoundSchema } from "./getJobRound.schema";

type getJobRoundInput = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: GetJobRoundSchema;
};

export const getJobRoundHandler = async ({ ctx, input }: getJobRoundInput) => {
  const jobId = input.jobId;
  try {
    const jobRounds = await prisma.jobRound.findMany({
      where: {
        jobId: jobId,
      },
      select: {
        jobId: true,
        roundId: true,
        roundType: true,
        roundNumber: true,
      },
    });
    return { jobRounds };
  } catch (e) {
    logger.error(e);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Could not fetch job round(s)",
    });
  }
};
