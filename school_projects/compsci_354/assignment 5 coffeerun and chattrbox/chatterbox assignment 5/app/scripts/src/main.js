import ChatApp from "./app";

const chatApp = new ChatApp();

chatApp.wsClient.registerCloseHandler(() => {
  console.log("Connection closed. Routing to popup.");
  chatApp.showReconnectConfirmation();
});
