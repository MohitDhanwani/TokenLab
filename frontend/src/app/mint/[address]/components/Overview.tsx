import { NoFocusInput } from "@/components/NoFocusInput";
import { Button } from "@/components/ui/button";
import { Connection, Transaction } from "@solana/web3.js";
import axios from "axios";
import { Flame, LucideIcon, RefreshCcwIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CardType {
  heading: string;
  shortDescription: string;
  buttonText: string;
  icon: LucideIcon;
  altText: string;
}

const Card: CardType[] = [
  {
    heading: "MINT TOKENS",
    shortDescription: "Increase supply. Allowed once per 365 days.",
    buttonText: "MINT",
    icon: RefreshCcwIcon,
    altText: "Locked until Dec 2025",
  },

  {
    heading: "BURN TOKENS",
    shortDescription: "Permanently destroy tokens from your wallet.",
    buttonText: "BURN SUPPLY",
    icon: Flame,
    altText: "",
  },
];

export default function Overview() {
  const tokenMintAddress = useParams();
  const [amount, setAmount] = useState("");

  const handleElementButton = async (buttonText: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/getToken`, { params: { tokenToFind: tokenMintAddress.address } });
    const responseData = await response.data.data;

    const payload = {
      mintAddress: responseData[0].mintAddress,
      ownerWallet: responseData[0].ownerWallet,
      amount: amount,
      decimals: responseData[0].decimals,
    };

    const connection = new Connection("https://api.devnet.solana.com", "confirmed");

    if (buttonText === "MINT" && responseData[0]?.mintAuthorityUsed == false) {
      try {
        console.log("minting more tokens from frontend");
        const mintTokenResponse = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/mintMoreTokens`, { payload });

        const tx = Transaction.from(Buffer.from(mintTokenResponse.data.transaction, "base64"));

        const signed = await (window as any).solana.signTransaction(tx);
        const transaction = await connection.sendRawTransaction(signed.serialize());
        await connection.confirmTransaction(transaction);

        const updatePayload = { mintAddress: tokenMintAddress.address, amount: amount, isMinting: true };
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/updateSupply`, updatePayload);
        toast.success("Tokens minted successfully!!");
        // @ts-ignore
      } catch (error: any) {
        toast.error("Error in minting more tokens", error);
      }
    } else if (buttonText === "MINT" && responseData[0]?.mintAuthorityUsed == true) {
      toast.error("The tokens have already been minted once");
    }

    if (buttonText === "BURN SUPPLY" && responseData[0]?.freezeAuthorityUsed == false) {
      try {
        const burnTokenResponse = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/burnTokens`, { payload });

        const tx = Transaction.from(Buffer.from(burnTokenResponse.data.transaction, "base64"));

        const signed = await (window as any).solana.signTransaction(tx);
        const transaction = await connection.sendRawTransaction(signed.serialize());
        await connection.confirmTransaction(transaction);

        const updatePayload = { mintAddress: tokenMintAddress.address, amount: amount, isMinting: false };
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/updateSupply`, updatePayload);
        toast.success("Tokens burnt successfully!!");
        // @ts-ignore
      } catch (error: any) {
        toast.error("Error in burning tokens", error.message);
      }
    } else if (buttonText === "BURN SUPPLY" && responseData[0]?.freezeAuthorityUsed == true) {
      toast.error("The tokens have been already burnt once");
    }
  };

  return (
    <div>
      <div className="p-8 flex w-full justify-between mt-6">
        <div className="flex gap-8">
          {Card.map((element, index) => (
            <div key={index} className="border border-black p-6">
              <div className="flex gap-2 items-center">
                <element.icon />
                <h1 className="font-bold text-xl">{element.heading}</h1>
              </div>

              <h3 className="font-mono text-gray-500 mt-4 text-sm">{element.shortDescription}</h3>
              <NoFocusInput
                className="h-10 mt-6 border-0 border-b-2 border-b-gray-500 rounded-none"
                placeholder="Amount"
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="gap-2 mt-6 flex justify-between items-center">
                <h3 className="text-red-400 text-sm font-mono">{element.altText.length > 0 && element.altText}</h3>
                <Button
                  variant={"primary"}
                  className="text-sm rounded-none py-4 px-4"
                  size={"lg"}
                  onClick={() => handleElementButton(element.buttonText)}
                >
                  {element.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 flex w-full justify-between flex-col">
        <div className="w-full border-b-2 border-gray-300 pb-2">
          <h1 className="font-mono font-bold">RECENT LOG</h1>
        </div>

        <div className="flex flex-col gap-6 mt-4">
          <div className="flex w-full justify-between border-b-2 border-gray-100 pb-4">
            <h1 className="text-sm text-gray-500 font-sm">2024-03-20 10:00</h1>
            <h3 className="text-sm text-gray-500 font-sm">Minted 100000 Tokens</h3>
          </div>

          <div className="flex justify-between w-full border-b-2 border-gray-100 pb-4">
            <h1 className="text-sm text-gray-500 font-sm">2024-03-19 14:20</h1>
            <h3 className="text-sm text-gray-500 font-sm">Contract Deployed</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
