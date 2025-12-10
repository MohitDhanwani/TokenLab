"use client";
import useWallet from "@/utils/ConnectWallet";
import axios from "axios";
import { ChartBar } from "lucide-react";
import { useState, useEffect } from "react";

interface Token {
  id: string;
  tokenName: string;
  tokenSymbol: string;
  description: string;
  currentTotalSupply: string;
}

export default function AllTokens() {
  const [connectedWalletTokens, setConnectedWalletTokens] = useState<Token[]>([]);
  const { walletAddress } = useWallet();

  useEffect(() => {
    if (!walletAddress) return;
    const getAllWalletTokens = async () => {
      const walletTokens = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/getAllTokens`, {
        params: { walletAddress },
      });
      setConnectedWalletTokens(walletTokens.data.allWalletTokens);
    };

    getAllWalletTokens();
  }, [walletAddress, connectedWalletTokens]);

  return (
    <div className="border-2 border-black mt-10 h-auto max-h-[430px] overflow-y-scroll">
      <div className="flex justify-between border-b-2 border-black p-4">
        <h1 className="text-2xl font-bold font-mono bg-gray-50">MY TOKENS</h1>
        <div>
          <ChartBar />
        </div>
      </div>

      <div>
        {connectedWalletTokens.length === 0 ? (
         <div className="p-4 font-bold text-2xl h-72 flex w-full justify-center items-center text-gray-600 py-8">
             <p>No tokens found</p>
         </div>
        ) : (
          connectedWalletTokens.map((token) => (
            <div key={token.id} className="border-b-2 border-black p-4 flex bg-white hover:bg-orange-50 cursor-pointer">
              <div className="h-14 w-20 p-4 bg-orange-600 font-bold font-mono text-white">{token.tokenSymbol}</div>

              <div className="pl-4 w-full">
                <div className="w-full flex justify-between">
                  <h1 className="font-bold text-black font-mono">{token.tokenName}</h1>
                  <h1 className="font-bold font-mono text-xl pr-2">$0.00</h1>
                </div>
                <div className="flex gap-2">
                  <p className="font-mono">{token.currentTotalSupply}</p>
                  <p className="font-mono">{token.tokenSymbol}</p>
                </div>
                <p className="font-mono">{token.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
