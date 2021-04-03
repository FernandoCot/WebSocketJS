import http from 'http';
import express from 'express';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let connectedList = [
  {
    id: 1,
    name: 'Test'
  }
];

const onConnect = (connectionInfo) => {
  connectedList.push(connectionInfo);
}

const onDisconnect = (connectionInfo) => {
  connectedList = connectedList.filter((item) => item.id != connectionInfo.id);
}

const listAllConnected = () => {
  return connectedList;
}

io.on('connect', (connectionInfo) => {
  onConnect(connectionInfo);
  socket.on("listAll", () => listAllConnected());
  socket.on("disconnect", () => onDisconnect(connectionInfo));
});

const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));