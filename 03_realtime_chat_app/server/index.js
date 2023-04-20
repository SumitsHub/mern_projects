const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const {addUser, removeUser, getUser, getUsersInRoom} = require('./users');

const PORT = process.env.PORT || 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
app.use(cors());

// socket.io code
io.on("connection", (socket) => {
  console.log("We have new connection!");

  socket.on('join', ({name, room}, callBack)=> {
    const {error, user} = addUser({id: socket.id, name, room});

    if(error) {
      return callBack(error);
    }

    socket.emit('message', {user: 'admin', text: `${user.name}, welcome to the room ${user.room}`});

    socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined`});

    socket.join(user.room);

    io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})

    callBack();
  })

  socket.on('sendMessage', (message, callBack)=> {
    const user = getUser(socket.id);
    // console.log({user});
    io.to(user.room).emit('message', {user: user.name, text: message});
    io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});
    callBack();
  })

  socket.on("disconnect", () => {
    console.log("User had left!");
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left the room`})
    }
  });
});

app.use(router);

server.listen(PORT, () =>
  console.log(`Server is listening on port ${PORT}...`)
);
