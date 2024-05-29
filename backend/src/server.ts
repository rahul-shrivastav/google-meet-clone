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
    socket.on("room:join", data => {
        const { email, roomCode } = data;
        emailToSocketIdMap.set(email, socket.id);
        socketidToEmailMap.set(socket.id, email);

        emailToSocketIdMap.set(email, socket.id);
        socketidToEmailMap.set(socket.id, email);

        io.to(roomCode).emit("user:joined", { email, id: socket.id });
        socket.join(roomCode)
        io.to(socket.id).emit("room:join", data);
    });
    socket.on("user:call", ({ to, offer }) => {
        io.to(to).emit("incomming:call", { from: socket.id, offer });
    });
    socket.on("call:accepted", ({ to, ans }) => {
        io.to(to).emit("call:accepted", { from: socket.id, ans })

    })
    socket.on("peer:nego:needed", ({ to, offer }) => {
        io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
    });

    socket.on("peer:nego:done", ({ to, ans }) => {
        io.to(to).emit("peer:nego:final", { from: socket.id, ans });
    });


});

server.listen(port, () => {
    console.log(`Server running on port : ${port}`);
});