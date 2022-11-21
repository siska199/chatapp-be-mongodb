const dotenv = require("dotenv");
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const router = require("./src/routes");
const socketIo = require("./src/socket");
dotenv.config();

const app = express();
//---Generate server for socket
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.BASE_URL_FE,
  },
});
socketIo(io);
//---Generate server from express
const PORT = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api199/v1", router);

server.listen(PORT, () => {
  console.log(`Listen to port : ${PORT}`);
});
