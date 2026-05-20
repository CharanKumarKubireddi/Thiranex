const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

mongoose.connect("mongodb://127.0.0.1:27017/taskdb");

app.use(cors());
app.use(express.json());

// Socket.IO
io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("taskUpdated", () => {
    io.emit("refreshTasks");
  });
});

app.set("io", io);

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/tasks"));

server.listen(5000, () => console.log("Server running"));
