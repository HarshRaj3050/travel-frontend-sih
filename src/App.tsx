import NavBar from "./components/navbar/NavBar";
import HeroSection from "./components/heroSection/HeroSection";
import KeyFeatures from "./components/keyFeatures/KeyFeatures";
import ScrollVelocity from "./components/smartSection/ScrollVelocity"
import Advanced from "./components/advanced/Advanced";
import Download from "./components/down/Download";






const App = () => {
  const velocity = 5;
  return (
    <div>
      <NavBar />
      <HeroSection></HeroSection>
      <KeyFeatures></KeyFeatures>
      <ScrollVelocity
        texts={['New Smart Technology That Saves Lives', 'New Smart Technology That Saves Lives']}
        velocity={velocity}
        className="custom-scroll-text"/>
      <Advanced></Advanced>
      <Download></Download>
      

    </div>
  )
}

export default App;