const Joi = require("joi");
const schema = Joi.object({
  spec_id: Joi.number().required(),
  day_of_week: Joi.number().required(),
  finish_time: Joi.date().required(),
  start_time: Joi.date().required(),
  res_finish_time: Joi.date().required(),
  res_start_time: Joi.date().required(),
});

module.exports = schema;
