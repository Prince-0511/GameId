import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { supabase } from "../lib/supabase";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // 👇 Handle Sell Click
  const handleSellClick = (e) => {
    e.preventDefault();
    setIsMenuOpen(false); // closes mobile menu if open
    if (!user) {
      setShowPopup(true);
    } else {
      navigate("/sell");
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // 🧭 Handle scroll styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 👤 Listen for login/logout
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // 🚪 Handle Logout
  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    alert("👋 Logged out successfully!");
    navigate("/login");
  }

  // 🛑 Prevent background scroll when popup is active
  useEffect(() => {
    if (showPopup) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [showPopup]);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/games", label: "Games" },
    { path: "/how-it-works", label: "How It Works" },
    { path: "/contact", label: "Contact" },
    { path: "#", label: "Sell ID", action: handleSellClick },
  ];

  return (
    <>
      <nav
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "bg-black/80 backdrop-blur-md border-cyan-500/30"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navbar main row */}
          <div
            className={`flex justify-between items-center transition-all duration-300 ${
              scrolled ? "h-14" : "h-20"
            }`}
          >
            {/* 🧩 Logo */}
            <Link
              to="/"
              className={`flex items-center space-x-2 group transform transition-all duration-300 ${
                scrolled ? "translate-y-0" : "translate-y-4"
              }`}
            >
              <div className="p-2 rounded-lg">
                <img
                  src="/new new logo.png"
                  alt="KreedaaX Logo"
                  className={`object-contain transition-all duration-300 ${
                    scrolled ? "h-12" : "h-16"
                  }`}
                />
              </div>
            </Link>

            {/* 🌐 Desktop Nav Links */}
            <div className="hidden md:block">
              <ul className="ml-10 flex items-center space-x-8">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    {link.action ? (
                      <button
                        onClick={link.action}
                        className={`relative text-lg font-medium transition duration-300 ${
                          location.pathname === link.path
                            ? "text-cyan-400 drop-shadow-[0_0_12px_#0ff]"
                            : "text-gray-300 hover:text-cyan-300"
                        }`}
                      >
                        {link.label}
                        {location.pathname === link.path && (
                          <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-cyan-400 shadow-[0_0_12px_#0ff]" />
                        )}
                      </button>
                    ) : (
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
                          <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-cyan-400 shadow-[0_0_12px_#0ff]" />
                        )}
                      </Link>
                    )}
                  </li>
                ))}

                {/* 👇 Auth Buttons */}
                {!user ? (
                  <>
                    <li>
                      <Link
                        to="/login"
                        className="px-4 py-2 border border-cyan-400 rounded-lg text-cyan-400 transition"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/register"
                        className="px-4 py-2 bg-cyan-400 text-black rounded-lg hover:bg-cyan-300 transition"
                      >
                        Signup
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <span className="px-4 py-2 text-cyan-300 font-semibold">
                        {user.email}
                      </span>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 transition"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* 📱 Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-300 hover:text-cyan-400"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* 📱 Mobile Nav */}
          {isMenuOpen && (
            <div className="md:hidden">
              <ul className="px-4 pt-2 pb-4 space-y-3 bg-black/90 border border-cyan-500/30 rounded-lg mt-2">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    {link.action ? (
                      <button
                        onClick={link.action}
                        className={`relative text-lg font-medium transition duration-300 ${
                          location.pathname === link.path
                            ? "text-cyan-400 drop-shadow-[0_0_12px_#0ff]"
                            : "text-gray-300 hover:text-cyan-300"
                        }`}
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        to={link.path}
                        onClick={toggleMenu}
                        className={`relative text-lg font-medium transition duration-300 ${
                          location.pathname === link.path
                            ? "text-cyan-400 drop-shadow-[0_0_12px_#0ff]"
                            : "text-gray-300 hover:text-cyan-300"
                        }`}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}

                {!user ? (
                  <>
                    <li>
                      <Link
                        to="/login"
                        onClick={toggleMenu}
                        className="block text-lg font-medium text-cyan-400 hover:text-cyan-300"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/register"
                        onClick={toggleMenu}
                        className="block text-lg font-medium text-cyan-400 hover:text-cyan-300"
                      >
                        Signup
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <span className="block text-lg font-medium text-cyan-300">
                        {user.email}
                      </span>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          handleLogout();
                          toggleMenu();
                        }}
                        className="block w-full text-left text-lg font-medium text-red-400 hover:text-red-300"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </nav>

      {/* 💬 Login Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]">
          <div className="bg-gray-900 border border-cyan-400 rounded-lg p-6 text-center w-80 shadow-lg">
            <h2 className="text-cyan-400 text-xl font-semibold mb-3">
              Please Login
            </h2>
            <p className="text-gray-300 mb-5">
              You need to log in before you can sell your ID.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  setShowPopup(false);
                  navigate("/login", { state: { redirectToSell: true } });
                }}
                className="px-4 py-2 bg-cyan-400 text-black rounded-lg hover:bg-cyan-300"
              >
                Login
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 border border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-300 hover:text-black"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
