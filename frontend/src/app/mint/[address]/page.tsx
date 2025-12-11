"use client";
import useWallet from "@/utils/ConnectWallet";
import axios from "axios";
import { ArrowLeft, Dot } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import TokenDetailExpanded from "./components/TokenDetailExpanded";
import Ownership from "./components/Ownership";

export type TokenInfo = {
  id: string;
  mintAddress: string;
  ownerWallet: string;
  tokenName: string;
  tokenSymbol: string;
  decimals: number;
  initialSupply: number;
  currentTotalSupply: number;
  description: string;
  mintAuthorityUsed: boolean;
  freezeAuthorityUsed: boolean;
};

const TokenDetails = () => {
  const tokenMintAddress = useParams();
  const { walletAddress } = useWallet();
  const [tokenData, setTokenData] = useState<TokenInfo[]>();

  useEffect(() => {
    const fetchTokenDetails = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/getToken`, { params: { tokenToFind: tokenMintAddress.address } });
      const responseData = await response.data.data;
      setTokenData(responseData);
    };

    fetchTokenDetails();
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-7xl">
        {/*MAIN HEADING POINT*/}
        <div className="flex w-full justify-between mt-20">
          <div className="flex gap-5">
            <div className="border-2 border-black flex justify-center items-center p-2 h-10 w-10 hover:bg-black hover:cursor-pointer transition-all duration-200">
              <ArrowLeft className="hover:text-white" />
            </div>
            <div className="flex flex-col gap-0.5">
              <h1 className="font-bold text-3xl font-mono">{tokenData?.[0].tokenName}</h1>
              <h2 className="font-mono text-gray-500">
                {tokenData?.[0].tokenSymbol} // {walletAddress}
              </h2>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="border-2 border-black bg-white flex h-10 items-center justify-center px-4">
              <span>
                <Dot color="green" size={36} />
              </span>{" "}
              <span className="text-sm font-mono">MINT AUTH</span>
            </div>
            <div className="border-2 border-black bg-white flex h-10 items-center justify-center px-4">
              <Dot color="green" size={36} />
              <span className="text-sm font-mono">FREEZE AUTH</span>
            </div>
          </div>
        </div>

        {/*Left components*/}
        <div className="flex mt-10 gap-14">
          <TokenDetailExpanded
            name={tokenData?.[0].tokenName || ""}
            description={tokenData?.[0].description || ""}
            totalSupply={tokenData?.[0].currentTotalSupply || 0}
            symbol={tokenData?.[0].tokenSymbol || ""}
          />

          <Ownership/>
        </div>
      </div>
    </div>
  );
};

export default TokenDetails;
