const Account = require("../../../models/account");

async function isAuthenticated(req, res, next) {
  var authheader = req.headers.authorization;
  console.log(req.headers);

  if (!authheader) {
    res.status(401).json({ error: "Unauthorised" });
  }

  var auth = new Buffer.from(authheader.split(" ")[1], "base64")
    .toString()
    .split(":");
  var username = auth[0];
  var password = auth[1];
  const isValid = await Account.isValidPassword(username, password);
  console.log("isValid", JSON.stringify(isValid));
  if (isValid.response) {
    req.user = { username };
    next();
  } else {
    res.status(401).json({ error: "Unauthorised" });
  }
}

module.exports = isAuthenticated;
