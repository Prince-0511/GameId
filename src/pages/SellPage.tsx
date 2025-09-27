import { useState } from 'react';
import { ArrowLeft, Upload, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const SellPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    gameName: '',
    accountRank: '',
    description: '',
    price: '',
    contactEmail: '',
    contactWhatsApp: '',
    contactDiscord: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.gameName || !formData.accountRank || !formData.description || !formData.contactEmail) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Success!",
      description: "Your game ID has been submitted for listing. We'll review it and notify you once it's live.",
    });

    // Reset form
    setFormData({
      gameName: '',
      accountRank: '',
      description: '',
      price: '',
      contactEmail: '',
      contactWhatsApp: '',
      contactDiscord: ''
    });
  };

  const gameOptions = [
    'BGMI (Battlegrounds Mobile India)',
    'Valorant',
    'Free Fire',
    'Call of Duty Mobile',
    'Apex Legends Mobile',
    'PUBG Mobile',
    'Fortnite',
    'Counter-Strike 2',
    'League of Legends',
    'Other'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-300 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient-gaming mb-4">
            Sell Your Game ID
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            List your gaming account and connect with interested buyers in our trusted community
          </p>
        </div>

        {/* Form */}
        <div className="gaming-card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Game Selection */}
            <div>
              <label htmlFor="gameName" className="block text-sm font-semibold text-foreground mb-2">
                Game Name *
              </label>
              <select
                id="gameName"
                name="gameName"
                value={formData.gameName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
                required
              >
                <option value="">Select a game</option>
                {gameOptions.map((game) => (
                  <option key={game} value={game}>{game}</option>
                ))}
              </select>
            </div>

            {/* Account Rank/Details */}
            <div>
              <label htmlFor="accountRank" className="block text-sm font-semibold text-foreground mb-2">
                Account Rank/Details *
              </label>
              <input
                type="text"
                id="accountRank"
                name="accountRank"
                value={formData.accountRank}
                onChange={handleInputChange}
                placeholder="e.g., Conqueror, Immortal, Heroic, Level 85"
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder-muted-foreground"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-foreground mb-2">
                Account Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your account: skins, achievements, special items, K/D ratio, etc."
                rows={5}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder-muted-foreground resize-none"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-semibold text-foreground mb-2">
                Asking Price (Optional)
              </label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="e.g., ₹15,000 or Best Offer"
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder-muted-foreground"
              />
            </div>

            {/* Contact Information Section */}
            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-semibold text-foreground mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder-muted-foreground"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="contactWhatsApp" className="block text-sm font-semibold text-foreground mb-2">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    id="contactWhatsApp"
                    name="contactWhatsApp"
                    value={formData.contactWhatsApp}
                    onChange={handleInputChange}
                    placeholder="+91 9876543210"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder-muted-foreground"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="contactDiscord" className="block text-sm font-semibold text-foreground mb-2">
                  Discord Username
                </label>
                <input
                  type="text"
                  id="contactDiscord"
                  name="contactDiscord"
                  value={formData.contactDiscord}
                  onChange={handleInputChange}
                  placeholder="YourUsername#1234"
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder-muted-foreground"
                />
              </div>
            </div>

            {/* Safety Notice */}
            <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-yellow-400 mb-1">Safety Guidelines</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Never share your account credentials until payment is confirmed</li>
                    <li>• Use secure payment methods and verify buyer identity</li>
                    <li>• Keep all communication within the platform initially</li>
                    <li>• Report any suspicious activity to our support team</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full btn-gaming-secondary py-4 text-lg font-bold animate-pulse-glow"
              >
                <Upload className="w-5 h-5 mr-2 inline" />
                Submit My Game ID
              </button>
            </div>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">What Happens Next?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="gaming-card p-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Review Process</h4>
              <p className="text-sm text-muted-foreground">We'll review your listing within 24 hours to ensure quality and authenticity.</p>
            </div>
            <div className="gaming-card p-6">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Go Live</h4>
              <p className="text-sm text-muted-foreground">Once approved, your listing goes live and buyers can start contacting you.</p>
            </div>
            <div className="gaming-card p-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Connect & Sell</h4>
              <p className="text-sm text-muted-foreground">Receive inquiries and complete your sale with interested buyers.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SellPage;