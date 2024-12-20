import logger from "@calcom/lib/logger";
import { prisma } from "@calcom/prisma";

import { TRPCError } from "@trpc/server";

import type { AddHiringManagerSchema } from "./addHiringManager.schema";

type addHiringManager = {
  input: AddHiringManagerSchema;
};

export const addHiringManagerHandler = async ({ input }: addHiringManager) => {
  // for each email (hiring manager) in input
  try {
    for (let i = 0; i < input.emails.length; i++) {
      // 1. fetch the clientId
      const clientId = await prisma.user.findUnique({
        where: {
          email: input.emails[i],
        },
        select: {
          id: true,
        },
      });

      // 2. populate JobClient relation
      if (typeof clientId === "number") {
        await prisma.jobClient.create({
          data: {
            jobId: input.jobId,
            clientId: clientId,
          },
        });
      } else {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorised to add hiring managers",
        });
      }
    }
    // return { message: Hiring Managers added successfully }
  } catch (e) {
    logger.error(e);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Could not add Hiring Member(s)",
    });
  }
};
