import { Search } from 'lucide-react';
import heroImage from '@/assets/hero-gaming.jpg';
// 1. Correct the import path to be more robust (using the '@/' alias)
import Controller3D from '@/components/3dmodel';

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Gaming marketplace hero background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90"></div>
      </div>
      
      {/* 2. Restructure the content area for a two-column layout */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8">
        
          {/* LEFT SIDE: Text, Search, and CTA Button */}
          <div className="lg:w-1/2 w-full text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-float leading-tight">
              {/* <span className="text-gradient-gaming">CHAMPIONS OF THE</span> */}
              <br />
              {/* <span className="text-gradient-gaming">DIGITAL ARENA</span> */}
              <br />
              <span className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-normal mt-4 block">
                {/* YOUR HUB FOR GAMING ID MARKETPLACE */}
              </span>
            </h1>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto lg:mx-0 mb-8">
              <div className="gaming-card p-2">
                <div className="flex items-center">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search for game IDs (BGMI, Valorant...)"
                      className="w-full pl-12 pr-4 py-4 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none text-lg"
                    />
                  </div>
                  <button className="btn-gaming-primary px-8 py-4 ml-2 text-lg">
                    Search
                  </button>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button className="btn-gaming-secondary px-12 py-4 text-xl font-bold animate-pulse-glow">
              Get Started
            </button>
          </div>

          {/* 3. RIGHT SIDE: Add the 3D Model here */}
          <div className="lg:w-1/2 w-full h-[300px] md:h-[500px]">
            <Controller3D />
          </div>
          
        </div>
      </div>

      {/* Floating Elements (unchanged) */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent/20 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
    </section>
  );
};

export default Hero;