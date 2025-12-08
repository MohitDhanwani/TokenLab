"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface DropdownProps {
  question: string;
  answer: string;
}

const Questions: DropdownProps[] = [
  {
    question: "Do I need to know how to code?",
    answer: "Absolutely not. If you can fill out a form, you can launch a token on our platform.",
  },
  {
    question: "Who owns the token contract?",
    answer: "You do. 100%. Once deployed, you have full ownership and control over your token.",
  },
  {
    question: "Which networks are supported?",
    answer: "We currently support Ethereum, Solana, and Base. More networks coming soon.",
  },
];

export default function FAQ() {
  const [selectedDropDown, setSelectedDropdown] = useState<number>();
  const [dropdownActive, setDropDownActive] = useState<boolean>(false);

  const handleDropDownClick = (index: number) => {
    setSelectedDropdown(index);
    setDropDownActive(!dropdownActive);
  };

  return (
    <div className="w-full flex flex-col items-center pt-24 pb-28">
      <div className="w-full max-w-7xl">
        <div className="flex items-end border-b-2 border-black pb-4 gap-4">
          <span className="text-orange-600 text-4xl">(03)</span>
          <h1 className="text-6xl font-bold">FREQUENTLY ASKED QUESTIONS</h1>
        </div>

        <div className="mt-20">
          {Questions.map((question, index) => (
            <div
              key={index}
              className={`px-10 flex flex-col justify-center-center gap-4 p-10 border-black border-2 overflow-y-hidden hover:cursor-pointer hover:bg-white transition-all duration-200 ${
                selectedDropDown == index && dropdownActive == true ? "h-44" : "h-24"
              }`}
              onClick={() => handleDropDownClick(index)}
            >
              <div className="flex justify-between font-serif">
                <h2 className="text-2xl font-semibold">{question.question}</h2>
                <span>{dropdownActive && selectedDropDown == index ? <ChevronUp /> : <ChevronDown />}</span>
              </div>
              <h3 className="font-mono text-xl">{question.answer}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
