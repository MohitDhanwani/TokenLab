"use client";
import { useContext, createContext, useState } from "react";

type WalletContextType = {
  walletAddress: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
};

/* Create Context (Create Global Storage) -> Provider (Fill the Storage with what we want application to access) -> 
    useContext (Read data from the Global Storage) */
const WalletContext = createContext<WalletContextType | null>(null);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      if ("solana" in window) {
        const provider = (window as any).solana;
        if (provider.isPhantom) {
          const connectionResponse = await provider.connect();
          setWalletAddress(connectionResponse.publicKey.toBase58());
        }
      }
    } catch (error) {
      console.error("Error in conneceting to wallet", error);
    }
  };

  const disconnectWallet = async () => {
    if ("solana" in window) {
      await (window as any).solana.disconnect();
      setWalletAddress(null);
    }
  };

  return <WalletContext.Provider value={{ walletAddress, connectWallet, disconnectWallet }}>{children}</WalletContext.Provider>;
}


export default function useWallet(){
  const context = useContext(WalletContext);
  if(!context){
    throw new Error("useWallet must be used inside Wallet Provider");
  }
  return context;
}
