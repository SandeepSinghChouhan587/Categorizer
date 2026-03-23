import React, { useState, useRef, useEffect, useContext } from "react";
import { MdCategory } from "react-icons/md";
import { Link } from "react-scroll";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { CgProfile } from "react-icons/cg";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { RxCross2 } from "react-icons/rx";


function Navbar() {

  const location = useLocation();
  const [mobileMenu, setMobileMenu] = useState(false);
  const { user } = useContext(AppContext);

  const navRef = useRef(null);
  const navBar = useRef(null);

  const lastScroll = useRef(0);
  const isHome = location.pathname === "/";

  useGSAP(() => {

    // navbar initial reveal
    gsap.from(navBar.current, {
      y: -100,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    });

  }, []);

  // Scroll behavior
  useEffect(() => {

   const handleScroll = () => {
  const currentScroll = window.scrollY;

  if (Math.abs(currentScroll - lastScroll.current) < 5) return;

  if (currentScroll > lastScroll.current && currentScroll > 80) {
    gsap.to(navBar.current, {
      y: -120,
      duration: 0.4,
      ease: "power2.out",
    });
  } else {
    gsap.to(navBar.current, {
      y: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  }

  lastScroll.current = currentScroll;
};
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  const toggleMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  // close mobile menu when clicking outside
  useEffect(() => {

    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMobileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);

  return (
    <div ref={navRef}>

      <nav
        ref={navBar}
        id="navId"
        className="fixed z-40 flex justify-self-center items-center justify-between border mx-4 lg:min-w-2xl max-md:w-full max-md:justify-between border-slate-700 px-6 py-4 mt-2 rounded-full text-white text-sm backdrop-blur-3xl"
      >

        <Link onClick={()=>{setMobileMenu(false)}}  className={`${isHome ? "" : "hidden"}`} to="hero" smooth duration={900}>
          <MdCategory className="w-8 h-8" />
        </Link>

        <RouterLink className={`${isHome ? "hidden" : ""}`} to="/#hero">
          <MdCategory className="w-8 h-8" />
        </RouterLink>

        <div className="hidden ml-14 md:flex items-center gap-4">

          <div className="hidden md:flex items-center gap-6 ml-7">

            <RouterLink to={"/Categorize"} className="relative overflow-hidden h-6 group">
              <span className="block group-hover:-translate-y-full transition-transform duration-300">
                Categorize
              </span>
              <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">
                Categorize
              </span>
            </RouterLink>

            <RouterLink to={"/Saved"} className="relative overflow-hidden h-6 group">
              <span className="block group-hover:-translate-y-full transition-transform duration-300">
                View Categories
              </span>
              <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">
                View Categories
              </span>
            </RouterLink>

            <Link
              to="about"
              smooth
              duration={900}
              className={`${isHome ? "relative overflow-hidden h-6 group cursor-pointer" : "hidden opacity-0"}`}
            >
              <span className="block group-hover:-translate-y-full transition-transform duration-300">
                About
              </span>
              <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">
                About
              </span>
            </Link>

            <RouterLink
              to="/#about"
              className={`${isHome ? "hidden opacity-0" : "relative overflow-hidden h-6 group cursor-pointer"}`}
            >
              <span className="block group-hover:-translate-y-full transition-transform duration-300">
                About
              </span>
              <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">
                About
              </span>
            </RouterLink>

          </div>

          <Link to="contact" smooth duration={900}>
            <button
              className={`${isHome ? "border border-slate-600 hover:bg-slate-800 px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer" : "hidden"}`}
            >
              Contact
            </button>
          </Link>

          <RouterLink to="/#contact">
            <button
              className={`${isHome ? "hidden" : "border border-slate-600 hover:bg-slate-800 px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer"}`}
            >
              Contact
            </button>
          </RouterLink>

          {user ? (
            <RouterLink to={"/Profile"}>
              <CgProfile className="w-8 h-8 cursor-pointer" />
            </RouterLink>
          ) : (
            <RouterLink to={"/Login"}>
              <button className="bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300 cursor-pointer">
                Get Started
              </button>
            </RouterLink>
          )}

        </div>

        <button onClick={toggleMenu} className="md:hidden text-gray-200">
         {mobileMenu?(<RxCross2 className="text-3xl" />):(<svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>)} 
        </button>

      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-16 left-0 w-full z-30 transition-all duration-500 backdrop-blur-3xl ${
          mobileMenu
            ? "translate-y-0 opacity-100"
            : "-translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center gap-4 py-8 w-[90%] mx-auto rounded-2xl text-white">

          <RouterLink onClick={toggleMenu} to={"/Saved"}>Saved</RouterLink>
          <RouterLink onClick={toggleMenu} to={"/Categorize"}>Categorize</RouterLink>

          <Link
            onClick={toggleMenu}
            to="about"
            smooth
            duration={900}
            className={`${isHome ? "" : "hidden opacity-0"}`}
          >
            About
          </Link>

          <RouterLink
            onClick={toggleMenu}
            to="/#about"
            className={`${isHome ? "hidden opacity-0" : ""}`}
          >
            About
          </RouterLink>

          <Link onClick={toggleMenu} to="contact" smooth duration={900}>
            <button className={`${isHome ? "" : "hidden"}`}>
              Contact
            </button>
          </Link>

          <RouterLink onClick={toggleMenu} to="/#contact">
            <button className={`${isHome ? "hidden" : ""}`}>
              Contact
            </button>
          </RouterLink>

          {user ? (
            <RouterLink onClick={toggleMenu} to={"/Profile"}>
              <CgProfile className="w-8 h-8" />
            </RouterLink>
          ) : (
            <RouterLink onClick={toggleMenu} to={"/Login"}>
              <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium">
                Get Started
              </button>
            </RouterLink>
          )}

        </div>
      </div>

    </div>
  );
}

export default Navbar;

