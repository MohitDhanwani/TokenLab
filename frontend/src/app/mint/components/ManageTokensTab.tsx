"use client";
import useWallet from "@/utils/ConnectWallet";
import { useEffect, useState } from "react";
import axios from "axios";
import { Lock, Settings } from "lucide-react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

interface Token {
  id: string;
  tokenName: string;
  tokenSymbol: string;
  description: string;
  currentTotalSupply: string;
  mintAddress: string;
}

export default function ManageTokensTab() {
  const [connectedWalletTokens, setConnectedWalletTokens] = useState<Token[]>([]);
  const { walletAddress } = useWallet();

  useEffect(() => {
    const getAllWalletTokens = async () => {
      if(!walletAddress){
        toast.error("Please connect your wallet before getting your tokens");
        return;
      }
      const walletTokens = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/getAllTokens`, {
        params: { walletAddress },
      });
      setConnectedWalletTokens(walletTokens.data.allWalletTokens);
    };

    getAllWalletTokens();
  }, [walletAddress]);

  const handleTokenDetail = (tokenAddress: string) => {
    console.log("token address - ", tokenAddress);
    redirect(`/mint/${tokenAddress}`)
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-9/12">
        <div>
          <h1 className="font-bold text-3xl font-serif mt-16">YOUR TOKENS</h1>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-10">
          {connectedWalletTokens.map((token, index) => (
            <div className="border-2 border-black px-6 py-6 flex flex-col gap-5 bg-white hover:-translate-y-3 transition-all duration-300 hover:cursor-pointer hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]" onClick={() => handleTokenDetail(token.mintAddress)} key={index}>
              <div key={index} className="flex justify-between">
                <div
                  className={`h-14 w-16 text-sm p-2 border-2 border-black flex items-center justify-center text-white ${
                    index % 2 !== 0 ? "bg-orange-600" : "bg-gray-800"
                  }`}
                >
                  {token.tokenSymbol}
                </div>

                <div className="px-4 font-mono border-2 border-black h-8 flex items-center bg-gray-100 text-sm">ACTIVE</div>
              </div>

              <div className="border-b-2 border-gray-400 opacity-70 pb-4">
                <h1 className="font-extrabold font-mono text-xl">{token.tokenName}</h1>
                <h3 className="font-mono pt-1">{token.tokenSymbol}</h3>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <h3 className="text-sm">SUPPLY</h3>
                  <h2 className="font-bold text-mono">{token.currentTotalSupply}</h2>
                </div>

                <div className="flex justify-between">
                  <h3 className="text-sm">AUTH</h3>
                  <div className="font-bold text-mono flex gap-2">
                    <Settings size={20} />
                    <Lock size={20} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
