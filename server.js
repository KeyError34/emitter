const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
// Событие подключения нового пользователя
io.on('connection', (socket) => {
  console.log('A user connected');

  // Обработка сообщения от пользователя
  socket.on('sendMessage', ({ username, message }) => {
    // Транслируем сообщение всем пользователям
    io.emit('message', { username, message });
  });

  // Событие отключения пользователя
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});
// Запуск сервера
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

