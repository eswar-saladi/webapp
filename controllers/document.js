const Document = require("../models/document");

async function get(request, response) {
  const { id } = request.user;
  console.log(id);
  const { documentId } = request.params;

  const data = await Document.getById({ userId: id, documentId });
  if (data.error) {
    response.status(400).json({ error: data.error });
  } else {
    response.status(200).json({ ...data.response });
  }
}
async function getAll(request, response) {
  const { id } = request.user;
  const data = await Document.getAll({ userId: id });
  if (data.error) {
    response.status(400).json({ error: data.error });
  } else {
    response.status(200).json({ ...data.response });
  }
}
async function upload(request, response) {
  const { id } = request.user;

  const file = request.files.document;
  const { name } = request.body;

  const data = await Document.create({ userId: id, file, name });
  if (data.error) {
    response.status(400).json({ error: data.error });
  } else {
    response.status(200).json({ ...data.response });
  }
}
async function deleteDoc(request, response) {
  const { id } = request.user;
  const { documentId } = request.params;

  const data = await Document.deleteDoc({ userId: id, documentId });
  if (data.error) {
    response.status(400).json({ error: data.error });
  } else {
    response.status(200).json({ ...data.response });
  }
}

module.exports = { get, getAll, upload, deleteDoc };
