import Image from "next/image";

interface TestimonialProps {
  testimonial: string;
  author: string;
}

const TestimonialItems: TestimonialProps[] = [
  {
    testimonial: "I don't know how to code, but I wanted to make a token for my gaming community. Oxylith made it happen in 5 minutes.",
    author: "Alex J., Guild Leader",
  },
  {
    testimonial: "The simplest interface in crypto. No complex jargon, just fill the form and you own the contract 100%.",
    author: "Sarah W., Digital Artist",
  },
];

export default function PlatformStats() {
  return (
    <>
      <div className="w-full flex flex-col items-center pt-20">
        <div className="w-full max-w-7xl pb-16">
          <div className="flex gap-4 items-end border-b-2 border-black pb-4">
            <span className="text-4xl text-orange-600">(02)</span>
            <h1 className="text-6xl font-bold">PLATFORM STATS</h1>
          </div>

          <div className="flex w-full pt-10 p-8 items-center justify-between">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-3 border-l-4 border-red-500 pl-8">
                <div className="text-xl text-gray-500 font-serif">TOKENS LAUNCHED</div>
                <div className="font-bold text-2xl">12,403</div>
              </div>

              <div className="flex flex-col gap-3 border-l-4 border-black pl-8">
                <div className="text-xl text-gray-500 font-serif">ACTIVE CREATORS</div>
                <div className="font-bold text-2xl">8,942</div>
              </div>
            </div>

            <div className="border-4 border-black p-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Image src="/StatsImage.png" width={500} height={500} alt="Stats Image" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full border-t-2 border-b-2 border-black justify-between font-serif">
        {TestimonialItems.map((item, index) => (
            <div key={index} className={`flex flex-col p-20 ${index == 0 ? "bg-black text-white" : "bg-[#F4F4F0]"}`}>
              <h1 className="text-4xl">"{item.testimonial}"</h1>
              <div className="flex pt-8 items-center gap-4"> 
                <span className="w-16 bg-orange-500 h-1"></span><h3 className="font-mono">{item.author}</h3>
              </div>
          </div>
        ))}
      </div>
    </>
  );
}
