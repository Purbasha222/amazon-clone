const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;

app.use(express.json());

const userRoutes = require("./routes/backendRoutes.js");

app.use(cors());
app.use("/api/user", userRoutes);

mongoose
  .connect(
    "mongodb+srv://purbashagoswami:purba2005@cluster0.p0ppuia.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to Database");
    app.listen(3000, () => console.log(`Server started at PORT:${PORT}`));
  })
  .catch((err) => console.log("Connection failed", err));
