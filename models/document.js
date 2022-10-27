const { s3 } = require("../awsConfig");
const knex = require("../db/knex");

class Document {
  static async create({ userId, name, file }) {
    try {
      const s3_key = `${userId}_${file.name}`;
      const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: s3_key,
        Body: file.data,
      };

      await s3.upload(params).promise();

      const data = await knex("documents")
        .insert({
          user_id: userId,
          s3_bucket_path: s3_key,
          name: name,
        })
        .returning("id");

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
      const { s3_bucket_path } = (
        await Document.getById({ userId, documentId })
      ).response;

      await s3.deleteObject({
        Bucket: process.env.AWS_BUCKET,
        Key: s3_bucket_path,
      });

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
