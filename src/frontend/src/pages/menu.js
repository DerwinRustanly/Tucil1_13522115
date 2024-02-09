import { Link } from "react-router-dom";
import { ReactTyped } from "react-typed";

export default function Menu(){
    return(
        <div className="w-full flex flex-col font-primary text-baseYellow justify-center items-center min-h-screen">
            <ReactTyped className="text-5xl p-12 font-bold uppercase" strings={["Choose your input option"]} typeSpeed={40}></ReactTyped>
            <div className="flex gap-10 font-semibold">
                <Link to={"/fileupload"}>
                    <button className="border-2 p-4 rounded-xl text-lg border-baseYellow hover:scale-105 bg-no-repeat bg-left bg-[length:0%] bg-gradient-to-r from-yellow-200 to-baseYellow py-4 px-6 hover:bg-[length:100%]  hover:text-black hover:border-black transition-all ease-in-out duration-500 ">File Upload</button>
                </Link>
                <button className="border-2 p-4 rounded-xl text-lg border-baseYellow hover:scale-105 bg-no-repeat bg-left bg-[length:0%] bg-gradient-to-r from-yellow-200 to-baseYellow py-4 px-6 hover:bg-[length:100%]  hover:text-black hover:border-black transition-all ease-in-out duration-500 ">Input Manually</button>
            </div>
        </div>
    )
}