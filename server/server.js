const express = require("express");
const connectDB = require("./config/db");
const movieRoutes = require("./routes/movieRoutes");
const actorRoutes = require("./routes/actorRoutes");
const producerRoutes = require("./routes/producerRoutes");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use("/api/movies", movieRoutes);
app.use("/api/actors", actorRoutes);
app.use("/api/producers", producerRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
