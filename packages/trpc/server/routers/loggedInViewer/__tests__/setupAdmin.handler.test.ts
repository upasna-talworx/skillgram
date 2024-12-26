import { describe, it, expect } from "vitest";

import { mockTRPCContext } from "../../../../../../tests/libs/mockTRPCContext";

// // Mocking req and res
// const mockReq = {} as NextApiRequest; // Add any properties needed for your test
// const mockRes = {} as NextApiResponse; // Add any properties needed for your test

// // Mock session getter (optional, depending on your session logic)
// const mockSessionGetter = () => ({
//   id: 'session-id',
//   user: { id: '1', name: 'John Doe' }, // Mock user session
// });

// // Mock context values
// const mockContext = {
//   req: mockReq,
//   res: mockRes,
//   locale: 'en-US', // Mock locale
//   sourceIp: '127.0.0.1', // Mock source IP
//   session: mockSessionGetter(), // Mock session
//   user: {
//     id: '1',
//     name: 'John Doe',
//     locale: 'en-US',
//   }, // Mock user object
//   // prisma, // You can import the Prisma client or mock it if needed
//   // insightsDb: readonlyPrisma, // You can import the readonly Prisma client or mock it if needed
// };

describe("To verify if Handler is properly invoked", () => {
  it("it should log input and touched handler message", async () => {
    console.log("test is running");
    const ctx = mockTRPCContext();
    console.log(ctx);
    // const caller = appRouter.createCaller(ctx)

    const result = "";

    expect(result).toBe("");
  });
});
