const Document = require("../models/document");

async function get(request, response) {
  const { id } = request.user;
  const { documentId } = request.params;

  const data = await Document.getById({ userId: id, documentId });
  response.status(200).json({ data });
}
async function getAll(request, response) {
  const { id } = request.user;
  const data = await Document.getAll({ userId: id });
  response.status(200).json({ data });
}
async function upload(request, response) {
  const { id } = request.user;
  const file = request.file.document;
  const { name } = request.body;

  const data = await Document.create({ userId: id, file, name });
  response.status(200).json({ data });
}
async function deleteDoc(request, response) {
  const { id } = request.user;
  const { documentId } = request.params;

  const data = await Document.deleteDoc({ userId: id, documentId });
  response.status(200).json({ data });
}

module.exports = { get, getAll, upload, deleteDoc };
