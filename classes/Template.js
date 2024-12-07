const { createTemplateSchema, modifyTemplateSchema } = require('../schemas/TemplateSchemas');

class Template {
  constructor(api) {
    this.api = api;
  }

  /**
   * Get a list of user templates
   * Fetches all user templates with optional pagination parameters (offset and limit).
   * @returns {Promise<Object[]>} List of user templates
   * Example Response:
   * [
   *   {
   *     "name": "string",
   *     "data_limit": 0,
   *     "expire_duration": 0,
   *     "username_prefix": "string",
   *     "username_suffix": "string",
   *     "inbounds": {},
   *     "id": 0
   *   }
   * ]
   */
  async getUserTemplates() {
    return this.api._get('/user_template');
  }

  /**
   * Add a new user template
   * Adds a user template with the specified parameters.
   * Name must be up to 64 characters.
   * Data limit should be in bytes and >= 0.
   * Expire duration should be in seconds and >= 0.
   * Inbounds is a dictionary of protocol:inbound_tags, empty means all inbounds.
   * 
   * @param {Object} templateData - Data for the new user template
   * Example templateData:
   * {
   *   "name": "my template 1",
   *   "inbounds": {
   *     "vmess": ["VMESS_INBOUND"],
   *     "vless": ["VLESS_INBOUND"]
   *   },
   *   "data_limit": 0,
   *   "expire_duration": 0
   * }
   * @returns {Promise<Object>} Created user template details
   * Example Response:
   * {
   *   "name": "string",
   *   "data_limit": 0,
   *   "expire_duration": 0,
   *   "username_prefix": "string",
   *   "username_suffix": "string",
   *   "inbounds": {},
   *   "id": 0
   * }
   * @throws {Error} Validation error if the input does not meet the schema requirements.
   */
  async addUserTemplate(templateData) {
    const { error } = createTemplateSchema.validate(templateData);
    if (error) {
      throw new Error(`Validation error: ${error.message}`);
    }
    return this.api._post('/user_template', templateData);
  }

  /**
   * Get a user template by its ID
   * Fetches details of a specific user template using its ID.
   * @param {Object} template_id - Object containing the ID of the targeted template, e.g., {template_id: 1}
   * @returns {Promise<Object>} User template details
   * Example Response:
   * {
   *   "name": "string",
   *   "data_limit": 0,
   *   "expire_duration": 0,
   *   "username_prefix": "string",
   *   "username_suffix": "string",
   *   "inbounds": {},
   *   "id": 0
   * }
   * @throws {Error} Validation error if the ID format is invalid.
   */
  async getUserTemplateById(template_id) {
    return this.api._get(`/user_template/`, template_id);
  }

  /**
   * Modify an existing user template
   * Updates a user template with the given ID and new data.
   * Name must be up to 64 characters.
   * Data limit should be in bytes and >= 0.
   * Expire duration should be in seconds and >= 0.
   * Inbounds is a dictionary of protocol:inbound_tags, empty means all inbounds.
   * 
   * @param {string} id - ID of the user template to modify
   * @param {Object} templateData - Updated template data
   * Example templateData:
   * {
   *   "name": "my template 1",
   *   "inbounds": {
   *     "vmess": ["VMESS_INBOUND"],
   *     "vless": ["VLESS_INBOUND"]
   *   },
   *   "data_limit": 0,
   *   "expire_duration": 0
   * }
   * @returns {Promise<Object>} Updated user template details
   * Example Response:
   * {
   *   "name": "string",
   *   "data_limit": 0,
   *   "expire_duration": 0,
   *   "username_prefix": "string",
   *   "username_suffix": "string",
   *   "inbounds": {},
   *   "id": 0
   * }
   * @throws {Error} Validation error if the input does not meet the schema requirements or ID is invalid.
   */
  async modifyUserTemplate(id, templateData) {
    const { error } = modifyTemplateSchema.validate(templateData);
    if (error) {
      throw new Error(`Validation error: ${error.message}`);
    }
    return this.api._put(`/user_template/${id}`, templateData);
  }

  /**
   * Remove a user template by ID
   * Deletes a user template with the given ID.
   * @param {string} id - ID of the user template to remove
   * @returns {Promise<Object>} Result of the deletion operation
   * Example Response: "string"
   * @throws {Error} Validation error if the ID format is invalid.
   */
  async removeUserTemplate(id) {
    return this.api._request('delete', `/user_template/${id}`, null, { template_id: id });
  }
}

module.exports = Template;
