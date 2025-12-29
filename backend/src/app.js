const express = require("express");
const cors = require("cors");

const pasteRoute = require("./routes/pasteRoute");
const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api", pasteRoute);

module.exports = app;
