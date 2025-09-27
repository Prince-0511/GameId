import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/games", label: "Games" },
    { path: "/how-it-works", label: "How It Works" },
    { path: "/contact", label: "Contact" },
    { path: "/sell", label: "Sell ID" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md border-cyan-500/30"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* MODIFIED: Navbar height reduced */}
        <div className={`flex justify-between items-center transition-all duration-300 ${
            scrolled ? "h-14" : "h-20"
          }`}
        >
          {/* Logo */}
          <Link
            to="/"
            // MODIFIED: Logo position adjusted for new height
            className={`flex items-center space-x-2 group transform transition-all duration-300 ${
              scrolled ? "translate-y-0" : "translate-y-4"
            }`}
          >
            <div className="p-2 rounded-lg">
              <img
                src="/new new logo.png"
                alt="KreedaaX Logo"
                // MODIFIED: Logo size adjusted for new height
                className={`object-contain transition-all duration-300 ${
                  scrolled ? "h-12" : "h-16"
                }`}
              />
            </div>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_12px_#0ff]">
              KreedaaX
            </span>
          </Link>

          {/* Desktop Navigation */}
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

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-cyan-400"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
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