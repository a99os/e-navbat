const { Router } = require("express");
const { newOTP, verifyOTP } = require("../controllers/otp.controller");
const router = Router();
// const Validation = require("../middleware/validator");

router.post("/newotp", newOTP);
router.post("/verify", verifyOTP);
// router.delete("/delete", deleteOTP);
// router.get("/:id", getOTPByID);

module.exports = router;
