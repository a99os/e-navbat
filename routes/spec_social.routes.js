const { Router } = require("express");
const {
  getSpec_socials,
  addSpec_social,
  getSpec_social,
  updateSpec_social,
  deleteSpec_social,
} = require("../controllers/spec_social.controller");
const router = Router();
const Validation = require("../middleware/validator");
router.get("/", getSpec_socials);
router.get("/:id", getSpec_social);
router.post("/", Validation("spec_social"), addSpec_social);
router.put("/:id", updateSpec_social);
router.delete("/:id", deleteSpec_social);

module.exports = router;
