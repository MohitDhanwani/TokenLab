"use client"
import React from "react";
import Wallet from "./components/Wallet";
import CreateToken from "./components/CreateToken";

const MintPage = () => {
  return (
    <>
      <div className="w-full flex justify-center pt-16">
        <div className="flex items-center justify-between w-full max-w-7xl border-b-4 border-black pb-2">
          <h1 className="text-5xl font-extrabold font-serif">DASHBOARD</h1>
          <div className="flex gap-4 text-sm font-bold font-mono">
            <div className="text-white bg-black p-4 hover:cursor-pointer">CREATE NEW</div>
            <div className="text-black bg-[#F4F4F0] p-4 border-2 border-black hover:cursor-pointer">MANAGE EXTENSIONS</div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <div className="flex items-start w-full max-w-7xl gap-10">
             <Wallet />
             <CreateToken/>
        </div>
      </div>
    </>
  );
};

export default MintPage;
