const express = require("express");
const logger = require("./utils/logger");
const morganMiddleware = require("./utils/middlewares/morgan");
require("dotenv").config();

const app = express();
app.use(morganMiddleware);
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/v2", require("./routes"));
app.get("/healthz", (req, res) =>
  res.status(200).json({ message: "Server is Live!!!" })
);

app.listen(PORT, () => console.log(`Web App listening on port ${PORT}!`));
