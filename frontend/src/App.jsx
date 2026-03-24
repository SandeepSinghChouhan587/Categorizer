import React, { useContext, useEffect, useRef } from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Background from "./components/ui/Background";
import Navbar from "./layout/Navbar";
import Login from "./pages/Login";
import Categorize from "./pages/Categorize";
import { Toaster } from "react-hot-toast";
import Saved from "./pages/Saved";
import ScrollToTop from "./components/ui/ScrollToTop";
import { AppContext } from "./context/AppContext";
import Profile from "./pages/Profile";
import Lenis from "lenis";


function App() {
const {user} = useContext(AppContext);
useEffect(() => {
    /**For Smooth Scrolling */
    const lenis = new Lenis({
      lerp: 0.08,       // smoothness duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easing curve
      smooth: true,          // smooth scroll
      smoothTouch: true,     // smooth touch scroll
      direction: "vertical"  // vertical scrolling
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy(); // cleanup on unmount
  }, []);
  

  return (
    <div className="bg-transparent relative">
    <div><Toaster/></div>
    <ScrollToTop/>
      <div className="fixed w-screen h-screen inset-0 -z-40 pointer-events-auto">
<div  className="fixed w-full h-screen bg-black">
  <Background
    colors={[ '#5227FF', '#FF9FFC', '#B19EEF' ]}
    mouseForce={20}
    cursorSize={100}
    isViscous
    viscous={30}
    iterationsViscous={32}
    iterationsPoisson={32}
    resolution={0.5}
    isBounce={false}
    autoDemo
    autoSpeed={0.5}
    autoIntensity={2.2}
    takeoverDuration={0.25}
    autoResumeDelay={3000}
    autoRampDuration={0.6}
    color0="#5227FF"
    color1="#FF9FFC"
    color2="#B19EEF"
/>
</div>
      </div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Categorize" element={<Categorize/>} />
        <Route  path="/Saved" element={user?<Saved/>:<Login/>} />
        <Route  path="/Profile" element={user?<Profile/>:<Login/>} />

      </Routes>
    </div>
  );
}

export default App;
