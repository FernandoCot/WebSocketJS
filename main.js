import http from 'http';
import express from 'express';
import socketio from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const onConnect = (info) => {
  console.log(info);
}

const onDisconnect = (info) => {
  console.log(info);
}

const listAllConnected = () => {
  return [];
}

io.on('connection', (info) => {
  onConnect(info);
  // onDisconnect(info);
});

const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));