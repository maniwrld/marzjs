# 🌐 MarzJS

A powerful and easy-to-use Node.js client for interacting with the Marzban Panel API.

## 🚀 Features

- 💡 Full API coverage for Marzban
- 🔒 Secure authentication (token-based and credentials-based)
- 🔄 Comprehensive method support
- 🧩 Easy-to-use interface
- 📊 WebSocket log streaming
- ♻️ Automatic retry mechanism for network requests

## 📦 Installation

```bash
npm install @maniwrld/marzjs
```

## 🛠 Quick Start

### Authentication Methods

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

// Option 1: Authentication with username and password
const client = new MarzbanAPI({
  domain: 'your-marzban-server.com',
  port: 8000,
  username: 'admin',
  password: 'your-password',
  ssl: true  // Optional: use HTTPS/WSS
});

// Option 2: Authentication with token (skip credentials)
const clientWithToken = new MarzbanAPI({
  domain: 'your-marzban-server.com',
  port: 8000,
  token: 'your-access-token',
  ssl: true  // Optional: use HTTPS/WSS
});

// Option 3: Customize retry and timeout settings
const robustClient = new MarzbanAPI({
  domain: 'your-marzban-server.com',
  port: 8000,
  username: 'admin',
  password: 'your-password',
  ssl: true,
  timeout: 15000,        // Custom timeout (ms)
  retryDelay: 2000,      // Delay between retries (ms)
  maxRetries: 5          // Maximum number of retries
});
```

## 🌟 Key Methods

### 👤 Admin Operations
- [`getCurrentAdmin()`](#get-current-admin): Get current admin details
- [`createAdmin(adminData)`](#create-a-admin): Create a new admin
- [`modifyAdmin(username, adminData)`](#modify-a-admin): Update admin information
- [`removeAdmin(username)`](#remove-a-admin): Delete an admin
- [`getAdmins(params)`](#get-admins): Retrieve list of admins

### 📊 User Management
- [`addUser()`](#user-creation): Create a new user
- [`getUser()`](#fetching-user-information): Retrieve user details
- [`modifyUser()`](#modifying-user): Update user information
- [`removeUser()`](#deleting-user): Delete a user
- [`getUserUsage()`](#get-user-usage): Check user's data usage
- [`resetUserDataUsage()`](#reset-user-data-usage): Reset a user's data usage
- [`revokeUserSubscription()`](#revoke-user-subscription): Revoke user's subscription
- [`getUsers()`](#get-users): Retrieve list of all users
- [`resetUsersDataUsage()`](#reset-users-data-usage): Reset data usage for all users
- [`setUserOwner()`](#set-user-owner): Set a user's admin parent
- [`getExpiredUsers()`](#get-expired-users): Retrieve list of expired users
- [`deleteExpiredUsers()`](#delete-expired-users): Delete expired users

### 🔗 Subscription Handling (Under user class)
- [`getUserSubscription(token)`](#get-user-subscription): Get subscription details
- [`getUserSubscriptionInfo(token)`](#get-user-subscription-information): Get detailed subscription information
- [`getUserSubscriptionUsage(token)`](#get-user-subscription-usage): Check subscription usage
- [`getUserSubscriptionWithClientType(token, clientType)`](#get-user-subscription-with-client-type): Get subscription for specific client type

### 📝 Template Management
- [`getUserTemplates()`](#get-user-templates): Get list of user templates
- [`addUserTemplate(templateData)`](#add-user-template): Create a new user template
- [`getUserTemplateById(template_id)`](#get-user-template-by-id): Get template by ID
- [`modifyUserTemplate(id, templateData)`](#modify-user-template): Update a user template
- [`removeUserTemplate(id)`](#deleting-user-template): Delete a user template

### 🖥 Node Operations
- [`getNodeSettings()`](#get-node-settings): Retrieve node settings
- [`addNode(nodeData)`](#add-node): Add a new node
- [`getNode(nodeId)`](#get-node): Get details of a specific node
- [`modifyNode(nodeId, nodeData)`](#modify-node): Update node information
- [`removeNode(nodeId)`](#remove-node): Delete a node
- [`getNodes(params)`](#get-nodes): Retrieve list of nodes
- [`reconnectNode(nodeId)`](#reconnect-node): Reconnect a node
- [`getNodesUsage()`](#get-node-usage): Retrieve usage statistics for nodes

### 🌐 System Insights
- [`getSystemStats()`](#get-system-stats): Fetch system statistics
- [`getInbounds()`](#get-inbounds): Get available inbounds
- [`getHosts()`](#get-hosts): Retrieve host information
- [`modifyHosts(hostData)`](#modify-hosts): Update host configuration

### 💻 Core System Management
- [`getCoreStats()`](#get-core-stats): Get core system statistics
- [`restartCore()`](#restart-core): Restart the core system
- [`getCoreConfig()`](#get-core-config): Retrieve core configuration
- [`modifyCoreConfig(configData)`](#modify-core-config): Modify core configuration

### 🔌 WebSocket Logging

```javascript
client.connectToLogs({
  interval: 1,  // Log polling interval
  onMessage: (logData) => {
    console.log('Received log:', logData);
  },
  onError: (error) => {
    console.error('WebSocket error:', error);
  }
});

