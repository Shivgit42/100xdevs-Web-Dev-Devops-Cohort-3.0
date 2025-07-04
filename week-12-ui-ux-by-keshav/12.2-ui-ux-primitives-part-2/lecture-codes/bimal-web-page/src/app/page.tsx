import Navbar from "./component/Navbar";
import Hero from "./component/Hero";
import Content from "./component/Content";
import Footer from "./component/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Content />
      <Footer />
    </main>
  );
}
