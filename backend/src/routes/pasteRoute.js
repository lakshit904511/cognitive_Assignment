const express = require("express");
const router = express.Router();

const {
  healthCheck,
  createPaste,
  getPasteApi,
  getPasteHtml,
} = require("../controllers/pasteController");

router.get("/healthz", healthCheck);
router.post("/pastes", createPaste);
router.get("/pastes/:id", getPasteApi);
router.get("/p/:id", getPasteHtml);

module.exports = router;
