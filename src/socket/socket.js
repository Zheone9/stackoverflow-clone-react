import io from "socket.io-client";

let socket;

export const initSocket = (userId) => {
  socket = io("http://localhost:8080", {
    withCredentials: true,
    auth: {
      userId: userId,
    },
  });
  return socket;
};

export const getSocket = () => socket;
