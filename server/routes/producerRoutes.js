const express = require("express");
const {
  getProducers,
  createProducer,
} = require("../controllers/producerController");
const router = express.Router();

router.get("/", getProducers);
router.post("/", createProducer);

module.exports = router;
