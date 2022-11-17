const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
require("dotenv").config();

const s3 =
  process.env.NODE_ENV === "development"
    ? new AWS.S3({
        accessKeyId: process.env.ACCESSKEYID, // your AWS access id
        secretAccessKey: process.env.SECRETACCESSKEY, // your AWS access key
      })
    : new AWS.S3();

const dynamodb =
  process.env.NODE_ENV === "development"
    ? new AWS.DynamoDB.DocumentClient({
        accessKeyId: process.env.ACCESSKEYID, // your AWS access id
        secretAccessKey: process.env.SECRETACCESSKEY, // your AWS access key
      })
    : new AWS.DynamoDB.DocumentClient();

const ddb =
  process.env.NODE_ENV === "development"
    ? new AWS.DynamoDB({
        accessKeyId: process.env.ACCESSKEYID, // your AWS access id
        secretAccessKey: process.env.SECRETACCESSKEY, // your AWS access key
      })
    : new AWS.DynamoDB();

const sns =
  process.env.NODE_ENV === "development"
    ? new AWS.SNS({
        accessKeyId: process.env.ACCESSKEYID, // your AWS access id
        secretAccessKey: process.env.SECRETACCESSKEY, // your AWS access key
      })
    : new AWS.SNS();

module.exports = { s3, dynamodb, sns, ddb };
