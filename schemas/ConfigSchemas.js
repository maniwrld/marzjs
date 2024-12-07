const Joi = require('joi');

const ConfigSchema = Joi.object({
  domain: Joi.string()
    .hostname()
    .required()
    .description('The domain of the Marzban server.'),

  port: Joi.number()
    .integer()
    .min(1)
    .max(65535)
    .required()
    .description('The port of the Marzban server.'),

  ssl: Joi.boolean()
    .required()
    .description('Indicates whether SSL is enabled.'),

  username: Joi.string()
    .min(3)
    .max(50)
    .optional()
    .description('The username for authentication.'),

  password: Joi.string()
    .min(8)
    .optional()
    .description('The password for authentication.'),

  token: Joi.string()
    .optional()
    .description('The access token for authentication.'),

  timeout: Joi.number()
    .optional()
    .description('Timeout for axios requests.'),
  retryDelay: Joi.number()
    .optional()
    .description('Delay between each try.'),
  maxRetries: Joi.number()
    .optional()
    .description('Maximum number of retries.'),
}).or('username', 'token') // Ensure at least username or token is provided.

module.exports = ConfigSchema;
