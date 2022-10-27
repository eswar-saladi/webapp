const AWS = require("aws-sdk");
require("dotenv").config();

const s3 =
  process.env.NODE_ENV === "development"
    ? new AWS.S3({
        accessKeyId: process.env.ACCESSKEYID, // your AWS access id
        secretAccessKey: process.env.SECRETACCESSKEY, // your AWS access key
      })
    : new AWS.S3();

module.exports = { s3 };
