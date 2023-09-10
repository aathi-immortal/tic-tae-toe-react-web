import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

class WebSocketService {
  static instance = null;

  constructor() {
    if (WebSocketService.instance) {
      return WebSocketService.instance;
    }

    // Initialize SockJS and STOMP
    this.stompClient = null;
    WebSocketService.instance = this;
  }

  connect() {
    this.sockjs = new SockJS('https://tic-toe123.azurewebsites.net/game'); // Replace with your server URL
    this.stompClient = new Client({
      webSocketFactory: () => this.sockjs,
      debug: (str) => {
        console.log(str);
      },
    });

    this.stompClient.onConnect = () => {
      console.log('STOMP connection established.');
      this.subscribe("/private/123");
      // this.subscribeToDestination('/private/123'); // Replace with your desired destination
    };

    this.stompClient.activate();
  }

  sendMessage = (message) => {
    console.log(message);
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination: '/app/sendMessageToPrivateRoom',
        body: JSON.stringify(message),
      });

    }
    else
    {
      console.log("sorry");
    }
  };

  subscribe(destination)
  {
    this.stompClient.subscribe(destination,(message)=>
    {
      console.log(message);
    })
  }
  // Don't forget to disconnect the S TOMP connection when needed
  disconnect = () => {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.deactivate();
      console.log('STOMP connection closed.');
    }
  };
}

export default WebSocketService;
