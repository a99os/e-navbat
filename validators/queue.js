const Joi = require("joi");
const schema = Joi.object({
  client_id: Joi.number().required(),
  spec_service_id: Joi.number().required(),
  queue_date_time: Joi.date(),
  queue_number: Joi.number().required(),
});

module.exports =schema;
