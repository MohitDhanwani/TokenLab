import { Button } from "./button";

export default function Hero() {
  return (
    <>
      <div className="w-full h-3/4 border-b-2 border-black pb-8 relative">
        <div
          className="inset-0 z-0"
          style={{
            backgroundImage: `
                linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
                `,
            backgroundSize: "40px 40px",
          }}
        >
          <div className="w-7/12 pl-28 pt-20">
            <div className="border-l-4 border-black pl-16">
              <span className="font-mono text-gray-600 text-xl">NO-CODE TOKEN LAUNCHPAD_V1.0</span>
              <div className="pt-10">
                <h1 className="text-9xl font-serif font-bold uppercase">
                  LAUNCH <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-600 to-orange-500">INSTANTLY</span>
                  <br />
                  <span>NO CODE.</span>
                </h1>
              </div>

              <div className="border-black border-b-4 pt-12"></div>
            </div>

            <div className="pt-8 text-xl flex justify-between p-4">
              <span className="font-mono w-1/2 font-se">
                Stop worrying about Solidity, auditing, or deployment scripts. Just fill out a simple form and launch your custom token in seconds.
              </span>
              <div>
                <Button name={"START MINTING NOW"} disabled={false} varient="primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
