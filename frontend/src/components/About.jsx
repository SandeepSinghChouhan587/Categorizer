import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const container = useRef();

  useGSAP(() => {

    // HERO
    gsap.from(".hero", {
      y: 120,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      force3D: true
    });

    // Problem text
    gsap.from(".problem-text", {
      y: 80,
      opacity: 0,
      stagger: 0.2,
      force3D: true,
      scrollTrigger: {
        trigger: ".problem-section",
        start: "top 80%",
        end: "top 30%",
        toggleActions: "play none none reverse"
      }
    });

    // Cards
    gsap.from(".card", {
      y: 100,
      opacity: 0,
      stagger: 0.2,
      force3D: true,
      scrollTrigger: {
        trigger: ".cards",
        start: "top 80%",
        end: "top 30%",
        toggleActions: "play none none reverse"
      }
    });

    // Parallax section
    gsap.to(".parallax-section", {
      yPercent: 10,
      ease: "none",
      force3D: true,
      scrollTrigger: {
        trigger: ".parallax-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Steps
    gsap.from(".step", {
      x: -120,
      opacity: 0,
      stagger: 0.3,
      force3D: true,
      scrollTrigger: {
        trigger: ".steps",
        start: "top 70%",
        end: "top 10%",
        toggleActions: "play none none reverse"
      }
    });

    // Vision
    gsap.from(".vision", {
      scale: 0.9,
      opacity: 0,
      duration: 1,
      force3D: true,
      scrollTrigger: {
        trigger: ".vision",
        start: "top 80%",
        end: "top 40%",
        toggleActions: "play none none reverse"
      }
    });

    ScrollTrigger.refresh();

  }, { scope: container });

  return (
    <section
      id="about"
      ref={container}
      className="w-full text-gray-200 overflow-hidden bg-transparent md:backdrop-blur-3xl"
    >

      {/* HERO */}
      <div className="hero will-change-transform max-w-6xl mx-auto px-6 pt-32 pb-24 text-center">

        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          About{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">
            Categorizer
          </span>
        </h1>

        <p className="text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
          Categorizer transforms scattered saved posts into an organized,
          searchable knowledge library using AI-powered analysis and smart
          categorization.
        </p>

      </div>

      {/* PROBLEM SECTION */}
      <div className="problem-section max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">

        <div>

          <h2 className="problem-text will-change-transform text-4xl font-semibold mb-6">
            The Problem With Saved Posts
          </h2>

          <p className="problem-text will-change-transform text-gray-200 text-xl mb-4 leading-relaxed">
            Every day we discover valuable content on platforms like Instagram
            and YouTube — tutorials, business ideas, productivity tips, and
            much more.
          </p>

          <p className="problem-text will-change-transform text-gray-200 text-xl mb-4 leading-relaxed">
            We tap the save button thinking we will revisit it later. But after
            weeks or months our saved posts become a chaotic collection of
            hundreds of items.
          </p>

          <p className="problem-text will-change-transform text-gray-200 text-xl leading-relaxed">
            When we finally need that information again, we are forced to scroll
            endlessly trying to find the one post we remember saving.
          </p>

        </div>

        <div className="cards space-y-6">

          <div className="card will-change-transform bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">Endless Scrolling</h3>
            <p className="text-gray-200">
              Saved posts are difficult to find once the list becomes large.
            </p>
          </div>

          <div className="card will-change-transform bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">No Smart Organization</h3>
            <p className="text-gray-200">
              Platforms store posts chronologically instead of categorizing
              them.
            </p>
          </div>

          <div className="card will-change-transform bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">Lost Knowledge</h3>
            <p className="text-gray-200">
              Valuable information becomes buried inside hundreds of saved
              items.
            </p>
          </div>

        </div>
      </div>

      {/* PARALLAX */}
      <div className="parallax-section will-change-transform w-full min-h-dvh relative py-40 overflow-hidden flex items-center justify-center">

        <div className="relative max-w-4xl mx-auto text-center px-6">

          <h2 className="text-4xl font-semibold mb-6">
            A Smarter Way To Save Content
          </h2>

          <p className="text-gray-200 leading-relaxed text-lg">
            Categorizer transforms random saved posts into an organized system
            where your content becomes searchable, structured, and instantly
            accessible whenever you need it.
          </p>

        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="steps max-w-6xl mx-auto px-6 py-28">

        <h2 className="text-4xl text-center font-semibold mb-16">
          How Categorizer Works
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

          {[ 
            "Create an Account",
            "Paste Post URL",
            "AI Content Analysis",
            "Automatic Categorization",
            "Save & Manage Posts",
            "Search Instantly"
          ].map((title, index) => (
            <div
              key={index}
              className="step will-change-transform bg-gradient-to-br from-indigo-500/10 to-purple-500/30 border border-white/10 p-8 rounded-xl"
            >
              <h3 className="text-xl font-semibold mb-3">
                {index + 1}. {title}
              </h3>
              <p className="text-gray-200">
                Categorizer processes content intelligently and organizes it
                into structured categories for easy access.
              </p>
            </div>
          ))}

        </div>
      </div>

      {/* VISION */}
      <div className="vision will-change-transform py-32 text-center max-w-3xl mx-auto px-6">

        <h2 className="text-4xl font-semibold mb-6">
          Our Vision
        </h2>

        <p className="text-gray-200 leading-relaxed text-lg">
          The long-term goal of Categorizer is to become a universal knowledge
          hub where content from multiple platforms can be intelligently
          organized, searched, and rediscovered whenever it matters most.
        </p>

      </div>

    </section>
  );
};

export default About;