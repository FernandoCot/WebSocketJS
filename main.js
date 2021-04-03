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

const onUserConnect = (connectionInfo) => {
  connectedList.push(connectionInfo);
}

const onUserDisconnect = (connectionInfo) => {
  connectedList = connectedList.filter((item) => item.id != connectionInfo.id);
}

const listAllConnected = () => {
  return connectedList;
}

io.on('connection', (connectionInfo) => {
  onUserConnect(connectionInfo);
  connectionInfo.broadcast.emit('userJoined', `User connected: ${connectionInfo.name}`);

  connectionInfo.on("listAll", () => {
    listAllConnected();
    connectionInfo.emit('allConnectedUsers', connectedList);
  });

  connectionInfo.on("disconnect", () => {
    onUserDisconnect(connectionInfo);
    connectionInfo.broadcast.emit('userLeft', `User disconnected: ${connectionInfo.name}`);
  });
});

const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));