// Don't forget to disconnect when done
client.disconnectFromLogs();
```

## 🔧 Configuration Options

When initializing the MarzJS client, you can customize the following parameters:

- `domain`: Your Marzban server domain (required)
- `port`: Server port (required)
- `username`: Admin username (optional if using token)
- `password`: Admin password (optional if using token)
- `token`: Authentication token (optional alternative to username/password)
- `ssl`: Use HTTPS/WSS (default: false)
- `timeout`: Request timeout in milliseconds (default: 10000)
- `retryDelay`: Delay between retry attempts in milliseconds (default: 1000)
- `maxRetries`: Maximum number of retry attempts (default: 3)

## 🛠 Troubleshooting

### Common Connection Issues

1. **Authentication Failures**
   - **Symptom**: Repeated 401 or 403 errors
   - **Possible Causes**:
     * Incorrect domain or port
     * Expired or invalid credentials
     * Network restrictions
   - **Solutions**:
     ```javascript
     // Double-check your connection parameters
     const marzban = new MarzbanAPI({
       domain: 'correct-domain.com',
       port: 8080,
       username: 'admin',
       password: 'correct-password',
       ssl: true
     });
     ```

2. **Network Timeout Errors**
   - **Symptom**: Requests timing out frequently
   - **Possible Causes**:
     * Slow network connection
     * Server under heavy load
     * Firewall restrictions
   - **Solutions**:
     ```javascript
     // Increase timeout and retry settings
     const robustClient = new MarzbanAPI({
       domain: 'example.com',
       timeout: 30000,        // Increased to 30 seconds
       retryDelay: 3000,      // 3 seconds between retries
       maxRetries: 5          // More retry attempts
     });
     ```

3. **WebSocket Connection Problems**
   - **Symptom**: Unable to establish log streaming connection
   - **Possible Causes**:
     * Incorrect SSL configuration
     * Firewall blocking WebSocket
     * Incorrect API permissions
   - **Solutions**:
     ```javascript
     try {
       client.connectToLogs({
         interval: 2,  // Adjust polling interval
         onError: (error) => {
           console.error('Detailed WebSocket error:', error);
           // Implement reconnection logic if needed
         }
       });
     } catch (error) {
       console.error('Log connection initialization error:', error);
     }
     ```

### Debugging Tips

- **Enable Verbose Logging**: Use Node.js debugging tools or environment variables to get more detailed error information
- **Check Marzban Panel Logs**: Cross-reference with server-side logs for comprehensive troubleshooting
- **Verify API Endpoint**: Ensure your Marzban Panel is running and accessible

### Getting Help

- **GitHub Issues**: [Open an issue](https://github.com/maniwrld/marzjs/issues) with detailed error logs
- **Community Support**: Check project discussions for known issues
- **Provide Detailed Information**:
  * Node.js version
  * MarzJS version
  * Complete error message
  * Minimal reproducible example

## 💡 Examples

<a name="get-current-admin"></a>

### 💻 Get current admin

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const response = await marzban.admin.getCurrentAdmin();
    console.log(response)
  } catch (error) {
    console.error(`Error getting current admin:`, error.message);
  }
})();
```
<a name="create-a-admin"></a>

