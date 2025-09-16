import Features from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navigation from "../components/Navigation";
import ReadyToStart from "../components/ReadyToStart";
import WhyChoose from "../components/WhyChoose";

export default function Home() {
  return (
    <div className="min-h-screen bg-black/70">
      <Navigation />
      <Hero />
      <Features />
      <WhyChoose />
      <ReadyToStart />
      <Footer />
    </div>
  );
}
