import { Button } from "@/components/button";
import useWallet from "@/utils/ConnectWallet";
import { Wallet2 } from "lucide-react";

export default function Wallet() {
  const { walletAddress, connectWallet, disconnectWallet } = useWallet();

  return (
    <div className="flex flex-col mt-10 border-2 border-black w-full max-w-3xl shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex justify-between p-10 bg-white">
        <div className="flex flex-col gap-8">
          <h1 className="text-gray-500 text-xl font-mono">MY PORTFOLIO</h1>
          <h1 className="font-bold text-7xl">$0.00</h1>
          {walletAddress ? (
            <Button
              name={walletAddress.slice(0, 6) + "...." + walletAddress.slice(-4)}
              varient="primary"
              disabled={false}
              onClick={disconnectWallet}
            />
          ) : (
            <Button name={"CONNECT WALLET"} varient="primary" disabled={false} onClick={connectWallet} />
          )}
        </div>

        <div>
          <Wallet2 size={52} color="gray" />
        </div>
      </div>

      <div></div>
    </div>
  );
}
