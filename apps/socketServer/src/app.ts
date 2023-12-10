import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import path from "path";
import cors from "cors";

const PORT = process.env.port || 4000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
  transports: ["websocket", "polling"],
});

app.use(cors());

export interface ClientToServerEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: number[]) => void;
  updateCounter: (counter: number) => void;
}

export interface ServerToClientEvents {
  withAck: (d: string, cb: (e: number) => void) => void;
  counterUpdated: (counter: number) => void;
}

io.on(
  "connection",
  (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
    console.log("a user connected");
    socket.on("updateCounter", (v) => {
      console.log("socket.on.updateCounter");

      io.emit("counterUpdated", v);
    });
  }
);

server.listen(PORT, () => {
  console.log("Server on port", PORT);
});
