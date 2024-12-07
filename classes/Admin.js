const { adminCreateSchema, adminModifySchema, adminPartialModifySchema } = require('../schemas/AdminSchemas');

class Admin {
  constructor(api) {
    this.api = api;
  }

  /**
   * Get the current authenticated admin's details
   * Retrieves information about the admin currently authenticated with the API.
   * @returns {Promise<Object>} Current admin details
   * Example Response:
   * {
   *   "username": "string",
   *   "is_sudo": true,
   *   "telegram_id": 0,
   *   "discord_webhook": "string"
   * }
   */
  async getCurrentAdmin() {
    return this.api._get('/admin');
  }

  /**
   * Create a new admin account
   * Sends a request to create an admin using the provided data after validation.
   * @param {Object} adminData - Data required to create an admin, including username and password.
   * @returns {Promise<Object>} Created admin details
   * @throws {Error} Validation error if the provided data doesn't meet the defined schema.
   */
  async createAdmin(adminData) {
    // Validate admin data before sending to the server
    const { error } = adminCreateSchema.validate(adminData);
    if (error) {
      throw new Error(`Validation Error: ${error.details.map(detail => detail.message).join(', ')}`);
    }
    return this.api._post('/admin', adminData);
  }

  /**
   * Modify an existing admin's details
   * Updates the details of an existing admin specified by their username.
   * @param {string} username - The username of the admin to be modified.
   * @param {Object} adminData - Updated data for the admin, such as password and webhook information.
   * @returns {Promise<Object>} Updated admin details
   * @throws {Error} Validation error if the provided data doesn't meet the defined schema.
   * @throws {Error} Access error if trying to edit a sudoer's account (restricted action).
   */
  async modifyAdmin(username, adminData) {
    // Validate admin data before sending to the server
    const { error } = adminModifySchema.validate(adminData);
    if (error) {
      throw new Error(`Validation Error: ${error.details.map(detail => detail.message).join(', ')}`);
    }
    return this.api._put(`/admin/${username}`, adminData);
  }

  /**
   * Remove an admin from the database
   * Deletes the specified admin from the database.
   * @param {string} username - The username of the admin to be removed.
   * @returns {Promise<void>} Confirmation of successful deletion.
   * @throws {Error} Access error if trying to delete a sudo account (restricted action).
   */
  async removeAdmin(username) {
    return this.api._delete(`/admin/${username}`);
  }

  /**
   * Get a list of admins with optional filters
   * Retrieves a list of all admins, with options to filter by pagination or username.
   * @param {Object} params - Optional parameters for filtering the results:
   *   - offset: Integer for pagination offset.
   *   - limit: Integer to limit the number of returned admins.
   *   - username: String to filter by a specific username.
   * @returns {Promise<Array<Object>>} List of admin objects
   * Example Response:
   * [
   *   {
   *     "username": "string",
   *     "is_sudo": true,
   *     "telegram_id": 0,
   *     "discord_webhook": "string"
   *   }
   * ]
   * @throws {Error} Validation error if the filter parameters don't meet the required format.
   */
  async getAdmins(params = {}) {
    return this.api._get('/admins', null, params);
  }
}

module.exports = Admin;
