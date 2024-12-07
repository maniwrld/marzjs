const WebSocket = require('ws');

class WebSocketClient {
  constructor(api) {
    this.api = api;
    this.wsClient = null;
  }

  connectToLogs({ interval = 1, onMessage = console.log, onError = console.error } = {}) {
    if (!this.api.token) {
      throw new Error('Not authenticated. Call authenticate() first.');
    }

    const wsEndpoint = `${this.api.wsDomain}/core/logs?interval=${interval}&token=${this.api.token}`;
    this.wsClient = new WebSocket(wsEndpoint);

    this.wsClient.on('open', () => console.log('WebSocket connection established'));
    this.wsClient.on('message', (data) => onMessage(data.toString()));
    this.wsClient.on('error', onError);
    this.wsClient.on('close', () => console.log('WebSocket connection closed'));
  }

  disconnectFromLogs() {
    if (this.wsClient) {
      this.wsClient.close();
      this.wsClient = null;
    }
  }
}

module.exports = WebSocketClient;
