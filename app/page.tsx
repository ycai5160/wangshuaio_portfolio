import Hero from "./components/Hero";
import Works from "./components/Works";
import Navigation from "./components/Navigation";
import OtherProjects from "./components/OtherProjects";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <Works />
      <OtherProjects />
      <Footer />
    </main>
  );
}
