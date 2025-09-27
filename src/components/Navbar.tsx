import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // to detect active route
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/games", label: "Games" },
    { path: "/how-it-works", label: "How It Works" },
    { path: "/contact", label: "Contact" },
    { path: "/sell", label: "Sell ID" },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-cyan-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <img
                src="/new new logo.png"
                alt="KreedaaX Logo"
                className="h-12 w-30 object-contain drop-shadow-[0_0_15px_#0ff]"
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
                    {/* Glow underline for active link */}
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
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
                    className={`block text-lg font-medium transition duration-300 ${
                      location.pathname === link.path
                        ? "text-cyan-400 drop-shadow-[0_0_12px_#0ff]"
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
