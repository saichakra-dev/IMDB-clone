const express = require("express");
const { getActors, createActor } = require("../controllers/actorController");
const router = express.Router();

router.get("/", getActors);
router.post("/", createActor);

module.exports = router;
