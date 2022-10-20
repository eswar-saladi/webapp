const Account = require("../models/account");

async function get(request, response) {
  const { accountId } = request.params;
  const { username } = request.user;

  const userDetails = await Account.get(accountId, username);
  if (userDetails.response && userDetails.response["first_name"])
    response.status(200).json({ ...userDetails.response });
  else response.status(403).json({ error: "Forbidden" });
}

async function update(request, response) {
  const { accountId } = request.params;
  const { username } = request.user;
  const userDetails = request.body;

  const result = await Account.update(accountId, username, userDetails);
  response.status(200).json({ result });
}

async function create(request, response) {
  const userDetails = request.body;
  const result = await Account.create(userDetails);
  if (result.error) {
    response.status(400).json({ error: result.error });
  } else {
    response.status(200).json({ ...result.response });
  }
}

module.exports = { get, update, create };
