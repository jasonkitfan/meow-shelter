import AnimalGrid from './components/animal_grid/AnimalGrid';
import Donation from './components/donation/Donation';
import EventSlider from './components/event_slider/EventSlider';
import HeroSection from './components/hero_section/HeroSection';
import MyAppBar from './components/my_app_bar/MyAppBar';

function App() {
  return (
    <div>
      <MyAppBar />
      <HeroSection />
      <AnimalGrid />
      <EventSlider />
      <Donation />
    </div>
  );
}

export default App;