### 💻 Create a admin

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const admin_data = {
      "username": "chilladmin",
      "is_sudo": true,
      "telegram_id": 0,
      "discord_webhook": "",
      "password": "securepasswordhopefully"
    }
    const response = await marzban.admin.createAdmin(admin_data);
    console.log(response)
  } catch (error) {
    console.error(`Error creating admin:`, error.message);
  }
})();
```
<a name="modify-a-admin"></a>

### 💻 Modify a admin

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const target_admin = "chilladmin";
    const admin_data = {
      "password": "hopefullysecurethistime",
      "is_sudo": true,
      "telegram_id": 0,
      "discord_webhook": ""
     }
    const response = await marzban.admin.modifyAdmin(target_admin, admin_data);
    console.log(response)
  } catch (error) {
    console.error(`Error modifying admin:`, error.message);
  }
})();
```

<a name="remove-a-admin"></a>

### 💻 Remove a admin

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const target_admin = "notchilladmin";
    const response = await marzban.admin.removeAdmin(target_admin);
    console.log(response)
  } catch (error) {
    console.error(`Error removing admin:`, error.message);
  }
})();
```

<a name="get-admins"></a>

### 💻 Get admins

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const response = await marzban.admin.getAdmins();
    console.log(response)
  } catch (error) {
    console.error(`Error listing admins:`, error.message);
  }
})();
```

<a name="user-creation"></a>

### 💻 User creation

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
    try {
        const userData = {
            status: "active",
            username: "JohnDoe",
            note: "Created using marzban api",
            proxies: {
                vmess: {}
            },
            data_limit: 0,
            expire: 0,
            data_limit_reset_strategy: "no_reset",
            inbounds: {
                vmess: ["VMess TCP"]
            }
        };

        const response = await marzban.user.addUser(userData);
        console.log('User added successfully:', response);
    } catch (error) {
        console.error('Error adding user:', error.message);
    }
})();

```

<a name="fetching-user-information"></a>

### 💻 Fetching user information

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const username = 'user1234'; 
    const response = await marzban.user.getUser(username);
    console.log('User information retrieved successfully:', response);
  } catch (error) {
    console.error('Error retrieving user information:', error.message);
  }
})();
```

<a name="modifying-user"></a>

### 💻 Modifying user 

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const username = 'user1234'; 
    const userData = {
      proxies: {
        vmess: {
          id: '35e4e39c-7d5c-4f4b-8b71-558e4f37ff53'
        },
        vless: {}
      },
      inbounds: {
        vmess: ['VMess TCP', 'VMess Websocket'],
        vless: ['VLESS TCP REALITY', 'VLESS GRPC REALITY']
      },
      expire: 0,
      data_limit: 0,
      data_limit_reset_strategy: 'no_reset',
      status: 'active',
      note: 'Updated note',
      on_hold_timeout: '2023-11-03T20:30:00',
      on_hold_expire_duration: 0
    };

    const response = await marzban.user.modifyUser(username, userData);
    console.log('User modified successfully:', response);
  } catch (error) {
    console.error('Error modifying user:', error.message);
  }
})();
```

<a name="deleting-user"></a>

### 💻 Deleting user

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const username = 'user1234'; 
    const response = await marzban.user.removeUser(username);
    console.log('User removed successfully:', response);
  } catch (error) {
    console.error('Error removing user:', error.message);
  }
})();
```

