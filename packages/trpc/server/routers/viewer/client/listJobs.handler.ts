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
    return { jobs: jobIds };
  } catch (e) {
    logger.error(e);
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Your request could not be processed",
    });
  }
};
