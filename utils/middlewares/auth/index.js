const Account = require("../../../models/account");

async function isAuthenticated(req, res, next) {
  var authheader = req.headers.authorization;

  if (!authheader) {
    return res.status(401).json({ error: "Unauthorised" });
  }

  var auth = new Buffer.from(authheader.split(" ")[1], "base64")
    .toString()
    .split(":");
  var username = auth[0];
  var password = auth[1];
  const isValid = await Account.isValidPassword(username, password);

  if (isValid.response) {
    req.user = { username };
    next();
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
}

module.exports = isAuthenticated;
