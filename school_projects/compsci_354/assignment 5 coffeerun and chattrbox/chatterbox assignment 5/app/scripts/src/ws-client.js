let socket;

function init(url) {
  socket = new WebSocket(url);
  console.log("connecting...");
}

function registerOpenHandler(handlerFunction) {
  socket.onopen = () => {
    console.log("open");
    handlerFunction();
  };
}

function registerMessageHandler(handlerFunction) {
  socket.onmessage = (e) => {
    console.log("message", e.data);
    let data = JSON.parse(e.data);
    handlerFunction(data);
  };
}
//This is the function for registerCloseHandler that gets exported to
//our other .js files
function registerCloseHandler(handlerFunction) {
  socket.onclose = () => {
    console.log("close");
    handlerFunction();
  };
}

function sendMessage(payload) {
  socket.send(JSON.stringify(payload));
}
//Make sure to include registerCloseHandler in the exports below
export default {
  init,
  registerOpenHandler,
  registerMessageHandler,
  registerCloseHandler,
  sendMessage,
};
