const { Router } = require("express");
const {
  getQueues,
  addQueue,
  getQueue,
  updateQueue,
  deleteQueue,
} = require("../controllers/queue.controller");
const router = Router();
const Validation = require("../middleware/validator");
router.get("/", getQueues);
router.get("/:id", getQueue);
router.post("/", Validation("queue"), addQueue);
router.put("/:id", updateQueue);
router.delete("/:id", deleteQueue);

module.exports = router;
