import Navbar from "./(components)/navbar";
import Hero from "./(landingPages)/hero";
import ChooseTemplates from "./(landingPages)/chooseTemplates";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ChooseTemplates />
    </main>
  );
}
