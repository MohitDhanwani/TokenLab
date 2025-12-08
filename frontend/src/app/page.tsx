import { Button } from "@/components/button";
import FAQ from "@/components/faq";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import PlatformStats from "@/components/PlatformStats";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <HowItWorks/>
      <PlatformStats/>
      <FAQ/>
      <Footer/>
    </>
  );
}
