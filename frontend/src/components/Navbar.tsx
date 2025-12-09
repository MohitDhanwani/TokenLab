"use client";
import { redirect } from "next/navigation";
import { Button } from "./button";
import Marquee from "react-fast-marquee";
import ConnectWallet from "@/utils/ConnectWallet";
import useWallet from "@/utils/ConnectWallet";

interface NavbarProps {
  heading: string;
  url: string;
}

const NavbarItems: NavbarProps[] = [
  {
    heading: "Features",
    url: "/",
  },
  {
    heading: "Create Token",
    url: "/create-token",
  },
];

export default function Navbar() {
  const { walletAddress, connectWallet, disconnectWallet } = useWallet();

  return (
    <>
      <div className="w-full flex items-center justify-between px-10 py-4">
        <div className="w-1/2">
          <span className="text-3xl font-mono font-extrabold hover:cursor-pointer" onClick={() => redirect("/")}>
            Token<span className="text-orange-600">Labs</span>
          </span>
        </div>

        <div className="w-[30%] flex justify-around gap-4 items-center">
          <span className="font-mono uppercase flex gap-8 hover:cursor-pointer">
            {NavbarItems.map((item, index) => (
              <span key={index} className="hover:underline">
                {item.heading}
              </span>
            ))}
          </span>
          {walletAddress ? (
            <Button
              name={walletAddress.slice(0, 6) + "...." + walletAddress.slice(-4)}
              varient="primary"
              disabled={false}
              onClick={disconnectWallet}
            />
          ) : (
            <Button name={"Connect Wallet"} varient="primary" disabled={false} onClick={connectWallet} />
          )}
        </div>
      </div>

      <div className="bg-black text-white py-3 border-b-2 border-black font-mono font-semibold">
        <Marquee speed={200}>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex gap-12 pl-12">
              <span className="text-orange-500">MINT YOUR TOKEN NOW</span>
              <span>
                COST <span className="text-green-500"> ~ $5</span>
              </span>
              <span>
                NEW <span className="text-green-500"> PEPE2 LAUNCHED</span>
              </span>
              <span>
                USERS <span className="text-green-500"> + 12%</span>
              </span>
            </div>
          ))}
        </Marquee>
      </div>
    </>
  );
}
