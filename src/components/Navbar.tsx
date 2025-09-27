import { useState, useEffect } from "react"; // 1. Import useEffect
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false); // 2. Add state to track scroll
  const location = useLocation();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // 3. Add useEffect to handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Set scrolled to true if user has scrolled more than 10px, otherwise false
      setScrolled(window.scrollY > 10);
    };

    // Add event listener when component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array ensures this effect runs only once

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/games", label: "Games" },
    { path: "/how-it-works", label: "How It Works" },
    { path: "/contact", label: "Contact" },
    { path: "/sell", label: "Sell ID" },
  ];

  return (
    // 4. Add dynamic classes for background and transitions
    <nav
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md border-cyan-500/30"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 5. Add dynamic classes for height */}
        <div className={`flex justify-between items-center transition-all duration-300 ${
            scrolled ? "h-16" : "h-24"
          }`}
        >
          {/* Logo */}
          <Link
            to="/"
            // 6. Add dynamic classes for logo position
            className={`flex items-center space-x-2 group transform transition-all duration-300 ${
              scrolled ? "translate-y-0" : "translate-y-6"
            }`}
          >
            <div className="p-2 rounded-lg">
              <img
                src="/new new logo.png"
                alt="KreedaaX Logo"
                // 7. Add dynamic classes for logo size
                className={`object-contain transition-all duration-300 ${
                  scrolled ? "h-12" : "h-16"
                }`}
              />
            </div>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_12px_#0ff]">
              KreedaaX
            </span>
          </Link>

          {/* Desktop Navigation (no changes needed here) */}
          <div className="hidden md:block">
            <ul className="ml-10 flex items-center space-x-10">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`relative text-lg font-medium transition duration-300 ${
                      location.pathname === link.path
                        ? "text-cyan-400 drop-shadow-[0_0_12px_#0ff]"
                        : "text-gray-300 hover:text-cyan-300"
                    }`}
                  >
                    {link.label}
                    {location.pathname === link.path && (
                      <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-cyan-400 shadow-[0_0_12px_#0ff]"></span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile menu button (no changes needed here) */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-cyan-400"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation (no changes needed here) */}
        {isMenuOpen && (
          <div className="md:hidden">
            <ul className="px-4 pt-2 pb-4 space-y-3 bg-black/90 border border-cyan-500/30 rounded-lg mt-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`block text-lg font-medium ${
                      location.pathname === link.path
                        ? "text-cyan-400"
                        : "text-gray-300 hover:text-cyan-300"
                    }`}
                    onClick={toggleMenu}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;