<a name="get-user-usage"></a>

### 💻 Get user usage

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const username = 'user1234'; 
    const response = await marzban.user.getUserUsage(username);
    console.log(response)
  } catch (error) {
    console.error(`Error getting user's usage:`, error.message);
  }
})();
```

<a name="reset-user-data-usage"></a>

### 💻 Reset User Data Usage

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const username = 'user1234'; 
    const response = await marzban.user.resetUserDataUsage(username);
    console.log(response)
  } catch (error) {
    console.error(`Error resetting user's usage:`, error.message);
  }
})();
```

<a name="revoke-user-subscription"></a>

### 💻 Revoke User Subscription

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const username = 'user1234'; 
    const response = await marzban.user.revokeUserSubscription(username);
    console.log(response)
  } catch (error) {
    console.error(`Error revoking user's subscription:`, error.message);
  }
})();
```

<a name="get-users"></a>

### 💻 Get users

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const response = await marzban.user.getUsers();
    console.log(response)
  } catch (error) {
    console.error(`Error listing all users:`, error.message);
  }
})();
```

<a name="reset-all-users-usage"></a>

### 💻 Reset all users usage

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const response = await marzban.user.resetUsersDataUsage();
    console.log(response)
  } catch (error) {
    console.error(`Error resetting usage for all users:`, error.message);
  }
})();
```

<a name="set-user-owner"></a>

### 💻 Set user owner

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const target_user = "chilluser";
    const target_admin = "chilladmin";
    const response = await marzban.user.setUserOwner(target_user, target_admin);
    console.log(response)
  } catch (error) {
    console.error(`Error setting ${target_admin} as admin parent for ${target_user}:`, error.message);
  }
})();
```

<a name="get-expired-users"></a>

### 💻 Get expired users

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const response = await marzban.user.getExpiredUsers();
    console.log(response)
  } catch (error) {
    console.error(`Error listing expired users:`, error.message);
  }
})();
```

<a name="delete-expired-users"></a>

### 💻 Delete expired users

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const response = await marzban.user.deleteExpiredUsers();
    console.log(response)
  } catch (error) {
    console.error(`Error deleting expired users:`, error.message);
  }
})();
```

<a name="get-user-subscription"></a>

### 💻 Get user subscription

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const token = "COOLTOKENINSERTEDHERE";
    const response = await marzban.user.getUserSubscription(token);
    console.log(response)
  } catch (error) {
    console.error(`Error getting user subscription:`, error.message);
  }
})();
```

<a name="get-user-subscription-information"></a>

### 💻 Get user subscription information

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const token = "COOLTOKENINSERTEDHERE";
    const response = await marzban.user.getUserSubscriptionInfo(token);
    console.log(response)
  } catch (error) {
    console.error(`Error getting user subscription information:`, error.message);
  }
})();
```

<a name="get-user-subscription-usage"></a>

### 💻 Get user subscription usage

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const token = "COOLTOKENINSERTEDHERE";
    const response = await marzban.user.getUserSubscriptionUsage(token);
    console.log(response)
  } catch (error) {
    console.error(`Error getting user subscription usage:`, error.message);
  }
})();
```

<a name="get-user-subscription-with-client-type"></a>

### 💻 Get user subscription with client type

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const token = "COOLTOKENINSERTEDHERE";
    const client = "clash"; 
    const response = await marzban.user.getUserSubscriptionWithClientType(token, client);
    console.log(response)
  } catch (error) {
    console.error(`Error getting user subscription with client type:`, error.message);
  }
})();
```

<a name="get-user-templates"></a>

