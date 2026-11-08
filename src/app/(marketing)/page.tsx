import Navbar from "@/components/marketing/Navbar";
import Hero from "@/components/marketing/Hero";
import WorldStory from "@/components/marketing/WorldStory";
import FindYours from "@/components/marketing/FindYours";
import HowItWorks from "@/components/marketing/HowItWorks";
import Footer from "@/components/marketing/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WorldStory />
        <FindYours />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
