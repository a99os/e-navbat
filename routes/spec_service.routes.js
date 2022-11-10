const { Router } = require("express");
const {
  getSpec_services,
  addSpec_service,
  getSpec_service,
  updateSpec_service,
  deleteSpec_service,
} = require("../controllers/spec_service.controller");
const router = Router();
const Validation = require("../middleware/validator");
router.get("/", getSpec_services);
router.get("/:id", getSpec_service);
router.post("/", Validation("spec_service"), addSpec_service);
router.put("/:id", updateSpec_service);
router.delete("/:id", deleteSpec_service);

module.exports = router;
