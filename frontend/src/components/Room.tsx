import { useCallback, useEffect, useState } from 'react'
import { useSocket } from '../../context/SocketContext'
import ReactPlayer from "react-player";
import peer from "../services/peer.ts";



const Room = () => {
    const socket: any = useSocket();
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [myStream, setMyStream] = useState(null);

    const handleUserJoined = useCallback((data: any) => {
        console.log(`Email ${data.email} joined room ${data.id}`);
        setRemoteSocketId(data.id);
    }, []);

    const handleCallUser = useCallback(async () => {
        const stream: any = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });
        const offer = await peer.getOffer();
        socket.emit("user:call", { to: remoteSocketId, offer });
        setMyStream(stream);
    }, [remoteSocketId, socket]);



    const handleIncommingCall = useCallback((data: any) => {
        //   setRemoteSocketId(from);
        //   const stream = await navigator.mediaDevices.getUserMedia({
        //     audio: true,
        //     video: true,
        //   });
        //   setMyStream(stream);
        console.log(`Incoming Call from`, data.from, data.offer);
        //   const ans = await peer.getAnswer(offer);
        //   socket.emit("call:accepted", { to: from, ans });
    },
        [socket]
    );






    useEffect(() => {
        socket.on("user:joined", handleUserJoined)
        socket.on("incomming:call", handleIncommingCall)
        return () => {
            socket.off('user:joined', handleUserJoined)
            socket.off("incomming:call", handleIncommingCall)
        }
    }, [socket, handleUserJoined])

    return (
        <>
            <div>Room</div>
            <h4>{remoteSocketId ? 'Connected' : 'Noone in room'}</h4>
            {remoteSocketId && <button className='btn' onClick={handleCallUser}>CALL</button>}
            <div className='w-20 h-7 border'>
                {
                    remoteSocketId && <ReactPlayer muted url={myStream ? myStream : ''} />
                }
            </div>

        </>
    )
}

export default Room