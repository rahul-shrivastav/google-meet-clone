import React, { useCallback, useEffect, useState } from 'react'
import { useSocket } from '../../context/SocketContext'
import ReactPlayer from "react-player";
import peer from "../services/peer";



const Room = () => {
    const socket: any = useSocket();
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [myStream, setMyStream] = useState(null as any);
    const [remoteStream, setRemoteStream] = useState();

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



    const handleIncommingCall = useCallback(async (data: any) => {
        setRemoteSocketId(data.from);
        const stream: any = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });
        setMyStream(stream);
        console.log(`Incoming Call from`, data.from, data.offer);
        const ans = await peer.getAnswer(data.offer);
        socket.emit("call:accepted", { to: data.from, ans });
    }, [socket]);

    const sendStreams = useCallback(() => {
        for (const track of myStream.getTracks()) {
            peer.peer.addTrack(track, myStream);
        }
    }, [myStream]);

    const handleCallAccepted = useCallback((data: any) => {
        peer.setLocalDescription(data.ans)
        console.log("call accepted")
        sendStreams()

    }, [sendStreams])

    const handleNegoNeeded = useCallback(async () => {
        const offer = await peer.getOffer();
        socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
    }, [remoteSocketId, socket]);


    useEffect(() => {
        peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
        return () => {
            peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
        };
    }, [handleNegoNeeded]);

    const handleNegoNeedIncomming = useCallback(
        async (data: any) => {
            const ans = await peer.getAnswer(data.offer);
            socket.emit("peer:nego:done", { to: data.from, ans });
        },
        [socket]
    );

    const handleNegoNeedFinal = useCallback(async (data: any) => {
        await peer.setLocalDescription(data.ans);
    }, []);
    useEffect(() => {
        peer.peer.addEventListener("track", async (ev: any) => {
            const remoteStream = ev.streams;
            console.log("GOT TRACKS!!");
            setRemoteStream(remoteStream[0]);
        });
    }, []);

    useEffect(() => {
        socket.on("user:joined", handleUserJoined);
        socket.on("incomming:call", handleIncommingCall);
        socket.on("call:accepted", handleCallAccepted);
        socket.on("peer:nego:needed", handleNegoNeedIncomming);
        socket.on("peer:nego:final", handleNegoNeedFinal);

        return () => {
            socket.off("user:joined", handleUserJoined);
            socket.off("incomming:call", handleIncommingCall);
            socket.off("call:accepted", handleCallAccepted);
            socket.off("peer:nego:needed", handleNegoNeedIncomming);
            socket.off("peer:nego:final", handleNegoNeedFinal);
        };
    }, [
        socket,
        handleUserJoined,
        handleIncommingCall,
        handleCallAccepted,
        handleNegoNeedIncomming,
        handleNegoNeedFinal,
    ]);
    return (
        <>
            {remoteSocketId && <button className='btn' onClick={handleCallUser}>CALL</button>}
            <div className='w-20 h-7 border'>
                {
                    remoteSocketId && <ReactPlayer playing muted height="150px" width="400px" url={myStream ? myStream : ''} />
                }
            </div>
            <div>
                {remoteStream && (
                    <>
                        <h1>Remote Stream</h1>
                        <ReactPlayer
                            playing
                            muted
                            height="150px"
                            width="400px"
                            url={remoteStream}
                        />
                    </>
                )}
            </div>

        </>
    )
}

export default Room