### 💻 Get user templates

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const response = await marzban.templates.getUserTemplates();
    console.log(response)
  } catch (error) {
    console.error(`Error listing user templates:`, error.message);
  }
})();
```

<a name="add-user-template"></a>

### 💻 Add user template

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const template_data = {
     "name": "cool_template",
      "inbounds": {
       "vmess": [
          "VMESS_INBOUND"
       ],
        "vless": [
          "VLESS_INBOUND"
       ]
     },
      "data_limit": 0,
      "expire_duration": 0
    }
    const response = await marzban.templates.addUserTemplate(template_data);
    console.log(response)
  } catch (error) {
    console.error(`Error creating template:`, error.message);
  }
})();
```

<a name="get-user-template-by-id"></a>

### 💻 Get user template by id

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const template_id = "1";
    const response = await marzban.templates.getUserTemplateById(template_id);
    console.log(response)
  } catch (error) {
    console.error(`Error getting template by id:`, error.message);
  }
})();
```

<a name="modify-user-template"></a>

### 💻 Modify user template

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const target_template_id = "1";
    const template_data = {
      "name": "cool_template_2",
      "inbounds": {
       "vmess": [
          "VMESS_INBOUND"
       ]
     },
     "data_limit": 0,
      "expire_duration": 0
    }
    const response = await marzban.templates.modifyUserTemplate(target_template_id, template_data);
    console.log(response)
  } catch (error) {
    console.error(`Error modifying template:`, error.message);
  }
})();
```

<a name="deleting-user-template"></a>

### 💻 Deleting user template

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const target_template_id = "1";
    const response = await marzban.templates.removeUserTemplate(target_template_id);
    console.log(response)
  } catch (error) {
    console.error(`Error deleting template:`, error.message);
  }
})();
```

<a name="get-node-settings"></a>

### 💻 Get node settings

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const node_settings = await marzban.node.getNodeSettings();
    console.log(node_settings)
  } catch (error) {
    console.error(`Error getting node settings:`, error.message);
  }
})();
```

<a name="add-node"></a>

### 💻 Add node

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const node_data = {
      "name": "Germany node",
      "address": "192.168.1.1",
      "port": 62050,
      "api_port": 62051,
      "add_as_new_host": false,
      "usage_coefficient": 1
    }
    const node = await marzban.node.addNode(nodeData);
    console.log(node);
  } catch (error) {
    console.error(`Error while adding a new node:`, error.message);
  }
})();
```

<a name="get-node"></a>

### 💻 Get node

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const target_node_id = "1";
    const node = await marzban.node.getNode(target_node_id);
    console.log(node);
  } catch (error) {
    console.error(`Error while getting a node:`, error.message);
  }
})();
```

<a name="modify-node"></a>

### 💻 Modify node

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const target_node_id = "1";
    const new_node_data = {
      "name": "Germany Node Modified",
      "address": "192.168.1.1",
      "port": 62050,
      "api_port": 62051,
      "status": "disabled",
      "usage_coefficient": 1
    }
    const node = await marzban.node.modifyNode(target_node_id, new_node_data);
    console.log(node);
  } catch (error) {
    console.error(`Error while modifying a node:`, error.message);
  }
})();
```

<a name="remove-node"></a>

### 💻 Remove node

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const target_node_id = "1";
    const node = await marzban.node.removeNode(target_node_id);
    console.log(node);
  } catch (error) {
    console.error(`Error while removing a node:`, error.message);
  }
})();
```

<a name="get-nodes"></a>

### 💻 Get nodes

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const nodes = await marzban.node.getNodes();
    console.log(nodes);
  } catch (error) {
    console.error(`Error while retrieving nodes:`, error.message);
  }
})();
```

<a name="reconnect-node"></a>

### 💻 Reconnect node

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const target_node_id = "1";
    const node = await marzban.node.reconnectNode(target_node_id);
    console.log(node);
  } catch (error) {
    console.error(`Error while retrieving nodes:`, error.message);
  }
})();
```

<a name="get-nodes-usage"></a>

