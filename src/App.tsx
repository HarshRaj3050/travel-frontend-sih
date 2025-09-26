import NavBar from "./components/navbar/NavBar";
import HeroSection from "./components/heroSection/HeroSection";
import KeyFeatures from "./components/keyFeatures/KeyFeatures";
import ScrollVelocity from "./components/smartSection/ScrollVelocity"
import Advanced from "./components/advanced/Advanced";
import Download from "./components/down/Download";
import { useState } from "react";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";






const App = () => {
  const velocity = 5;
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  if (showLogin || showSignup) {
    return (
      <>
        {showLogin && <Login onShowSignup={() => { setShowLogin(false); setShowSignup(true); }} onBackToHome={() => { setShowLogin(false); setShowSignup(false); }} />}
        {showSignup && <Signup onShowLogin={() => { setShowSignup(false); setShowLogin(true); }} />}
      </>
    );
  }

  return (
    <div>
  <NavBar onLoginClick={() => { setShowLogin(true); setShowSignup(false); }} />
      <HeroSection></HeroSection>
      <KeyFeatures></KeyFeatures>
      <ScrollVelocity
        texts={["New Smart Technology That Saves Lives", "New Smart Technology That Saves Lives"]}
        velocity={velocity}
        className="custom-scroll-text"/>
  <Advanced></Advanced>
      <Download></Download>
    </div>
  )
}

export default App;