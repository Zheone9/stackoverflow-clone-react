import io from "socket.io-client";

let socket;

export const initSocket = () => {
  socket = io("http://localhost:8080", {
    withCredentials: true,
    autoConnect: true,
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 5,
  });
  return socket;
};

export const getSocket = () => socket;
