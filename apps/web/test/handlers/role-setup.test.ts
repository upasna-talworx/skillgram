import type { Request, Response } from "express";
import type { NextApiResponse, NextApiRequest } from "next";
import { createMocks } from "node-mocks-http";
import { describe, it, expect } from "vitest";

import handler from "../../pages/api/auth/role-setup";

type CustomNextApiRequest = NextApiRequest & Request;
type CustomNextApiResponse = NextApiResponse & Response;

describe("Tries to create an admin", () => {
  it("returns a 200 response with a message", async () => {
    const { req, res } = createMocks<CustomNextApiRequest, CustomNextApiResponse>({
      method: "POST",
      body: {
        data: {
          role: "admin",
          name: "xyz",
          email: "xyz@mail.com",
        },
      },
    });

    // Call the handler
    await handler(req, res);

    // Validate the response
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({ message: "Admin created successfully" });
  });
});

describe("Tries to create a candidate", () => {
  it("returns a 200 response with a message", async () => {
    const { req, res } = createMocks<CustomNextApiRequest, CustomNextApiResponse>({
      method: "POST",
      body: {
        data: {
          role: "candidate",
          name: "xyz",
          email: "xyz@mail.com",
          image: "imgUrl.com",
          bio: "my_bio",
          resume: "my_resumeUrl.com",
        },
      },
    });

    // Call the handler
    await handler(req, res);

    // Validate the response
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({ message: "Candidate created successfully" });
  });
});

describe("Tries to create a panellist", () => {
  it("returns a 200 response with a message", async () => {
    const { req, res } = createMocks<CustomNextApiRequest, CustomNextApiResponse>({
      method: "POST",
      body: {
        data: {
          role: "panellist",
          name: "xyz",
          email: "xyz@mail.com",
          company: "abc_company",
          yoe: "0",
          skills: ["skill1", "skill2"],
        },
      },
    });

    // Call the handler
    await handler(req, res);

    // Validate the response
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({ message: "Panellist created successfully" });
  });
});
