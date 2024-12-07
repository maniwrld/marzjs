const { userCreateSchema, userModifySchema } = require('../schemas/UserSchemas');

class User {
  constructor(api) {
    this.api = api;
  }

  /**
   * Adds a new user to the system.
   * Validates user data using the `userCreateSchema`.
   * Sends a POST request to `/user` with the user data.
   * 
   * @param {Object} userData - User details, including:
   *   - username: 3 to 32 characters, a-z, 0-9, and underscores.
   *   - status: User's status (default: 'active'). Special handling if 'on_hold'.
   *   - expire: UTC timestamp for expiration. 0 means unlimited.
   *   - data_limit: Max data usage in bytes (e.g., 0 for unlimited).
   *   - data_limit_reset_strategy: Defines reset behavior (e.g., 'no_reset').
   *   - proxies: Protocol settings (e.g., vmess, vless).
   *   - inbounds: Inbound connections (protocol tags).
   *   - note: Optional user information.
   *   - on_hold_timeout & on_hold_expire_duration: 'on_hold' status management.
   * 
   * @returns {Promise<Object>} API response with user details.
   */
  async addUser(userData) {
    const { error } = userCreateSchema.validate(userData);
    if (error) throw new Error(`Validation Error: ${error.details.map(x => x.message).join(', ')}`);
    return this.api._post('/user', userData);
  }

  /**
   * Fetches details of a specific user.
   * Sends a GET request to `/user/{username}`.
   * 
   * @param {string} username - The username to fetch.
   * @returns {Promise<Object>} User details including status, usage, and metadata.
   */
  async getUser(username) {
    if (typeof username !== 'string') throw new Error('Username must be a string.');
    return this.api._get(`/user/${username}`);
  }

  /**
   * Modifies an existing user's details.
   * Validates user modification data using the `userModifySchema`.
   * Sends a PUT request to `/user/{username}`.
   * 
   * @param {string} username - The username of the user to modify.
   * @param {Object} userData - Fields to update, including:
   *   - status: 'active', 'disabled', 'on_hold', etc.
   *   - expire, data_limit, data_limit_reset_strategy: As per user creation.
   *   - proxies, inbounds, note: Updated user configuration.
   *   - on_hold_timeout, on_hold_expire_duration: For 'on_hold' status.
   * 
   * @returns {Promise<Object>} API response with updated user details.
   */
  async modifyUser(username, userData) {
    const { error } = userModifySchema.validate(userData);
    if (error) throw new Error(`Validation Error: ${error.details.map(x => x.message).join(', ')}`);
    return this.api._put(`/user/${username}`, userData);
  }

  /**
   * Removes a user from the system.
   * Sends a DELETE request to `/user/{username}`.
   * 
   * @param {string} username - The username to remove.
   * @returns {Promise<string>} Success message from the API.
   */
  async removeUser(username) {
    if (typeof username !== 'string') throw new Error('Username must be a string.');
    return this.api._delete(`/user/${username}`);
  }

  /**
   * Resets a specific user's data usage.
   * Sends a POST request to `/user/{username}/reset`.
   * 
   * @param {string} username - The username whose data usage to reset.
   * @returns {Promise<Object>} API response confirming the reset.
   */
  async resetUserDataUsage(username) {
    if (typeof username !== 'string') throw new Error('Username must be a string.');
    return this.api._post(`/user/${username}/reset`);
  }

  /**
   * Revokes a user's subscription.
   * Sends a POST request to `/user/{username}/revoke_sub`.
   * 
   * @param {string} username - The username whose subscription to revoke.
   * @returns {Promise<Object>} API response confirming the revocation.
   */
  async revokeUserSubscription(username) {
    if (typeof username !== 'string') throw new Error('Username must be a string.');
    return this.api._post(`/user/${username}/revoke_sub`);
  }

