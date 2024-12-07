class System {
    constructor(api) {
        this.api = api;
    }

    /**
     * Get system statistics.
     * Fetches details about system memory, CPU, and user metrics.
     * @returns {Promise<Object>} System statistics including memory, CPU usage, and user metrics.
     * Example Response:
     * {
     *   "version": "string",
     *   "mem_total": 0,
     *   "mem_used": 0,
     *   "cpu_cores": 0,
     *   "cpu_usage": 0,
     *   "total_user": 0,
     *   "users_active": 0,
     *   "incoming_bandwidth": 0,
     *   "outgoing_bandwidth": 0,
     *   "incoming_bandwidth_speed": 0,
     *   "outgoing_bandwidth_speed": 0
     * }
     */
    async getSystemStats() {
        return this.api._get('/system');
    }

    /**
     * Get inbound configurations.
     * Retrieves inbound configurations grouped by protocol.
     * @returns {Promise<Object>} Inbound configurations grouped by protocol.
     * Example Response:
     * {
     *   "additionalProp1": [
     *     {
     *       "tag": "string",
     *       "protocol": "vmess",
     *       "network": "string",
     *       "tls": "string",
     *       "port": 0
     *     }
     *   ],
     *   "additionalProp2": [...],
     *   "additionalProp3": [...]
     * }
     */
    async getInbounds() {
        return this.api._get('/inbounds');
    }

    /**
     * Get hosts.
     * Fetches a list of proxy hosts grouped by inbound tag.
     * @returns {Promise<Object>} Proxy host details grouped by inbound tag.
     * Example Response:
     * {
     *   "additionalProp1": [
     *     {
     *       "remark": "string",
     *       "address": "string",
     *       "port": 0,
     *       "sni": "string",
     *       "host": "string",
     *       "path": "string",
     *       "security": "inbound_default",
     *       "alpn": "",
     *       "fingerprint": "",
     *       "allowinsecure": true,
     *       "is_disabled": true,
     *       "mux_enable": true,
     *       "fragment_setting": "string",
     *       "noise_setting": "string",
     *       "random_user_agent": true
     *     }
     *   ],
     *   "additionalProp2": [...],
     *   "additionalProp3": [...]
     * }
     */
    async getHosts() {
        return this.api._get('/hosts');
    }

    /**
     * Modify hosts.
     * Updates proxy host configurations.
     * @param {Object} hostData - The new configuration data for the proxy hosts.
     * @returns {Promise<Object>} Updated host configurations.
     * Example Response:
     * {
     *   "additionalProp1": [
     *     {
     *       "remark": "string",
     *       "address": "string",
     *       "port": 0,
     *       "sni": "string",
     *       "host": "string",
     *       "path": "string",
     *       "security": "inbound_default",
     *       "alpn": "",
     *       "fingerprint": "",
     *       "allowinsecure": true,
     *       "is_disabled": true,
     *       "mux_enable": true,
     *       "fragment_setting": "string",
     *       "noise_setting": "string",
     *       "random_user_agent": true
     *     }
     *   ],
     *   "additionalProp2": [...],
     *   "additionalProp3": [...]
     * }
     * @throws {Error} Validation error if the input data format is invalid.
     */
    async modifyHosts(hostData) {
        return this.api._put('/hosts', hostData);
    }
}

module.exports = System;
