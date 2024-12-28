import { createNextApiHandler } from "@calcom/trpc/server/createNextApiHandler";
import { clientRouter } from "@calcom/trpc/server/routers/viewer/client/_router";

export default createNextApiHandler(clientRouter);
