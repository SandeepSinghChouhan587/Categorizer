import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

import { AppContext } from "../context/AppContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";


function Hero() {


  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        
        // Hero reveal
        gsap.from(".hero1", {
          y: -220,
          opacity: 0,
          duration: 1.5,
          stagger:0.5,
          ease: "power3.out",
        });
      }, );

      return () => ctx.revert();
    },
  );


  const {user} = useContext(AppContext);
  return (
    <section id="hero" className=" w-full min-h-dvh flex items-center justify-center px-6 relative bg-transparent backdrop-blur-3xl">
      <div className=" max-w-4xl text-center">

        {/* Branding */}
        <h1 className="hero1 text-5xl md:text-6xl font-bold tracking-tight text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.35)]">
          Categorizer
        </h1>

        {/* Tagline */}
        <p className=" hero1 mt-6 text-xl md:text-2xl text-white/90 font-medium">
          Instantly organize your YouTube and Instagram content with AI
        </p>

        {/* Description */}
        <p className="hero1 mt-4 text-white/80 max-w-2xl mx-auto">
          Paste a link and let AI automatically categorize posts using captions
          and hashtags so you can search, filter, and manage your inspiration
          effortlessly.
        </p>

        {/* CTA */}
        <div className=" hero1 mt-10 flex justify-center gap-4">
            <Link to={user?"/Categorize":"/Login"}>
               <button className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-400 transition shadow-lg">
                 {user?"Let's Categorize":"Get Started"}
               </button>
            </Link>
            <ScrollLink to="about" duration={500} smooth >
               <button className="border border-white/30 text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition">
                 Learn More
               </button>
            </ScrollLink>
        </div>
      </div>
    </section>
  );
}

export default Hero;