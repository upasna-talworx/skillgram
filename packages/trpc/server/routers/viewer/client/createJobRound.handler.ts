import logger from "@calcom/lib/logger";
import { prisma } from "@calcom/prisma";

import { TRPCError } from "@trpc/server";

import type { TrpcSessionUser } from "../../../trpc";
import type { CreateJobRoundSchema } from "./createJobRound.schema";

type createJobRoundInput = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: CreateJobRoundSchema;
};

export const createJobRoundsHandler = async ({ ctx, input }: createJobRoundInput) => {
  const { jobId, roundType, roundNumber, maxScore } = input;

  // todo: error handling
  try {
    const jobRound = await prisma.jobRound.create({
      data: {
        jobId: jobId,
        roundType: roundType,
        roundNumber: roundNumber,
        maxScore: maxScore,
      },
    });
    return { jobRound };
  } catch (e) {
    logger.error(e);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Could not create Job Rounds",
    });
  }
};
