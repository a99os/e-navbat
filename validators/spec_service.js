const Joi = require("joi");
const schema = Joi.object({
  spec_id: Joi.number().required(),
  service_id: Joi.number().required(),
  spec_service_price: Joi.number().required(),
});

module.exports = schema;
