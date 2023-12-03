const { WebSocket } = require('ws');

const wsURL = process.env.WS_URL;
let wsInstance;

function createWebSocketConnection() {
  function heartbeat() {
    clearTimeout(this.pingTimeout);

    this.pingTimeout = setTimeout(() => {
      this.terminate();
      createWebSocketConnection();
    }, 30000 + 1000);
  }

  wsInstance = new WebSocket(wsURL);

  wsInstance.on('error', console.error);

  wsInstance.on('ping', heartbeat);

  wsInstance.on('close', function clear() {
    clearTimeout(this.pingTimeout);
    setTimeout(() => createWebSocketConnection(), 5000);
  });
}

function sendWSMessage(message) {
  if (wsInstance && wsInstance.readyState === WebSocket.OPEN) {
    wsInstance.send(JSON.stringify(message));
  } else {
    console.error('WebSocket connection is not open. Cannot send message.');
  }
}

createWebSocketConnection();

module.exports = {
  sendWSMessage,
};
