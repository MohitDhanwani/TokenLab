import { Button } from "@/components/ui/button";
import { FileWarning } from "lucide-react";

export default function Authorities() {
  return (
    <div className="w-full flex flex-col gap-6 p-8">
      <div className="flex items-center gap-2 bg-orange-50 p-4 border border-orange-200 mt-4">
        <FileWarning color="red"/>
        <h3 className="text-sm text-orange-800 font-semibold">
          Warning: Revoking authorities is permanent. You will strictly lose control over minting or freezing assets.
        </h3>
      </div>

      <div className="mt-8 flex justify-between border-b-2 border-black pb-6">
        <div className="flex flex-col gap-0.5">
          <h1 className="font-bold font-mono">MINT AUTHORITY</h1>
          <h3 className="font-mono text-gray-500 text-sm">Allows creating new tokens.</h3>
        </div>

        <div>
          <Button variant={"destructive"} className="font-mono rounded-none p-6" size={"lg"}>
            REVOKE PERMANENTLY
          </Button>
        </div>
      </div>

      <div className="flex justify-between mt-8 border-b-2 border-black pb-6">
        <div className="flex flex-col gap-0.5">
          <h1 className="font-mono font-black">FREEZE AUTHORITY</h1>
          <h3 className="font-mono text-gray-500 text-sm">Allows freezing holder accounts</h3>
        </div>

        <div>
          <Button variant={"destructive"} className="font-mono rounded-none p-6" size={"lg"}>
            REVOKE PERMANENTLY
          </Button>
        </div>
      </div>
    </div>
  );
}
