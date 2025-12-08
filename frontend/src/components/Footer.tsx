import { WholeWord, WholeWordIcon } from "lucide-react";

export default function Footer(){
    return (
        <div className="text-white w-full bg-black flex justify-between px-20 p-20">
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-serif font-bold">TOKENLABS.</h1>
                <div><WholeWordIcon/></div>                
            </div>

            <div className="flex gap-20">
                <div className="flex flex-col gap-4 font-mono">
                    <h1 className="font-bold text-orange-600">EXPLORE</h1>
                    <div>START MINTING</div>
                    <div>GUIDE</div>
                </div>

                <div className="flex flex-col gap-4 font-mono">
                    <h1 className="font-bold text-orange-600">SUPPORT</h1>
                    <div>CONTACT US</div>
                    <div>TERMS</div>
                </div>
            </div>
        </div>
    )
}