const axios = require('axios');
const qs = require('qs');

class MarzbanAPI {
  /**
   * Initializes the MarzbanAPI client with the provided configuration.
   * @param {Object} config - Configuration object for the MarzbanAPI client.
   * @param {string} config.domain - The domain for the API server.
   * @param {number} config.port - The port for the API server.
   * @param {boolean} [config.ssl=false] - Whether to use SSL (default is false).
   * @param {string} config.username - The username for authentication.
   * @param {string} config.password - The password for authentication.
   * @param {string|null} [config.token=null] - An optional pre-existing token for authentication.
   * @param {number} [config.timeout=10000] - Timeout for API requests (in ms).
   * @param {number} [config.retryDelay=1000] - Delay between retries (in ms).
   * @param {number} [config.maxRetries=3] - Maximum number of retry attempts.
   */
  constructor({ domain, port, ssl = false, username, password, token = null, timeout = 10000, retryDelay = 1000, maxRetries = 3 }) {
    this.domain = `${ssl ? 'https' : 'http'}://${domain}:${port}/api`;
    this.wsDomain = `${ssl ? 'wss' : 'ws'}://${domain}:${port}/api`;
    this.credentials = { username, password };
    this.token = token;
    this.timeout = timeout;
    this.retryDelay = retryDelay;
    this.maxRetries = maxRetries;
  }

  /**
   * Authenticate the client using the provided username and password.
   * @returns {Promise<string>} The access token for authenticated requests.
   * @throws {Error} Throws an error if the authentication request fails.
   */
  async authenticate() {
    if (this.token) return this.token;

    const data = qs.stringify({
      grant_type: 'password',
      username: this.credentials.username,
      password: this.credentials.password,
    });

    const responseData = await this._retry(async () =>
      axios.post(`${this.domain}/admin/token`, data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        timeout: this.timeout,
      })
    );

    this.token = responseData.access_token;
    return this.token;
  }

  /**
   * Handles retry logic for failed requests due to timeouts.
   * @param {Function} requestFn - The function that performs the HTTP request.
   * @param {number} [retryCount=0] - The current retry attempt count.
   * @returns {Promise<Object>} The response data from the request.
   * @throws {Error} Throws an error if retries are exhausted or if the error is not related to timeouts.
   */
  async _retry(requestFn, retryCount = 0) {
    try {
      const response = await requestFn();
      return response.data;
    } catch (error) {
      if (retryCount < this.maxRetries && error.code === 'ETIMEDOUT') {
        console.warn(`Request timed out. Retrying (${retryCount + 1}/${this.maxRetries})...`);
        await new Promise((resolve) => setTimeout(resolve, this.retryDelay));
        return this._retry(requestFn, retryCount + 1);
      }
      throw error;
    }
  }

  /**
   * Sends an HTTP request to the API with the specified method.
   * @param {string} method - The HTTP method to use (e.g., 'get', 'post', 'put', 'delete').
   * @param {string} endpoint - The endpoint path for the request.
   * @param {Object|null} [data=null] - Optional data to send with the request (for POST, PUT).
   * @param {Object} [params={}] - Optional query parameters for the request.
   * @param {number} [retryCount=0] - The current retry attempt count.
   * @returns {Promise<Object>} The response data from the request.
   * @throws {Error} Throws an error if the request fails after retries or if the token is invalid.
   */
  async _request(method, endpoint, data = null, params = {}, retryCount = 0) {
    if (!this.token) {
      await this.authenticate();
    }

    return this._retry(async () =>
      axios({
        timeout: this.timeout,
        method,
        url: `${endpoint.includes('sub') ? this.domain.replace(/api/, '') : this.domain}${endpoint}`,
        headers: { Authorization: `Bearer ${this.token}` },
        params,
        data,
      })
    );
  }

  /**
   * Sends a GET request to the API.
   * @param {string} endpoint - The endpoint path for the GET request.
   * @param {Object} params - Optional query parameters for the request.
   * @returns {Promise<Object>} The response data from the GET request.
   */
  async _get(endpoint, params) {
    return this._request('get', endpoint, null, params);
  }

  /**
   * Sends a POST request to the API.
   * @param {string} endpoint - The endpoint path for the POST request.
   * @param {Object} data - The data to send in the POST request.
   * @returns {Promise<Object>} The response data from the POST request.
   */
  async _post(endpoint, data) {
    return this._request('post', endpoint, data);
  }

  /**
   * Sends a PUT request to the API.
   * @param {string} endpoint - The endpoint path for the PUT request.
   * @param {Object} data - The data to send in the PUT request.
   * @returns {Promise<Object>} The response data from the PUT request.
   */
  async _put(endpoint, data) {
    return this._request('put', endpoint, data);
  }

  /**
   * Sends a DELETE request to the API.
   * @param {string} endpoint - The endpoint path for the DELETE request.
   * @returns {Promise<Object>} The response data from the DELETE request.
   */
  async _delete(endpoint) {
    return this._request('delete', endpoint);
  }
}

module.exports = MarzbanAPI;
