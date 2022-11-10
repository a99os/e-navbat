const { Router } = require("express");
const {
  getClients,
  addClient,
  getClient,
  updateClient,
  deleteClient,
} = require("../controllers/client.controller");
const router = Router();
const Validation = require("../middleware/validator");
router.get("/", getClients);
router.get("/:id", getClient);
router.post("/", Validation("client"), addClient);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);

module.exports = router;