  /**
   * Fetches a list of all users.
   * Sends a GET request to `/users`.
   * 
   * @param {Object} params - Query parameters for filtering/sorting.
   * @returns {Promise<Array>} List of users with basic details.
   */
  async getUsers(params = {}) {
    return this.api._get('/users', null, params);
  }

  /**
   * Resets data usage for all users.
   * Sends a POST request to `/users/reset`.
   * 
   * @returns {Promise<Object>} API response confirming the reset.
   */
  async resetUsersDataUsage() {
    return this.api._post('/users/reset');
  }

  /**
   * Fetches a specific user's data usage.
   * Sends a GET request to `/user/{username}/usage`.
   * 
   * @param {string} username - The username to fetch usage for.
   * @returns {Promise<Object>} Data usage details of the user.
   */
  async getUserUsage(username) {
    if (typeof username !== 'string') throw new Error('Username must be a string.');
    return this.api._get(`/user/${username}/usage`);
  }

  /**
   * Fetches data usage for all users.
   * Sends a GET request to `/users/usage`.
   * 
   * @returns {Promise<Array>} List of users and their usage statistics.
   */
  async getUsersUsage() {
    return this.api._get('/users/usage');
  }

  /**
   * Assigns a user as the owner.
   * Sends a PUT request to `/user/{username}/set-owner`.
   * 
   * @param {string} username - The username of the user whose ownership is being set.
   * @param {string} admin_username - The username of the admin to assign as the owner.
   * @returns {Promise<Object>} API response confirming the owner assignment.
   */
  async setUserOwner(username, admin_username) {
    return this.api._request('put', `/user/${username}/set-owner`, null, { username, admin_username });
  }


  /**
   * Fetches a list of expired users.
   * Sends a GET request to `/users/expired`.
   * 
   * @returns {Promise<Array>} List of expired users.
   */
  async getExpiredUsers() {
    return this.api._get('/users/expired');
  }

  /**
   * Deletes all expired users.
   * Sends a DELETE request to `/users/expired`.
   * 
   * @returns {Promise<string>} Success message from the API.
   */
  async deleteExpiredUsers() {
    return this.api._delete('/users/expired');
  }

  /**
   * Fetches subscription details using a token.
   * Sends a GET request to `/sub/{token}`.
   * 
   * @param {string} token - The subscription token.
   * @returns {Promise<Object>} Subscription details.
   */
  async getUserSubscription(token) {
    if (typeof token !== 'string') throw new Error('Token must be a string.');
    return this.api._get(`sub/${token}`);
  }

  /**
   * Fetches detailed subscription information.
   * Sends a GET request to `/sub/{token}/info`.
   * 
   * @param {string} token - The subscription token.
   * @returns {Promise<Object>} Detailed subscription info.
   */
  async getUserSubscriptionInfo(token) {
    if (typeof token !== 'string') throw new Error('Token must be a string.');
    return this.api._get(`sub/${token}/info`);
  }

  /**
   * Fetches subscription usage using a token.
   * Sends a GET request to `/sub/{token}/usage`.
   * 
   * @param {string} token - The subscription token.
   * @returns {Promise<Object>} Subscription usage details.
   */
  async getUserSubscriptionUsage(token) {
    if (typeof token !== 'string') throw new Error('Token must be a string.');
    return this.api._get(`sub/${token}/usage`);
  }

  /**
   * Fetches subscription data filtered by client type.
   * Sends a GET request to `/sub/{token}/{clientType}`.
   * 
   * @param {string} token - The subscription token.
   * @param {string} clientType - The client type (e.g., protocol type).
   * @returns {Promise<Object>} Subscription data specific to the client type.
   */
  async getUserSubscriptionWithClientType(token, clientType) {
    if (typeof token !== 'string' || typeof clientType !== 'string') {
      throw new Error('Token and clientType must be strings.');
    }
    return this.api._get(`sub/${token}/${clientType}`);
  }
}

module.exports = User;
