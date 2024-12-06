import type { GetServerSidePropsContext, NextApiResponse } from "next";

import logger from "@calcom/lib/logger";
import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import { TRPCError } from "@trpc/server";

import type { AdminSetupInputSchema } from "./setupAdmin.schema";

type setupAdmin = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: AdminSetupInputSchema;
};

export const setupAdminHandler = async ({ ctx, input }: setupAdmin) => {
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
    await prisma.admin.create({
      data: {
        userId: userId.id,
        name: input.name,
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
