const { Router } = require("express");
const {
  getSpecs,
  addSpec,
  getSpec,
  updateSpec,
  deleteSpec,
} = require("../controllers/specialist.controller");
const router = Router();
const Validation = require("../middleware/validator");
router.get("/", getSpecs);
router.get("/:id", getSpec);
router.post("/", Validation("specialist"), addSpec);
router.put("/:id", updateSpec);
router.delete("/:id", deleteSpec);

module.exports = router;
