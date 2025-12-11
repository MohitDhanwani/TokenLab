import { NoFocusInput } from "@/components/NoFocusInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LucideIcon, RefreshCcwIcon, Flame } from "lucide-react";

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
              <NoFocusInput className="h-10 mt-6 border-0 border-b-2 border-b-gray-500 rounded-none" placeholder="Amount" />

              <div className="gap-2 mt-6 flex justify-between items-center">
                <h3 className="text-red-400 text-sm font-mono">{element.altText.length > 0 && element.altText}</h3>
                <Button variant={"primary"} className="text-sm rounded-none py-4 px-4" size={"lg"}>
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
