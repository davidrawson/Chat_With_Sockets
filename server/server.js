const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// allows cross origin resource sharing
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// listen out for connections
io.on('connection', socket => {
  socket.on('chat', message => {
    io.sockets.emit('chat', message);
  });
});

const server = http.listen(3001, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
