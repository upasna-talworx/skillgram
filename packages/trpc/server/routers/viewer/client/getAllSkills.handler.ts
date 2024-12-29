import logger from "@calcom/lib/logger";
import { prisma } from "@calcom/prisma";

import { TRPCError } from "@trpc/server";

export const getAllSkillsHandler = async (ctx) => {
  try {
    const skills = await prisma.Skill.findMany();
    return { skills: skills };
  } catch (e) {
    logger.error(e);
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Your request could not be processed",
    });
  }
};
