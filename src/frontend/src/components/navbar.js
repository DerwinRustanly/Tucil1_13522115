import { Link } from "react-router-dom"
export default function Navbar(){
    return(
        <div className="fixed w-full">
            <div className='md:flex items-center justify-between font-primary font-medium text-baseYellow text-2xl cursor-pointer p-4 border-b-[6px] border-b-baseYellow shadow-md shadow-baseYellow'>
                <h1 className="text-4xl font-bold">Cyberpunk Breach Protocol Solver</h1>
                <ul className="flex gap-10">
                    <Link to="/">
                        <li className="w-20 text-center p-3 relative after:rounded-xl after:content-[''] after:bg-gradient-to-r after:scale-x-0 after:transition-transform after:ease-in-out after:duration-500 after:origin-right hover:after:origin-left  hover:after:scale-x-100  after:from-yellow-200 after:to-baseYellow after:w-full after:h-1 after:absolute after:left-0 after:top-10">Home</li>
                    </Link>
                    <li className="w-20 text-center p-3 relative after:rounded-xl after:content-[''] after:bg-gradient-to-r after:scale-x-0 after:transition-transform after:ease-in-out after:duration-500 after:origin-right hover:after:origin-left  hover:after:scale-x-100  after:from-yellow-200 after:to-baseYellow after:w-full after:h-1 after:absolute after:left-0 after:top-10">Tech</li>
                    <li className="w-20 text-center p-3 relative after:rounded-xl after:content-[''] after:bg-gradient-to-r after:scale-x-0 after:transition-transform after:ease-in-out after:duration-500 after:origin-right hover:after:origin-left  hover:after:scale-x-100  after:from-yellow-200 after:to-baseYellow after:w-full after:h-1 after:absolute after:left-0 after:top-10">About</li>
                    <Link to={"/menu"}>
                        <li><button className="text-lg font-bold bg-no-repeat bg-left bg-[length:0%] bg-gradient-to-r from-yellow-200 to-baseYellow py-2 px-4 rounded-3xl border-2 border-baseYellow hover:bg-[length:100%]  hover:text-black hover:border-white transition-all ease-in-out duration-500 "> Start Now</button></li>
                    </Link>
                </ul>
            </div>
        </div>
    )
}