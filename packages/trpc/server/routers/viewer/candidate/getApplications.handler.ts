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
  const candidateId = user.id;
  const candidateEmail = user.email;

  try {
    const applications = await prisma.jobApplication.findMany({
      where: {
        candidateId: candidateId,
        candidateEmail: candidateEmail,
      },
      select: {
        applicationId: true,
        jobId: true,
        status: true,
        verdict: true,
      },
    });
    return { applications };
  } catch (e) {
    logger.error(e);
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Your request could not be processed",
    });
  }
};
