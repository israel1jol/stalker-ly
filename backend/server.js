const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const http = require("http");


const app = express();
const server = http.createServer(app);

//Chat Socket

// const io = require("socket.io")(server, {cors:{origin:"*"}});
// io.on("connection", (err, socket) => {
//     socket.on("login", (res, callback) => {
//         socket.join(res.room);
//         socket.broadcast.to(res.room).emit("message", {"userId":"00000", "message":`Welcome to the chat`})
//     })

//     socket.on("sendMessage", (res, callback) => {
//         const userId = res.userId;
//         const msgBody = res.messageBody;
//         const room = res.chatRoom;

//         Message.create({userId: userId, messageBody:msgBody, chatRoom:room}, (err, msg) => {
//             if(err) return callback(err);
//             io.to(room).emit("message", {"userId":userId, "message":msgBody})
//         })
//     })
// })




app.use(express.json());
app.use(cors());

mongoose.connect(process.env.COMPASS_URI, {useNewUrlParser:true})
const connection = mongoose.connection
connection.once('open', () => {
    console.log("MongoDB connection established successfully")
})

app.use('/api/user', require("./routes/User"));
app.use('/api/post', require("./routes/Post"));
app.use('/uploads', express.static("./uploads"));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));