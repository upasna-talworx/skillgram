import type { GetServerSidePropsContext, NextApiResponse } from "next";

import logger from "@calcom/lib/logger";
import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import { TRPCError } from "@trpc/server";

import type { PanellistSetupInputSchema } from "./setupPanellist.schema";

type setupPanellist = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: PanellistSetupInputSchema;
};

export const setupPanellistHandler = async ({ ctx, input }: setupPanellist) => {
  const { user } = ctx;
  const email = user.email;

  const userId = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
    },
  });

  if (!userId) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `User with email '${email}' not found.`,
    });
    return;
  }

  try {
    await prisma.panellist.create({
      data: {
        userId: userId.id,
        name: input.name,
        company: input.company,
        yearsOfExperience: input.yoe,
        skills: input.skills,
      },
    });
  } catch (e) {
    logger.error(e);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Could not create admin",
    });
    return;
  }
  // return ?
};
