import AnimalGrid from "../components/animal_grid/AnimalGrid";
import ContactSection from "../components/contact/ContactSection";
import Donation from "../components/donation/Donation";
import EventSlider from "../components/event_slider/EventSlider";
import Footer from "../components/footer/Footer";
import HeroSection from "../components/hero_section/HeroSection";
import MyAppBar from "../components/my_app_bar/MyAppBar";

function Home() {
  return (
    <div>
      <MyAppBar />
      <HeroSection />
      {/* <AnimalGrid /> */}
      <EventSlider />
      <Donation />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default Home;
