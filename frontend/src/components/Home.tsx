import React from 'react'

const Home = () => {
    return (
        <div className='w-screen h-screen flex text-black  items-center justify-center   '>
            <div className=' rounded-l-xl flex flex-col items-center justify-center h-3/5  w-11/12  sm:w-4/12 xl:w-2/5 border border-blue-800 shadow-xl'>
                <form action="" className='w-4/6 flex flex-col items-center justify-center h-full '>
                    <h1 className='text-5xl mt-5 mb-3 font-bold '>
                        Video Chat <span className='text-indigo-900'>App</span>
                    </h1>

                    <label className=" m-5 input input-bordered flex items-center gap-2 bg-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="text-blue-900 w-5 h-5 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                        <input type="text" className="grow bg-white" placeholder="Full Name" />
                    </label>
                    <label className=" m-5 input input-bordered flex items-center gap-2 ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="text-blue-900 w-5 h-5 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                        <input type="text" className="grow" placeholder="Email" />
                    </label>
                    <button className="customButton m-5">Enter Lobby</button>





                </form>

            </div >
            <div className='w-0 sideimg  sm:w-4/12 xl:w-1/5 h-3/5 flex flex-col items-center justify-center rounded-r-xl  bg-slate-700 border border-purple-500 shadow-2xl' >
            </div>
        </div>
    )
}

export default Home