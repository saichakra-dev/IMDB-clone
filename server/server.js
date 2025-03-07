const express = require("express");
const connectDB = require("./config/db");
const movieRoutes = require("./routes/movieRoutes");
const actorRoutes = require("./routes/actorRoutes");
const producerRoutes = require("./routes/producerRoutes");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
connectDB();

app.use(express.json());
app.use(cors());
app.use("/api/movies", movieRoutes);
app.use("/api/actors", actorRoutes);
app.use("/api/producers", producerRoutes);

app.listen(port, () => console.log("Server running on port 5000"));
