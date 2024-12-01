import Hero from "./(landingPages)/hero";
import { Reviews } from "./(landingPages)/reviews";
import ChooseTemplates from "./(landingPages)/chooseTemplates";
import Steps from "./(landingPages)/steps";
import WhyChooseUs from "./(landingPages)/whyChooseUs";
import Footer from "./(landingPages)/footer";
import Video from "./(landingPages)/video";

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
