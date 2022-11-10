const { Router } = require("express");
const {
  getSpec_working_days,
  addSpec_working_day,
  getSpec_working_day,
  updateSpec_working_day,
  deleteSpec_working_day,
} = require("../controllers/spec_working_day.controller");
const router = Router();
const Validation = require("../middleware/validator");
router.get("/", getSpec_working_days);
router.get("/:id", getSpec_working_day);
router.post("/", Validation("spec_working_day"), addSpec_working_day);
router.put("/:id", updateSpec_working_day);
router.delete("/:id", deleteSpec_working_day);

module.exports = router;
