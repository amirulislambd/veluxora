import Hero from "@/components/Home/Banner/Hero";
import CTASection from "@/components/Home/Ctasection";
import FleetSection from "@/components/Home/Fleets/Fleetsection ";
import HowItWorks from "@/components/Home/Howitworks";
import WhyChooseUs from "@/components/Home/Whychooseus";
import CTAbanner from "@/components/Home/CTAbanner";

export default function Home() {
  return (
    <div>
      <main className="container mx-auto">
        <Hero />
        <FleetSection />
        <WhyChooseUs />
        <HowItWorks />
        <CTAbanner />
      </main>
    </div>
  );
}
