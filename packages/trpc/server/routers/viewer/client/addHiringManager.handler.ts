import logger from "@calcom/lib/logger";
import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import { TRPCError } from "@trpc/server";

import type { AddHiringManagerSchema } from "./addHiringManager.schema";

type addHiringManager = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: AddHiringManagerSchema;
};

export const addHiringManagerHandler = async ({ ctx, input }: addHiringManager) => {
  // for each email (hiring manager) in input
  try {
    // 1. fetch the clientId
    const clientId = await prisma.user.findUnique({
      where: {
        email: input.email,
      },
      select: {
        id: true,
      },
    });

    // 2. populate JobClient relation
    await prisma.jobClient.create({
      data: {
        jobId: input.jobId,
        clientId: clientId,
      },
    });
    // return ??
  } catch (e) {
    logger.error(e);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Could not add Hiring Member(s)",
    });
  }
};
