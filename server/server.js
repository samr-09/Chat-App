import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRouter.js";
import { Server } from "socket.io";
import User from "./models/User.js";

const app = express();
const server = http.createServer(app);

// ================= SOCKET.IO (VERCEL SAFE) =================
export const io = new Server(server, {
  path: "/socket.io",
  cors: { origin: "*" },
  transports: ["websocket"],
});

// store online users
export const userSocketMap = {}; // { userId: socketId }

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  // guard
  if (!userId) {
    socket.disconnect(true);
    return;
  }

  // mark user online
  userSocketMap[userId] = socket.id;

  // broadcast online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // ================= TYPING INDICATOR =================
  socket.on("typing", ({ to }) => {
    const receiverSocketId = userSocketMap[to];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("typing", { from: userId });
    }
  });

  socket.on("stopTyping", ({ to }) => {
    const receiverSocketId = userSocketMap[to];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("stopTyping", { from: userId });
    }
  });

  // ================= DISCONNECT =================
  socket.on("disconnect", async () => {
    delete userSocketMap[userId];

    // update last seen
    try {
      await User.findByIdAndUpdate(userId, {
        lastSeen: new Date(),
      });
    } catch (err) {
      console.log("Last seen update failed:", err.message);
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// ================= MIDDLEWARE =================
app.use(express.json({ limit: "4mb" }));
app.use(cors());

// ================= ROUTES =================
app.use("/api/status", (req, res) => res.send("Server is live"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// ================= DB =================
await connectDB();

// ================= SERVER =================
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () =>
    console.log("Server Running on PORT:" + PORT)
  );
}

// export for vercel
export default server;
