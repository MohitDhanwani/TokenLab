export default function TokenDetailExpanded({
  name,
  totalSupply,
  description,
  symbol,
}: {
  name: string;
  totalSupply: number;
  description: string;
  symbol: string;
}) {
  return (
    <>
      <div className="w-full max-w-[22vw] flex flex-col gap-6">
        <div className="bg-white h-48 flex justify-center items-center border-2 border-black">
          <div className="bg-gray-800 h-32 w-32 flex justify-center items-center border-2 border-black">
            <h1 className="text-white font-bold text-2xl">{symbol}</h1>
          </div>
        </div>

        <div className="bg-white p-4 border-2 border-black flex flex-col gap-2">
          <h1 className="font-mono text-gray-500 text-sm">DESCRIPTION</h1>
          <h3 className="font-mono">{description}</h3>
        </div>

        <div className="bg-white p-4 border-2 border-black flex flex-col gap-2">
          <h1 className="font-mono text-gray-500 text-sm">TOTAL SUPPLY</h1>
          <h3 className="font-mono font-bold text-2xl">{totalSupply}</h3>
        </div>

        <div className="bg-black text-white p-5 border-2 border-black text-sm">
          <h1 className="font-mono text-orange-500">Contract Restrictions</h1>
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex border-b-2 border-gray-800 justify-between pb-2">
              <h1>MINT FREQUENCY</h1>
              <h3>1x / Year</h3>
            </div>

            <div className="flex border-b-2 border-gray-800 justify-between pb-2">
              <h1>NEXT MINT DATE</h1>
              <h3 className="text-orange-500">Dec 2025</h3>
            </div>

            <div className="flex border-b-2 border-gray-800 justify-between pb-2">
              <h1>MAX SUPPLY</h1>
              <h3>Unlimited</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
