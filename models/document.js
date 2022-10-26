const knex = require("../db/knex");

class Document {
  static async create({ userId, name, file }) {
    try {
      // upload to s3 bucket and get the file path
      const s3BucketPath = "random-txt";
      const data = await knex("documents").insert({
        user_Id: userId,
        s3_bucket_path: s3BucketPath,
        name: name,
      });

      const documentId = data["0"]["id"];
      const result = await Document.getById({ userId, documentId });
      return { response: result };
    } catch (error) {
      return { error: error.toString() };
    }
  }

  static async getById({ userId, documentId }) {
    try {
      const document = await knex
        .select("id", "user_id", "name", "s3_bucket_path", "date_created")
        .from("documents")
        .where({ id: documentId, user_id: userId })
        .first();
      return { response: document };
    } catch (error) {
      return { error: error.toString() };
    }
  }

  static async getAll({ userId }) {
    try {
      const documents = await knex
        .select("id", "user_id", "name", "s3_bucket_path", "date_created")
        .from("documents")
        .where({ user_id: userId });

      return { response: documents };
    } catch (error) {
      return { error: error.toString() };
    }
  }

  static async deleteDoc({ userId, documentId }) {
    try {
      const result = await knex("documents")
        .where("user_id", userId)
        .where("id", documentId)
        .del();
      return { response: result };
    } catch (error) {
      return { error: error.toString() };
    }
  }
}

module.exports = Document;
