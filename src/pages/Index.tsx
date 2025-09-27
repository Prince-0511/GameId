import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import GameBanner from '@/components/GameBanner';

import PopularCategories from '@/components/PopularCategories';
import RecentListings from '@/components/RecentListings';
import HowItWorks from '@/components/HowItWorks';
import WhyUs from '@/components/WhyUs';
import Footer from '@/components/Footer';

const Index = () => {

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <GameBanner />
      
      
      <PopularCategories />
      <RecentListings />
      <HowItWorks />
      <WhyUs />
      <Footer />
    </div>
  );
};

export default Index;
