const { Router } = require("express");
const {
  getServices,
  addService,
  getService,
  updateService,
  deleteService,
} = require("../controllers/service.controller");
const router = Router();
const Validation = require("../middleware/validator");
router.get("/", getServices);
router.get("/:id", getService);
router.post("/", Validation("service"), addService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

module.exports = router;
