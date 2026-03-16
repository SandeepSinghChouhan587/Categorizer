import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-transparent backdrop-blur-3xl text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">
            Categorizer
          </h2>
          <p className="text-sm">
            Organize and categorize your favorite YouTube and Instagram
            content effortlessly using AI.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white font-semibold mb-3">
            Navigation
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/saved" className="hover:text-white">
                Saved Posts
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-white">
                Profile
              </Link>
            </li>
          </ul>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-white font-semibold mb-3">
            Features
          </h3>
          <ul className="space-y-2 text-sm">
            <li>AI Content Categorization</li>
            <li>YouTube Integration</li>
            <li>Instagram Integration</li>
            <li>Search & Filters</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white font-semibold mb-3">
            Connect
          </h3>

          <div className="flex gap-4 text-xl">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              <FaGithub />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center text-sm py-4">
        © {new Date().getFullYear()} Categorizer. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;