import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Shield, Mail, MessageCircle, Phone, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import bgmiImage from '@/assets/bgmi.jpg';

const GameDetails = () => {
  const { id } = useParams();

  // Mock data - in real app, fetch based on ID
  const gameData = {
    id: "bgmi-conqueror-1",
    title: "BGMI Conqueror Account",
    game: "BGMI",
    description: "Premium Conqueror rank account with exclusive skins, M416 Glacier, and premium outfits. Season 1 Royal Pass completed with all rewards unlocked. Perfect for competitive players.",
    price: "₹15,000",
    seller: {
      name: "GameMaster",
      rating: 4.9,
      verified: true,
      totalSales: 47,
      memberSince: "2023",
      email: "gamemaster@email.com",
      whatsapp: "+91 9876543210",
      discord: "GameMaster#1234"
    },
    image: bgmiImage,
    features: [
      "Conqueror rank achieved",
      "M416 Glacier skin",
      "All Season 1 Royal Pass rewards",
      "Premium character outfits",
      "Rare weapon skins collection",
      "Multiple vehicle skins",
      "Achievement titles unlocked",
      "No ban history"
    ],
    accountDetails: {
      level: 85,
      tier: "Conqueror",
      kd: "3.2",
      matches: 1250,
      winRate: "78%"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-300 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Games</span>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Game Image */}
            <div className="gaming-card p-6 mb-8">
              <img
                src={gameData.image}
                alt={gameData.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
              />
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-primary font-semibold text-lg">{gameData.game}</span>
                <span className="text-3xl font-bold text-secondary">{gameData.price}</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {gameData.title}
              </h1>
              
              <p className="text-muted-foreground text-lg leading-relaxed">
                {gameData.description}
              </p>
            </div>

            {/* Account Details */}
            <div className="gaming-card p-6 mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Account Statistics</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-background rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">{gameData.accountDetails.level}</div>
                  <div className="text-sm text-muted-foreground">Level</div>
                </div>
                <div className="text-center p-4 bg-background rounded-lg border border-border">
                  <div className="text-2xl font-bold text-secondary mb-1">{gameData.accountDetails.tier}</div>
                  <div className="text-sm text-muted-foreground">Rank</div>
                </div>
                <div className="text-center p-4 bg-background rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">{gameData.accountDetails.kd}</div>
                  <div className="text-sm text-muted-foreground">K/D Ratio</div>
                </div>
                <div className="text-center p-4 bg-background rounded-lg border border-border">
                  <div className="text-2xl font-bold text-foreground mb-1">{gameData.accountDetails.matches}</div>
                  <div className="text-sm text-muted-foreground">Matches</div>
                </div>
                <div className="text-center p-4 bg-background rounded-lg border border-border">
                  <div className="text-2xl font-bold text-secondary mb-1">{gameData.accountDetails.winRate}</div>
                  <div className="text-sm text-muted-foreground">Win Rate</div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="gaming-card p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">What's Included</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {gameData.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Seller Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="gaming-card p-6 sticky top-8">
              <h3 className="text-xl font-bold text-foreground mb-4">Seller Information</h3>
              
              {/* Seller Profile */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                  <span className="text-white text-lg font-bold">
                    {gameData.seller.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-foreground">{gameData.seller.name}</span>
                    {gameData.seller.verified && (
                      <Shield className="w-4 h-4 text-secondary fill-current" />
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-muted-foreground">
                      {gameData.seller.rating} ({gameData.seller.totalSales} sales)
                    </span>
                  </div>
                </div>
              </div>

              {/* Member Since */}
              <div className="mb-6 p-3 bg-background rounded-lg border border-border">
                <div className="text-sm text-muted-foreground mb-1">Member Since</div>
                <div className="font-semibold text-foreground">{gameData.seller.memberSince}</div>
              </div>

              {/* Contact Methods */}
              <div className="space-y-4 mb-6">
                <h4 className="font-semibold text-foreground">Contact Seller</h4>
                
                <a
                  href={`mailto:${gameData.seller.email}`}
                  className="flex items-center space-x-3 p-3 bg-background rounded-lg border border-border hover:border-primary transition-colors duration-300"
                >
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium text-foreground">Email</div>
                    <div className="text-sm text-muted-foreground">{gameData.seller.email}</div>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${gameData.seller.whatsapp.replace(/\s+/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 bg-background rounded-lg border border-border hover:border-secondary transition-colors duration-300"
                >
                  <Phone className="w-5 h-5 text-secondary" />
                  <div>
                    <div className="font-medium text-foreground">WhatsApp</div>
                    <div className="text-sm text-muted-foreground">{gameData.seller.whatsapp}</div>
                  </div>
                </a>

                <div className="flex items-center space-x-3 p-3 bg-background rounded-lg border border-border">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium text-foreground">Discord</div>
                    <div className="text-sm text-muted-foreground">{gameData.seller.discord}</div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full btn-gaming-primary py-4 text-lg font-bold animate-pulse-glow">
                Direct Contact Seller
              </button>

              {/* Safety Notice */}
              <div className="mt-6 p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
                <div className="text-sm text-yellow-400 font-medium mb-1">Safety Reminder</div>
                <div className="text-xs text-muted-foreground">
                  Always verify account details before making any payment. Use secure payment methods and follow our safety guidelines.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default GameDetails;