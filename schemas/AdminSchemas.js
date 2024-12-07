const Joi = require('joi');

const adminSchema = Joi.object({
  username: Joi.string().required(),
  is_sudo: Joi.boolean().required(),
  telegram_id: Joi.number().optional(),
  discord_webhook: Joi.string().allow(null, '').uri().optional().pattern(new RegExp('^https://discord.com'))
});

const adminCreateSchema = adminSchema.keys({
  password: Joi.string().min(8).required()
});

const adminModifySchema = Joi.object({
  password: Joi.string().min(8).optional(),
  is_sudo: Joi.boolean().required(),
  telegram_id: Joi.number().optional(),
  discord_webhook: Joi.string().allow(null, '').uri().optional().pattern(new RegExp('^https://discord.com'))
});

const adminPartialModifySchema = Joi.object({
  password: Joi.string().min(8).optional(),
  is_sudo: Joi.boolean().optional(),
  telegram_id: Joi.number().optional(),
  discord_webhook: Joi.string().allow(null, '').uri().optional().pattern(new RegExp('^https://discord.com'))
});

module.exports = {
  adminSchema,
  adminCreateSchema,
  adminModifySchema,
  adminPartialModifySchema
};
