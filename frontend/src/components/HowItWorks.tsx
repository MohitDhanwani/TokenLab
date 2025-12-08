interface StepsProps {
  stepCount: string;
  heading: string;
  description: string;
}

const StepsItem: StepsProps[] = [
  {
    stepCount: "01",
    heading: "CONNECT",
    description: "Connect your Metamask or Phantom wallet securely.",
  },
  {
    stepCount: "02",
    heading: "CUSTOMIZE",
    description: "Name your token, choose a symbol, and set the supply.",
  },
  {
    stepCount: "03",
    heading: "LAUNCH",
    description: "Click deploy. Your token is live on the blockchain instantly.",
  },
];

export default function HowItWorks() {
  return (
    <div className="bg-white w-full flex flex-col items-center pt-20 border-b-2 border-black pb-20">
      <div className="w-full max-w-7xl">
        <div className="flex items-end border-b-2 border-black pb-4 gap-4">
          <span className="text-orange-600 text-3xl">(01)</span>
          <h1 className="text-6xl font-semibold">HOW IT WORKS</h1>
        </div>

        <div className="flex">
          {StepsItem.map((item, index) => (
            <div
              key={index}
              className="border-2 border-black mt-20 p-8 flex flex-col gap-6 w-1/3 hover:bg-black transition-all duration-500 hover:text-white hover:cursor-pointer"
            >
              <h1 className="font-mono text-5xl opacity-30">{item.stepCount}</h1>
              <h2 className="text-2xl font-serif font-bold">{item.heading}</h2>
              <h3 className="font-mono opacity-80">{item.description}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
