import socket from "./ws-client";
import { ChatForm, ChatList, promptForUsername } from "./dom";
import { UserStore } from "./storage";

const FORM_SELECTOR = '[data-chat="chat-form"]';
const INPUT_SELECTOR = '[data-chat="message-input"]';
const LIST_SELECTOR = '[data-chat="message-list"]';

let userStore = new UserStore("x-chattrbox/u");
let username = userStore.get();

if (!username) {
  username = promptForUsername();
  userStore.set(username);
}

class ChatApp {
  constructor() {
    this.chatForm = new ChatForm(FORM_SELECTOR, INPUT_SELECTOR);
    this.chatList = new ChatList(LIST_SELECTOR, username);
    this.wsClient = socket;

    this.wsClient.init("ws://localhost:3001");

    this.wsClient.registerOpenHandler(() => {
      this.chatForm.init((data) => {
        let message = new ChatMessage({ message: data });
        this.wsClient.sendMessage(message.serialize());
      });
      this.chatList.init();
    });

    this.wsClient.registerMessageHandler((data) => {
      console.log(data);
      let message = new ChatMessage(data);
      this.chatList.drawMessage(message.serialize());
    });
    //Added the socket.registerCloseHandler here so that it can be called form the ChatApp object in main.js
    socket.registerCloseHandler(() => {
      this.showReconnectConfirmation();
    });
  }
  //This is the main script that handles the popup.
  //It logs a few things to the console for debugging and seeing
  // where you are in the tree of actions if it breaks somewhere

  showReconnectConfirmation() {
    console.log("Showing reconnection confirmation...");
    //The line right below is what actually throws the popup
    const confirmReconnect = confirm(
      "Connection closed. Do you want to reconnect?"
    );
    console.log("User chose to reconnect:", confirmReconnect);
    //The if else statement that handles the confirm or cancel from the user input
    if (confirmReconnect) {
      setTimeout(() => {
        this.reconnect();
      }, 3000);
    } else {
      console.log("Reconnection canceled");
    }
  }
  //This is a seperate function that gets called above to actually try
  // and reconnect to the localhost server
  reconnect() {
    console.log("Attempting to reconnect...");
    socket.init("ws://localhost:3000");
  }
}

class ChatMessage {
  constructor({
    message: m,
    user: u = username,
    timestamp: t = new Date().getTime(),
  }) {
    this.message = m;
    this.user = u;
    this.timestamp = t;
  }
  serialize() {
    return {
      user: this.user,
      message: this.message,
      timestamp: this.timestamp,
    };
  }
}

export default ChatApp;
