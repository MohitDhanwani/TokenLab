import { Button } from "@/components/button";
import { Wallet2 } from "lucide-react";

export default function Wallet(){
    return (
        <div className="flex flex-col mt-10 border-2 border-black w-full max-w-3xl shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex justify-between p-10 bg-white">
                <div className="flex flex-col gap-8">
                    <h1 className="text-gray-500 text-xl font-mono">MY PORTFOLIO</h1>
                    <h1 className="font-bold text-7xl">$0.00</h1>
                    <Button name={"CONNECT WALLET"} varient="primary" disabled={false}/>
                </div>

                <div>
                    <Wallet2 size={52} color="gray"/>
                </div>
            </div>

            <div>

            </div>
        </div>
    )
}