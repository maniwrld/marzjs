const Joi = require('joi');

// Regular expression for username validation
const usernameRegex = /^(?=\w{3,32}\b)[a-zA-Z0-9-_@.]+(?:_[a-zA-Z0-9-_@.]+)*$/;

// User creation schema
const userCreateSchema = Joi.object({
  username: Joi.string().pattern(usernameRegex).required().messages({
    'string.pattern.base': 'Username can only be 3 to 32 characters and contain a-z, 0-9, and underscores in between.',
  }),
  proxies: Joi.object().pattern(
    Joi.string(),
    Joi.object({
      id: Joi.string().uuid(),
      settings: Joi.object().optional(),
      password: Joi.optional(),
      method: Joi.optional(),
      flow: Joi.optional()
    })
  ).required().messages({
    'object.base': 'Proxies must be provided',
  }),
  inbounds: Joi.object().pattern(
    Joi.string(),
    Joi.array().items(Joi.string().max(500))
  ).optional(),
  expire: Joi.number().integer().min(0).optional(),
  data_limit: Joi.number().integer().min(0).optional(),
  data_limit_reset_strategy: Joi.string().valid('no_reset', 'day', 'week', 'month', 'year').optional(),
  status: Joi.string().valid('active', 'on_hold').optional().default('active'),
  note: Joi.optional(),
  on_hold_timeout: Joi.date().optional(),
  on_hold_expire_duration: Joi.number().integer().optional(),
});


// User modification schema
const userModifySchema = Joi.object({
  proxies: Joi.object().pattern(
    Joi.string(),
    Joi.object({
      id: Joi.string().uuid(),
      settings: Joi.object().optional(),
      password: Joi.optional(),
      method: Joi.optional(),
      flow: Joi.optional()
    })
  ).optional(),
  inbounds: Joi.object().pattern(
    Joi.string(),
    Joi.array().items(Joi.string().max(500))
  ).optional(),
  expire: Joi.number().integer().min(0).optional(),
  data_limit: Joi.number().integer().min(0).optional(),
  data_limit_reset_strategy: Joi.string().valid('no_reset', 'day', 'week', 'month', 'year').optional(),
  status: Joi.string().valid('active', 'disabled', 'on_hold').optional(),
  note: Joi.optional(),
  on_hold_timeout: Joi.date().optional(),
  on_hold_expire_duration: Joi.number().integer().optional(),
});

// User response schema
const userResponseSchema = Joi.object({
  username: Joi.string().required(),
  status: Joi.string().valid('active', 'disabled', 'limited', 'expired', 'on_hold').required(),
  used_traffic: Joi.number().integer().min(0).required(),
  lifetime_used_traffic: Joi.number().integer().min(0).optional(),
  created_at: Joi.date().required(),
  links: Joi.array().items(Joi.string().uri()).optional(),
  subscription_url: Joi.string().uri().optional(),
  proxies: Joi.object().pattern(
    Joi.string(),
    Joi.object({
      id: Joi.string().uuid(),
      settings: Joi.object().optional(),
    })
  ).required(),
  excluded_inbounds: Joi.object().pattern(
    Joi.string(),
    Joi.array().items(Joi.string().max(500))
  ).optional(),
  admin: Joi.object().optional()
});

module.exports = {
  userCreateSchema,
  userModifySchema,
  userResponseSchema,
};
