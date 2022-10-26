const express = require("express");
const router = express.Router();

const isAuthenticated = require("../utils/middlewares/auth");
const accountRouter = require("./account");
const documentRouter = require("./document");

router.use("/account", accountRouter);
router.use("/document", isAuthenticated, documentRouter);

module.exports = router;
