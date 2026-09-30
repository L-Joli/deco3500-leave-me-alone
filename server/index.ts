import { createServer } from "node:http";
import { resolve } from "node:path";

import express from "express";
import { Server } from "socket.io";

import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../src/types/domain";
import { registerSocketEvents } from "./events";
import { getLanAddresses } from "./network";

const port = Number(process.env.PORT) || 3000;
const host = "0.0.0.0";
const isProduction =
  process.env.NODE_ENV === "production" || process.argv.includes("--production");
const app = express();
const httpServer = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer);

io.on("connection", (socket) => registerSocketEvents(io, socket));

if (isProduction) {
  const distPath = resolve(process.cwd(), "dist");
  app.use(express.static(distPath));
  app.use((_request, response) => {
    response.sendFile(resolve(distPath, "index.html"));
  });
} else {
  const { createServer: createViteServer } = await import("vite");
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
}

httpServer.listen(port, host, () => {
  console.log("\nFeelio is ready");
  console.log(`  Local:   http://localhost:${port}`);
  for (const address of getLanAddresses(port)) {
    console.log(`  Network: ${address}`);
  }
  console.log("");
});
