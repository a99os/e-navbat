const { Router } = require("express");
const {
  getSocials,
  addSocial,
  getSocial,
  updateSocial,
  deleteSocial,
} = require("../controllers/social.controller");
const router = Router();
const Validation = require("../middleware/validator");
router.get("/", getSocials);
router.get("/:id", getSocial);
router.post("/", Validation("social"), addSocial);
router.put("/:id", updateSocial);
router.delete("/:id", deleteSocial);

module.exports = router;
