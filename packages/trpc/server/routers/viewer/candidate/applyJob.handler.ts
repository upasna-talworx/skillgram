import logger from "@calcom/lib/logger";
import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import { TRPCError } from "@trpc/server";

import type { ApplyJobSchema } from "./applyJob.schema";
import { applyJobRoundsHandler } from "./applyJobRound.handler";

type createJobInput = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: ApplyJobSchema;
};

export const applyJobHandler = async ({ ctx, input }: createJobInput) => {
  const { user } = ctx;

  // add application to database
  try {
    const application = await prisma.jobApplication.create({
      data: {
        jobId: input.jobId,
        candidateEmail: input.email,
        candidateId: input.candidateId,
        status: input.status,
        verdict: input.verdict,
      },
    });

    const applyJobRounds = applyJobRoundsHandler({
      applicationId: application.applicationId,
      jobId: input.jobId,
    });
    // todo: error handling
  } catch (e) {
    logger.error(e);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Could not create Job",
    });
  }

  // return ?
};
