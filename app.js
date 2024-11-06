require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const {
  app: { port },
} = require("./src/config/index");
const connection = require("./src/postgresql");
// Apply CORS middleware at the top for Express
app.use(
  cors({
    origin: process.env.FRONT_END_URL, // Frontend URL (e.g., https://discord-clone29.netlify.app)
    credentials: true, // Allow cookies/credentials in CORS
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  })
);

// Create HTTP server
const server = createServer(app);

// Initialize Socket.IO with CORS configuration
const io = new Server(server, {
  cors: {
    origin: process.env.FRONT_END_URL, // Frontend URL (e.g., https://discord-clone29.netlify.app)
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  },
});

// Initialize Socket.IO event handler
const { socketHandler } = require("./src/socketIo");
socketHandler(io); // Attach your Socket.IO event handlers

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Connect to PostgreSQL
connection();

// Import and set up routes
const userRoutes = require("./src/routes/user.routes");
const friendsRoutes = require("./src/routes/friends.routes");
const serversRoutes = require("./src/routes/server.routes");
const messagesRoutes = require("./src/routes/messages.routes");
const channelsRoutes = require("./src/routes/channels.routes");

app.use("/user", userRoutes);
app.use("/friend", friendsRoutes);
app.use("/server", serversRoutes);
app.use("/messages", messagesRoutes);
app.use("/channels", channelsRoutes);

// Start the server
server.listen(port, () =>
  console.log(`Server is up and running on port ${port}`)
);
