const { Router } = require("express");
const {
  getAdmins,
  addAdmin,
  getAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/admin.controller");
const router = Router();
const Validation = require("../middleware/validator");
router.get("/", getAdmins);
router.get("/:id", getAdmin);
router.post("/", Validation("admin"), addAdmin);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);

module.exports = router;
