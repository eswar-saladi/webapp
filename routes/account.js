const express = require("express");
const isAuthenticated = require("../utils/middlewares/auth");
const router = express.Router();

const { get, update, create } = require("../controllers/account");
const {
  isValidUpdateDetails,
  isValidCreateDetails,
} = require("../utils/middlewares/validations/accounts");

router.get("/:accountId", isAuthenticated, get);
router.put("/:accountId", isAuthenticated, isValidUpdateDetails, update);
router.post("/", isValidCreateDetails, create);

module.exports = router;
