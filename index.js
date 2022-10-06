const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
app.use(morgan("combined"));
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/v1", require("./routes"));
app.get("/healthz", (req, res) =>
  res.status(200).json({ message: "Server is Live!!!" })
);

app.listen(PORT, () => console.log(`Web App listening on port ${PORT}!`));