### 💻 Get nodes usage

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const nodes_usage = await marzban.node.getNodesUsage();
    console.log(nodes_usage);
  } catch (error) {
    console.error(`Error while retrieving nodes usages:`, error.message);
  }
})();
```

<a name="get-system-stats"></a>

### 💻 Get system stats

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const system_stats = await marzban.system.getSystemStats();
    console.log(system_stats);
  } catch (error) {
    console.error(`Error while getting system stats:`, error.message);
  }
})();
```

<a name="get-inbounds"></a>

### 💻 Get inbounds

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const inbounds = await marzban.system.getInbounds();
    console.log(inbounds);
  } catch (error) {
    console.error(`Error while getting inbounds:`, error.message);
  }
})();
```

<a name="get-hosts"></a>

### 💻 Get hosts

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const hosts = await marzban.system.getHosts();
    console.log(hosts);
  } catch (error) {
    console.error(`Error while getting hosts:`, error.message);
  }
})();
```

<a name="modify-hosts"></a>

### 💻 Modify hosts

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const host_data = {
       "VLESS_CDN_INBOUND": [
         {
            "remark": "Germany Node",
            "address": "192.168.1.1",
            "port": 8585,
            "sni": "",
            "host": "",
            "path": "",
            "security": "inbound_default",
            "alpn": "",
            "fingerprint": "",
            "allowinsecure": true,
            "is_disabled": true,
            "mux_enable": true,
            "fragment_setting": "",
            "noise_setting": "",
            "random_user_agent": true
         }
       ]
     };
    const hosts = marzban.system.modifyHosts(host_data);
    console.log(hosts);
  } catch (error) {
    console.error(`Error while modifying hosts:`, error.message);
  }
})();
```

<a name="get-core-stats"></a>

### 💻 Get core stats

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const core_stats = marzban.core.getCoreStats();
    console.log(core_stats);
  } catch (error) {
    console.error(`Error while getting core stats:`, error.message);
  }
})();
```

<a name="restart-core"></a>

### 💻 Restart core

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const restart_core = marzban.core.restartCore();
    console.log(restart_core);
  } catch (error) {
    console.error(`Error while restarting core:`, error.message);
  }
})();
```

<a name="get-core-config"></a>

### 💻 Get core config

```javascript
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const core_config = marzban.core.getCoreConfig();
    console.log(core_config);
  } catch (error) {
    console.error(`Error while getting core config:`, error.message);
  }
})();
```

<a name="modify-core-config"></a>

### 💻 Modify core config

```javascript
const fs = require('fs');
const MarzbanAPI = require('@maniwrld/marzjs');

const marzban = MarzbanAPI({
  domain: 'example.com',
  port: 8080,
  ssl: true,
  username: 'admin',
  password: 'securepassword'
});

(async () => {
  try {
    const xrayConfigPath = './xray_config.json';
    if (!fs.existsSync(xrayConfigPath)) {
      throw new Error('xray_config.json file not found');
    }

    const xrayConfigContent = fs.readFileSync(xrayConfigPath, 'utf8');
    const xrayConfig = JSON.parse(xrayConfigContent);

    const coreConfig = await marzban.core.modifyCoreConfig(xrayConfig);
    console.log('Core configuration updated successfully:', coreConfig);
  } catch (error) {
    console.error(`Error while modifying core config:`, error.message);
  }
})();
```

## 🛡 Error Handling

The library provides comprehensive error handling:
- Automatic token refresh
- Detailed error messages
- Joi input validation

## 📝 Requirements

- Node.js 12.0.0 or higher
- Dependencies: axios, ws, qs, joi

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0)

## 🏷️ Versioning

Current Version: **1.0.6**  
We use [SemVer](http://semver.org/) for versioning.

## 💌 Support

Encountering issues? [Open an issue](https://github.com/maniwrld/marzjs/issues) on GitHub.

## ⭐ Support the Project

If you find MarzJS useful, please give it a star on [GitHub](https://github.com/maniwrld/marzjs)! It helps us stay motivated and grow the project.