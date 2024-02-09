import { Link } from "react-router-dom";
import { ReactTyped } from "react-typed";

export default function Home(){
    return(
        <div className="w-full flex flex-col font-primary text-baseYellow justify-center items-center min-h-screen">
            <ReactTyped className="text-5xl w-[700px] font-semibold text-center p-8" strings={["Welcome To Cyberpunk 2077 Breach Protocol Solver"]} typeSpeed={40} backSpeed={40} loop></ReactTyped>
            <Link to={"/menu"}>
                <button className="hover:scale-105 text-xl font-bold bg-no-repeat bg-left bg-[length:0%] bg-gradient-to-r from-yellow-200 to-baseYellow py-4 px-6 rounded-3xl border-4 border-baseYellow hover:bg-[length:100%]  hover:text-black hover:border-black transition-all ease-in-out duration-500 "> Start Now</button>
            </Link>
        </div>
    )
}