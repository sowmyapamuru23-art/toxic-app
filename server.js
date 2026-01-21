const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve frontend files
app.use(express.static("public"));

// Toxic words list
const toxicWords = [
  "idiot",
  "stupid",
  "hate",
  "kill",
  "die",
  "dumb",
  "fool",
  "abuse",
  "threat",
  "loser"
];

// Toxic detection function
function isToxic(message) {
  const msg = message.toLowerCase();
  return toxicWords.some(word => msg.includes(word));
}

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("sendMessage", (data) => {
    if (isToxic(data.message)) {
      socket.emit("toxicWarning", {
        warning: "⚠️ Toxic content detected! Message blocked."
      });
    } else {
      io.emit("receiveMessage", data);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
