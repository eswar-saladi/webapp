const express = require("express");
const fileUpload = require("express-fileupload");

const router = express.Router();

const { get, getAll, upload, deleteDoc } = require("../controllers/document");
const {
  isValidUploadDetails,
} = require("../utils/middlewares/validations/documents");

router.get("/", getAll);
router.get("/:documentId", get);

router.post(
  "/",
  fileUpload({
    limits: {
      fileSize: 2046 * 2046, // 1 MB
    },
    abortOnLimit: true,
  }),
  isValidUploadDetails,

  upload
);
router.delete("/:documentId", deleteDoc);

module.exports = router;
