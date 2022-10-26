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
    const data = await Account.getByUserName(username);
    req.user = { ...data.response };
    next();
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
}

module.exports = isAuthenticated;
