import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import { Server } from "socket.io";

dotenv.config()
const port = process.env.PORT

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
    },
});

app.get('/', (req, res) => {
    res.send("server on");
});

const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on("room:join", data => {
        // console.log(data)
        const { email, roomCode } = data;
        emailToSocketIdMap.set(email, socket.id);
        socketidToEmailMap.set(socket.id, email);

        emailToSocketIdMap.set(email, socket.id);
        socketidToEmailMap.set(socket.id, email);

        io.to(roomCode).emit("user:joined", { email, id: socket.id });
        socket.join(roomCode)
        io.to(socket.id).emit("room:join", data);
    });

});

server.listen(port, () => {
    console.log(`Server running on port : ${port}`);
});