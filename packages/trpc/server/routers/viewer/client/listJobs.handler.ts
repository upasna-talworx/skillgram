import logger from "@calcom/lib/logger";
import { prisma } from "@calcom/prisma";

import { TRPCError } from "@trpc/server";

import type { TrpcSessionUser } from "../../../trpc";

type ListOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
};

export const listJobsHandler = async ({ ctx }: ListOptions) => {
  const { user } = ctx;

  try {
    const jobIds = await prisma.jobClient.findMany({
      where: {
        clientId: user.id,
      },
      select: {
        jobId: true,
      },
    });

    // Extract jobId values into an array
    const jobIdArray = jobIds.map((job) => job.jobId);

    // fetch job details from job relation
    const jobs = await prisma.jobs.findMany({
      where: {
        jobId: {
          in: jobIdArray,
        },
      },
    });

    return { jobs };
  } catch (e) {
    logger.error(e);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Could not fetch your jobs",
    });
  }
};
