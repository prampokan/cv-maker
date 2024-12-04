import Hero from "./(landingPages)/hero";
import { Reviews } from "./(landingPages)/reviews";
import ChooseTemplates from "./(landingPages)/chooseTemplates";
import Steps from "./(landingPages)/steps";
import Footer from "./(landingPages)/footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Reviews />
      <Steps />
      <ChooseTemplates />
      <Footer />
    </main>
  );
}
