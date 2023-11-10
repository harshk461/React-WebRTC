// //index.js
require('dotenv').config();
const express = require('express');
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ['GET', 'POST'],
        credentials: true
    }
});
app.use(cors());
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello World');
});

io.on("connection", (socket) => {
    console.log(socket.id);
    socket.emit("me", socket.id);
    socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded")
    });
    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
        io.to(userToCall).emit("callUser", { signal: signalData, from, name });
    });
    socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal)
    });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));