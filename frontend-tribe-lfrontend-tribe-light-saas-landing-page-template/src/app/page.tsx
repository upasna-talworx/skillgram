import { Hero } from "@/sections/Hero";
import { Header } from "@/sections/Header";
import { Guide } from "@/sections/Guide";
import { Features } from "@/sections/Features";
import { Services } from "@/sections/Services";
import { Footer } from "@/sections/Footer";

export default function Home() {
  return (
    <div className="bg-[#e5e5e5] min-h-screen">
      <Header />
      <Hero />
      <Guide /> 
      {/* <Features /> */}
      <Services />
      <Footer />
    </div>
  );
}
