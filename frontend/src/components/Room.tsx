import { useCallback, useEffect, useState } from 'react'
import { useSocket } from '../../context/SocketContext'

const Room = () => {
    const socket: any = useSocket();
    const [remoteSocketId, setRemoteSocketId] = useState(null);


    const handleUserJoined = useCallback((data: any) => {
        console.log(`Email ${data.email} joined room ${data.id}`);
        setRemoteSocketId(data.id);
    }, []);
    useEffect(() => {
        socket.on("user:joined", handleUserJoined)
        return () => {
            socket.off('user:joined', handleUserJoined)
        }
    }, [socket, handleUserJoined])
    return (
        <>
            <div>Room</div>
            <h4>{remoteSocketId ? 'Connected' : 'Noone in room'}</h4>

        </>
    )
}

export default Room