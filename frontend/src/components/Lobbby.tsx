import { useCallback, useEffect, useState } from 'react'
import { MdKeyboard } from "react-icons/md";
import { useSocket } from '../../context/SocketContext';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';


const Lobbby = () => {
    const [roomCode, setRoomCode] = useState('123');
    const socket: any = useSocket();
    const { name, email } = useUser();
    const navigate = useNavigate()


    const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        socket.emit("room:join", { roomCode, name, email })

    }, [socket, roomCode, email])

    const handleJoinRoom = useCallback((data: any) => {
        const { email, roomCode } = data;
        console.log(email, roomCode);
        navigate(`/room/${roomCode}`);
    }, [navigate]);

    useEffect(() => {
        socket.on("room:join", handleJoinRoom);
        return () => {
            socket.off("room:join", handleJoinRoom);
        };
    }, [socket, handleJoinRoom]);

    return (
        <div className='w-screen h-screen flex text-black  items-center justify-center   '>
            <div className=' flex flex-col items-start justify-center h-3/5  w-11/12  sm:w-4/12 xl:w-3/6 border p-5 shadowed  '>
                <h1 className=' text-4xl text-blue-900'> <span className=' text-5xl text-blue-900 font-bold'>Connect</span> with People you know</h1>
                <h1 className=' text-2xl m-5 '>with Video Chat</h1>
                <form onSubmit={handleSubmit} className='flex flex-col w-6/6 sm:flex-row sm:items-start sm:justify-center my-5 ' >
                    <button className="customButton " type='submit'>Create New Room</button>
                    <label className="border border-purple-800 mx-4 input input-bordered flex items-center gap-2 bg-white">
                        <MdKeyboard className='text-3xl  text-blue-900' />

                        <input type="text" className="grow bg-white" placeholder="Enter Room Code" value={roomCode} onChange={(e) => setRoomCode(e.target.value)} />
                    </label>
                    <button className="customButton2 w-full" type='submit'>Enter Room</button>
                </form>
            </div >
            <div className='w-0   sm:w-3/12 xl:w-3/12  rounded-r-xl' >
                <img src="side2.png" alt="" />
            </div>
        </div>
    )
}

export default Lobbby