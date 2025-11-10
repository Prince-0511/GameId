// --- NEW ---: Import your authentication hook (adjust the path)
import { useAuth } from "@/context/AuthContext"; 
import { useState, useEffect, lazy, Suspense } from "react";
import { Search } from "lucide-react";
import heroImage from "@/assets/hero-gaming.jpg";
const Controller3D = lazy(() => import("@/components/3dmodel"));

const Hero = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const texts = ["Push harder, claim that victory"];
  const typingSpeed = 20; // ms per character
  const delayBetweenTexts = 2000; // 2 seconds pause between texts

  // --- NEW ---: Get the user from your auth context
  // If your auth check is different (e.g., 'isLoggedIn'), use that.
  const { user } = useAuth(); 

  // Typing Effect
  useEffect(() => {
    let timeout;
    const currentText = texts[textIndex];
    const currentLength = displayedText.length;

    if (!isDeleting && currentLength === currentText.length) {
      timeout = setTimeout(() => setIsDeleting(true), delayBetweenTexts);
    } else if (isDeleting && currentLength === 0) {
      setIsDeleting(false);
      setTextIndex((textIndex + 1) % texts.length);
    } else {
      const speed = isDeleting ? typingSpeed / 2 : typingSpeed;
      timeout = setTimeout(() => {
        setDisplayedText(
          currentText.slice(0, isDeleting ? currentLength - 1 : currentLength + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, textIndex, texts]);


  return (
    <section
      className="relative h-[90vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Gaming marketplace hero background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* LEFT SIDE */}
          <div className="lg:w-1/2 w-full text-center lg:text-left">
            {/* Typing Text */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 animate-float leading-tight">
              <span
                className="block mt-4 font-bold"
                style={{
                  color: "#1f98cfff",
                  textShadow: "0 0 8px rgba(7, 0, 4, 0.7)",
                }}
              >
                {displayedText}
                <span className="animate-blink">|</span>
              </span>
            </h1>

            {/* Search Bar */}
            <div
              className="max-w-2xl mx-auto lg:mx-0 mb-8 relative z-30"
              style={{ transform: "none" }}
            >
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

            {/* --- MODIFIED ---: Conditionally render the button */}
            {/* This checks if 'user' is null or undefined (i.e., not logged in) */}
            {!user && (
              <a
                href="/login"
                className="btn-gaming-secondary px-12 py-4 text-xl font-bold animate-pulse-glow inline-block text-center"
              >
                Get Started
              </a>
            )}
          </div>

          {/* RIGHT SIDE: 3D Model */}
          <div className="lg:w-1/2 w-full h-[300px] lg:h-[400px] flex items-center justify-center">
            
            <Suspense
              fallback={
                <div className="w-full h-full bg-transparent"></div>
              }
            >
              <Controller3D />
            </Suspense>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.8s ease forwards;
          }
        `}
      </style>
    </section>
  );
};

export default Hero;