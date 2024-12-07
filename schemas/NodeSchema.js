const Joi = require('joi');

const NodeSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().ip().required(),
  port: Joi.number().integer().default(62050),
  api_port: Joi.number().integer().default(62051),
  usage_coefficient: Joi.number().positive().default(1.0),
});

const NodeCreateSchema = NodeSchema.keys({
  add_as_new_host: Joi.boolean().default(false),
});

const NodeModifySchema = Joi.object({
  name: Joi.string().optional().allow(null),
  address: Joi.string().ip().optional().allow(null),
  port: Joi.number().integer().optional().allow(null),
  api_port: Joi.number().integer().optional().allow(null),
  status: Joi.string().valid('connected', 'connecting', 'error', 'disabled').optional().allow(null),
  usage_coefficient: Joi.number().positive().optional().allow(null),
});

const NodeResponseSchema = NodeSchema.keys({
  id: Joi.number().integer().required(),
  xray_version: Joi.string().optional().allow(null),
  status: Joi.string().valid('connected', 'connecting', 'error', 'disabled').required(),
  message: Joi.string().optional().allow(null),
});

const NodeUsageResponseSchema = Joi.object({
  node_id: Joi.number().integer().optional().allow(null),
  node_name: Joi.string().required(),
  uplink: Joi.number().integer().required(),
  downlink: Joi.number().integer().required(),
});

module.exports = {
  NodeSchema,
  NodeCreateSchema,
  NodeModifySchema,
  NodeResponseSchema,
  NodeUsageResponseSchema,
};
