class Core {
  constructor(api) {
      this.api = api;
  }

  /**
   * Get core statistics such as version and uptime.
   * Fetches the current status and version details of the core.
   * @returns {Promise<Object>} Core statistics
   * Example Response:
   * {
   *   "version": "string",
   *   "started": true,
   *   "logs_websocket": "string"
   * }
   */
  async getCoreStats() {
      return this.api._get('/core');
  }

  /**
   * Restart the core and all connected nodes.
   * Initiates a process to restart the core and all associated nodes.
   * @returns {Promise<Object>} Confirmation message after restarting the core
   * Example Response:
   * "string" (e.g., confirmation message)
   */
  async restartCore() {
      return this.api._post('/core/restart');
  }

  /**
   * Get the current core configuration.
   * Retrieves the current configuration settings of the core.
   * @returns {Promise<Object>} Core configuration data
   * Example Response:
   * {}
   */
  async getCoreConfig() {
      return this.api._get('/core/config');
  }

  /**
   * Modify the core configuration and restart the core.
   * Updates the configuration of the core and restarts it to apply changes.
   * @param {Object} configData - Object containing the new configuration data
   * @returns {Promise<Object>} Response indicating success or failure
   * Example Response:
   * {}
   * @throws {Error} Validation error if the provided configuration data is invalid.
   */
  async modifyCoreConfig(configData) {
      return this.api._put('/core/config', configData);
  }
}

module.exports = Core;