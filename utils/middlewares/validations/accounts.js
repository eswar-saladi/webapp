const validator = require("validator");

async function isValidUpdateDetails(request, response, next) {
  const userDetails = request.body;
  console.log(userDetails);
  if (
    !userDetails.id &&
    !userDetails.account_created &&
    !userDetails.account_modified &&
    !userDetails.username
  ) {
    next();
  } else {
    response.status(400).json({ error: "Invalid fields identified" });
  }
}

async function isValidCreateDetails(request, response, next) {
  const userDetails = request.body;

  if (
    validator.isEmail(userDetails.username) &&
    validator.isStrongPassword(userDetails.password) &&
    !Object.hasOwn(userDetails, id) &&
    !Object.hasOwn(userDetails, account_created) &&
    !Object.hasOwn(userDetails, account_modified)
  ) {
    next();
  } else {
    response.status(400).json({ error: "Invalid fields identified" });
  }
}

module.exports = { isValidCreateDetails, isValidUpdateDetails };
