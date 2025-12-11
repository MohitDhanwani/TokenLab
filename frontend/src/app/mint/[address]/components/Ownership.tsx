import { useState } from "react";
import Overview from "./Overview";

export default function Ownership() {
  const [activeTab, setActiveTab] = useState("OVERVIEW");

  return (
    <div className="w-full max-w-4xl bg-white border-2 border-black">
      <div className="flex gap-4 border-b-2 border-gray-600">
        <h1
          className={`px-6 py-3 text-sm cursor-pointer font-mono font-bold ${
            activeTab === "OVERVIEW" ? "bg-black text-white" : "bg-white text-gray-500"
          }`}
          onClick={() => setActiveTab("OVERVIEW")}
        >
          OVERVIEW
        </h1>

        <h1
          className={`px-6 py-3 text-sm cursor-pointer font-mono font-bold ${
            activeTab === "AUTHORITIES" ? "bg-black text-white" : "bg-white text-gray-500"
          }`}
          onClick={() => setActiveTab("AUTHORITIES")}
        >
          AUTHORITIES
        </h1>
      </div>

      <div>
        {activeTab === "OVERVIEW" && <Overview/>}
      </div>
    </div>
  );
}
