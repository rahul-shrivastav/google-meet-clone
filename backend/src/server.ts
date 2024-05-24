import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import { Server } from "socket.io";

dotenv.config()
const port = process.env.PORT

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.send("server on");
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(port, () => {
    console.log(`Server running on port : ${port}`);
});