const { NodeCreateSchema, NodeModifySchema } = require('../schemas/NodeSchema');

class Node {
  constructor(api) {
    this.api = api;
  }

  /**
   * Retrieve the current node settings, including TLS certificate.
   * @returns {Promise<Object>} Node settings
   * Example Response:
   * {
   *   "min_node_version": "v0.2.0",
   *   "certificate": "string"
   * }
   */
  async getNodeSettings() {
    return this.api._get('/node/settings');
  }

  /**
   * Add a new node to the database and optionally add it as a host.
   * @param {Object} nodeData - Data for the new node
   * Example:
   * {
   *   "name": "DE node",
   *   "address": "192.168.1.1",
   *   "port": 62050,
   *   "api_port": 62051,
   *   "add_as_new_host": true,
   *   "usage_coefficient": 1
   * }
   * @returns {Promise<Object>} Details of the added node
   * Example Response:
   * {
   *   "name": "string",
   *   "address": "string",
   *   "port": 62050,
   *   "api_port": 62051,
   *   "usage_coefficient": 1,
   *   "id": 0,
   *   "xray_version": "string",
   *   "status": "connected",
   *   "message": "string"
   * }
   * @throws {Error} Validation error if the input data is invalid.
   */
  async addNode(nodeData) {
    const { error, value } = NodeCreateSchema.validate(nodeData);
    if (error) {
      throw new Error(`Invalid data: ${error.details.map(err => err.message).join(', ')}`);
    }
    return this.api._post('/node', value);
  }

  /**
   * Retrieve details of a specific node by its ID.
   * @param {number} nodeId - ID of the node to retrieve
   * @returns {Promise<Object>} Node details
   * Example Response:
   * {
   *   "name": "string",
   *   "address": "string",
   *   "port": 62050,
   *   "api_port": 62051,
   *   "usage_coefficient": 1,
   *   "id": 0,
   *   "xray_version": "string",
   *   "status": "connected",
   *   "message": "string"
   * }
   * @throws {Error} Validation error if the node ID is invalid.
   */
  async getNode(nodeId) {
    return this.api._get(`/node/${nodeId}`);
  }

  /**
   * Update a node's details. Only accessible to sudo admins.
   * @param {number} nodeId - ID of the node to update
   * @param {Object} nodeData - Updated data for the node
   * Example:
   * {
   *   "name": "DE node",
   *   "address": "192.168.1.1",
   *   "port": 62050,
   *   "api_port": 62051,
   *   "status": "disabled",
   *   "usage_coefficient": 1
   * }
   * @returns {Promise<Object>} Updated node details
   * Example Response:
   * {
   *   "name": "string",
   *   "address": "string",
   *   "port": 62050,
   *   "api_port": 62051,
   *   "usage_coefficient": 1,
   *   "id": 0,
   *   "xray_version": "string",
   *   "status": "connected",
   *   "message": "string"
   * }
   * @throws {Error} Validation error if the input data is invalid.
   */
  async modifyNode(nodeId, nodeData) {
    const { error, value } = NodeModifySchema.validate(nodeData);
    if (error) {
      throw new Error(`Invalid data: ${error.details.map(err => err.message).join(', ')}`);
    }
    return this.api._put(`/node/${nodeId}`, value);
  }

  /**
   * Delete a node and remove it from xray in the background.
   * @param {number} nodeId - ID of the node to delete
   * @returns {Promise<string>} Success message
   * @throws {Error} Validation error if the node ID is invalid.
   */
  async removeNode(nodeId) {
    return this.api._delete(`/node/${nodeId}`);
  }

  /**
   * Retrieve a list of all nodes. Accessible only to sudo admins.
   * @param {Object} params - Query parameters for filtering nodes
   * @returns {Promise<Array>} List of nodes
   * Example Response:
   * [
   *   {
   *     "name": "string",
   *     "address": "string",
   *     "port": 62050,
   *     "api_port": 62051,
   *     "usage_coefficient": 1,
   *     "id": 0,
   *     "xray_version": "string",
   *     "status": "connected",
   *     "message": "string"
   *   }
   * ]
   */
  async getNodes(params = {}) {
    return this.api._get('/nodes', null, params);
  }

  /**
   * Trigger a reconnection for the specified node. Only accessible to sudo admins.
   * @param {number} nodeId - ID of the node to reconnect
   * @returns {Promise<string>} Success message
   * @throws {Error} Validation error if the node ID is invalid.
   */
  async reconnectNode(nodeId) {
    return this.api._post(`/node/${nodeId}/reconnect`);
  }

  /**
   * Retrieve usage statistics for nodes within a specified date range.
   * @returns {Promise<Object>} Node usage statistics
   * Example Response:
   * {
   *   "usages": [
   *     {
   *       "node_id": 0,
   *       "node_name": "string",
   *       "uplink": 0,
   *       "downlink": 0
   *     }
   *   ]
   * }
   */
  async getNodesUsage() {
    return this.api._get('/nodes/usage');
  }
}

module.exports = Node;
