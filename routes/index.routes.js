const { Router } = require("express");
const response = require("./responses.routes");

const router = Router();
const clientRoutes = require("../routes/client.routes");
const adminRoutes = require("../routes/admin.routes");
const specRoutes = require("../routes/spec.routes");
const queueRoutes = require("../routes/queue.routes");
const spec_socialRoutes = require("../routes/spec_social.routes");
const socialRoutes = require("../routes/social.routes");
const serviceRoutes = require("../routes/service.routes");
const spec_serviceRoutes = require("../routes/spec_service.routes");
const spec_working_dayRoutes = require("../routes/spec_working_day.routes");
const otpRoutes = require("../routes/otp.routes");

router.use(response);

router.use("/otp", otpRoutes);
router.use("/client", clientRoutes);
router.use("/admin", adminRoutes);
router.use("/spec", specRoutes);
router.use("/queue", queueRoutes);
router.use("/spec_social", spec_socialRoutes);
router.use("/social", socialRoutes);
router.use("/service", serviceRoutes);
router.use("/spec_service", spec_serviceRoutes);
router.use("/spec_working_day", spec_working_dayRoutes);
module.exports = router;
