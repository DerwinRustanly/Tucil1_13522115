import { ReactTyped } from "react-typed"
export default function FileUpload(){
    return(
        <div className="w-full flex flex-col font-primary text-baseYellow justify-center items-center min-h-screen">
            <div className="flex p-4 mt-24">
                <ReactTyped className="text-3xl w-[500px] p-12 font-bold uppercase" strings={["Please Upload a Txt File with the Following Format:"]} typeSpeed={40}></ReactTyped>
                <div className="border-baseYellow w-full border-4 bg-zinc-900 rounded-lg font-semibold text-lg">
                    <div className="bg-baseYellow w-full text-black px-4 py-2 font-bold">.txt File</div>
                    <p className="bg-zinc-900 p-4">buffer_size<br/>
                        matrix_width matrix_height<br/>
                        matrix<br/>
                        number_of_sequences<br/>
                        sequences_1<br/>
                        sequences_1_reward<br/>
                        sequences_2<br/>
                        sequences_2_reward<br/>
                        …<br/>
                        sequences_n<br/>
                        sequences_n_reward<br/>
                    </p>
                </div>
            </div>
            <button className="font-semibold text-xl mt-4 py-4 px-6 border-2 bg-no-repeat bg-left bg-[length:0%] bg-gradient-to-r from-yellow-200 to-baseYellow hover:bg-[length:100%]  hover:text-black hover:border-black border-baseYellow rounded-2xl hover:scale-105 transition-all ease-in-out duration-500">File Upload</button>
        </div>
    )
}