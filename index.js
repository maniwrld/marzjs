const ConfigSchema = require('./schemas/ConfigSchemas');
const MarzbanAPI = require('./classes/MarzbanAPI');
const Admin = require('./classes/Admin');
const Core = require('./classes/Core');
const Node = require("./classes/Node");
const User = require('./classes/User');
const Template = require('./classes/Template');
const WebSocketClient = require('./classes/WebSocketClient');
const System = require('./classes/System');

module.exports = (config) => {
  const { error } = ConfigSchema.validate(config);
  if (error) {
    throw new Error(`Invalid configuration: ${error.details.map((d) => d.message).join(', ')}`);
  }

  const api = new MarzbanAPI(config);
  const userInstance = new User(api); // Instantiate User separately

  return {
    api, // Raw API client
    system: new System(api), // System operations
    admin: new Admin(api), // Admin functionalities
    core: new Core(api),   // Core functionalities
    node: new Node(api),   // Node functionalities
    user: userInstance,    // User management
    template: new Template(api), // Template functionalities
    wsClient: new WebSocketClient(api), // WebSocket client
  };
};
