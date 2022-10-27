async function isValidUploadDetails(request, response, next) {
  const fileDetails = request.body;
  if (!!fileDetails.name && !!request.files) {
    next();
  } else {
    return response.status(400).json({ error: "Invalid fields identified" });
  }
}

module.exports = { isValidUploadDetails };
