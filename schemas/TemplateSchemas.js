const Joi = require('joi');

// Schema for creating a new user template
const createTemplateSchema = Joi.object({
  name: Joi.string().max(255).allow(null).optional(),
  data_limit: Joi.number().min(0).optional().allow(null),
  expire_duration: Joi.number().min(0).optional().allow(null),
  username_prefix: Joi.string().min(1).max(20).optional().allow(null),
  username_suffix: Joi.string().min(1).max(20).optional().allow(null),
  inbounds: Joi.object().pattern(
    Joi.string(),
    Joi.array().items(Joi.string())
  ).required(),
});

// Schema for modifying an existing user template
const modifyTemplateSchema = Joi.object({
  name: Joi.string().max(255).allow(null).optional(),
  data_limit: Joi.number().min(0).optional().allow(null),
  expire_duration: Joi.number().min(0).optional().allow(null),
  username_prefix: Joi.string().min(1).max(20).optional().allow(null),
  username_suffix: Joi.string().min(1).max(20).optional().allow(null),
  inbounds: Joi.object().pattern(
    Joi.string(),
    Joi.array().items(Joi.string())
  ).optional(),
});

module.exports = {
  createTemplateSchema,
  modifyTemplateSchema
};
