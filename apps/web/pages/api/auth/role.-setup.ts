import type { NextApiRequest, NextApiResponse } from "next";

import { HttpError } from "@calcom/lib/http-error";
import logger from "@calcom/lib/logger";
import prisma from "@calcom/prisma";

type AdminData = {
  name: string;
  user: {
    id: number;
  };
};

type CandidateData = {
  name: string;
  image: string;
  bio: string;
  resume: string;
  user: {
    id: number;
  };
};

type PanellistData = {
  name: string;
  company: string;
  yoe: number;
  skills: string[];
  user: {
    id: number;
  };
};

type ClientData = {
  // ?
  user: {
    id: number;
  };
};

function ensureReqIsPost(req: NextApiRequest) {
  if (req.method !== "POST") {
    throw new HttpError({
      statusCode: 405,
      message: "Method not allowed",
    });
  }
}

async function handleAdminSetup(req: AdminData, res: NextApiResponse) {
  try {
    await prisma.admin.create({
      data: {
        userId: req.user.id,
        name: req.name,
      },
    });
    res.status(200).json({ message: "Admin created successfully" });
  } catch (e) {
    logger.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function handleCandidateSetup(req: CandidateData, res: NextApiResponse) {
  try {
    await prisma.candidate.create({
      data: {
        userId: req.user.id,
        name: req.name,
        image: req.image,
        bio: req.bio,
        resume: req.resume,
      },
    });
    res.status(200).json({ message: "Candidate created successfully" });
  } catch (e) {
    logger.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function handlePanellistSetup(req: PanellistData, res: NextApiResponse) {
  try {
    await prisma.panellist.create({
      data: {
        userId: req.user.id,
        name: req.name,
        company: req.company,
        yearsOfExperience: req.yoe,
        skills: req.skills,
      },
    });
    res.status(200).json({ message: "Panellist created successfully" });
  } catch (e) {
    logger.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function handleClientSetup(req: ClientData, res: NextApiResponse) {
  return;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 1. ensure request is POST (ask Anshul why it is done)
  ensureReqIsPost(req);

  const data = req.body.data;
  const role = data.role;

  // 2. Fetch the user id with the specific user email
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    console.log(`User with email '${data.email}' not found.`);
    return;
  }

  // 3. Call corresponding handler
  try {
    if (role === "admin") {
      return handleAdminSetup({ ...data, user }, res);
    } else if (role === "candidate") {
      return handleCandidateSetup({ ...data, user }, res);
    } else if (role === "panellist") {
      return handlePanellistSetup({ ...data, user }, res);
    } else if (role === "client") {
      return handleClientSetup({ ...data, user }, res);
    } else {
      return res.status(400).json({ error: "Invalid role" });
    }
  } catch (e) {
    if (e instanceof HttpError) {
      return res.status(e.statusCode).json({ message: e.message });
    }
    logger.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// client left
