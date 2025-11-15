import { useAuth } from "@/context/AuthContext";
import { useState, useEffect, lazy, Suspense } from "react";
import { Search } from "lucide-react";
import heroImage from "@/assets/hero-gaming.jpg";

const Controller3D = lazy(() => import("@/components/3dmodel"));

const Hero = () => {
  const { user } = useAuth();
  const [showModel, setShowModel] = useState(false);

  // Defer 3D model load until visible
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setShowModel(true);
    });
    const target = document.querySelector("#hero-3d");
    if (target) observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Gaming marketplace hero background"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          
          {/* LEFT SIDE */}
          <div className="lg:w-1/2 w-full text-center lg:text-left">
            {/* Typing Text (CSS-based) */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
              <span
                className="block mt-4 font-bold typing-text"
                style={{
                  color: "#1f98cfff",
                  textShadow: "0 0 8px rgba(7, 0, 4, 0.7)",
                }}
              >
                Push harder, claim that victory
                <span className="cursor">|</span>
              </span>
            </h1>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto lg:mx-0 mb-8 relative z-30">
              <div className="gaming-card p-2">
                <div className="flex items-center">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search for game IDs"
                      className="w-full pl-12 pr-4 py-4 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none text-lg"
                    />
                  </div>
                  <button className="btn-gaming-primary px-8 py-4 ml-2 text-lg">
                    Search
                  </button>
                </div>
              </div>
            </div>

            {/* Conditionally render Get Started */}
            {!user && (
              <a
                href="/login"
                className="btn-gaming-secondary px-12 py-4 text-xl font-bold inline-block text-center"
              >
                Get Started
              </a>
            )}
          </div>

          {/* RIGHT SIDE: 3D Model */}
          <div
            id="hero-3d"
            className="lg:w-1/2 w-full h-[300px] lg:h-[400px] flex items-center justify-center"
          >
            {showModel ? (
              <Suspense fallback={<div className="w-full h-full bg-transparent"></div>}>
                <Controller3D />
              </Suspense>
            ) : (
              <img
                src="/controller-preview.png"
                alt="Controller preview"
                className="w-full h-full object-contain"
                loading="lazy"
              />
            )}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>
        {`
          .cursor {
            animation: blink 1s infinite;
          }
          @keyframes blink {
            50% { opacity: 0; }
          }
        `}
      </style>
    </section>
  );
};

export default Hero;
