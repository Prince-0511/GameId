import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from "../lib/supabase"; // 👈 Make sure you have this
import { ArrowLeft, Star, Shield, Mail, MessageCircle, Phone, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const GameDetails = () => {
  const { id } = useParams(); // gets /game/:id
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 👇 Fetch data from Supabase when page loads
  useEffect(() => {
    const fetchGameData = async () => {
      console.log("Fetching game with idx:", id);

      const { data, error } = await supabase
        .from('game_listings')
        .select('*')
        .eq('id', id) // ✅ since your URL uses /game/1
        .single();
        console.log("Fetching from table game_listings for idx =", id);


      if (error) {
        console.error("Error fetching game:", error);
      } else {
        console.log("Fetched game:", data);
        setGameData(data);
      }

      setLoading(false);
    };

    if (id)fetchGameData();
  }, [id]);

  // 🕐 Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading game details...
      </div>
    );
  }

  // ❌ Not Found
  if (!gameData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Game not found 😢
      </div>
    );
  }

  // ✅ Render game data from Supabase
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-300 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Games</span>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="gaming-card p-6 mb-8">
              <img
                src={gameData.image_url || "https://via.placeholder.com/600x400?text=No+Image"}
                alt={gameData.game_name}
                className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
              />

              <div className="flex items-center justify-between mb-4">
                <span className="text-primary font-semibold text-lg">{gameData.game_name}</span>
                <span className="text-3xl font-bold text-secondary">₹{gameData.price}</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {gameData.game_name}
              </h1>

              <p className="text-muted-foreground text-lg leading-relaxed">
                {gameData.description}
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="gaming-card p-6 sticky top-8">
              <h3 className="text-xl font-bold text-foreground mb-4">Contact Seller</h3>

              <div className="space-y-4 mb-6">
                {gameData.contact_email && (
                  <a
                    href={`mailto:${gameData.contact_email}`}
                    className="flex items-center space-x-3 p-3 bg-background rounded-lg border border-border hover:border-primary transition-colors duration-300"
                  >
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium text-foreground">Email</div>
                      <div className="text-sm text-muted-foreground">{gameData.contact_email}</div>
                    </div>
                  </a>
                )}

                {gameData.contact_whatsapp && (
                  <a
                    href={`https://wa.me/${gameData.contact_whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 bg-background rounded-lg border border-border hover:border-secondary transition-colors duration-300"
                  >
                    <Phone className="w-5 h-5 text-secondary" />
                    <div>
                      <div className="font-medium text-foreground">WhatsApp</div>
                      <div className="text-sm text-muted-foreground">{gameData.contact_whatsapp}</div>
                    </div>
                  </a>
                )}

                {gameData.contact_discord && (
                  <div className="flex items-center space-x-3 p-3 bg-background rounded-lg border border-border hover:border-primary transition-colors duration-300">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium text-foreground">Discord</div>
                      <div className="text-sm text-muted-foreground">{gameData.contact_discord}</div>
                    </div>
                  </div>
                )}
              </div>

              <button className="w-full btn-gaming-primary py-4 text-lg font-bold animate-pulse-glow">
                Direct Contact Seller
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default GameDetails;
