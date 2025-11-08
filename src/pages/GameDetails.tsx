import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from "../lib/supabase"; // Your Supabase client
import { ArrowLeft, Star, Shield, Mail, MessageCircle, Phone, Check, Lock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const GameDetails = () => {
  const { id } = useParams();
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);
  const PLATFORM_FEE = 25;
  const [hasPaid, setHasPaid] = useState(false);
  const { toast } = useToast();

  const [userProfile, setUserProfile] = useState(null);
  const [isCheckingUser, setIsCheckingUser] = useState(true);
  const [contactsVisible, setContactsVisible] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  // --- CORRECTED & CONSOLIDATED PAYMENT HANDLER ---
  const handlePayment = () => {
    setIsPaying(true); // Set loading state

    const options = {
      key: "rzp_test_Rca0uFLytCCkBx", // Make sure to use environment variables for keys
      amount: PLATFORM_FEE * 100,
      currency: "INR",
      name: "Unlock Seller Contacts",
      description: "One-time fee to view seller details.",
      handler: async () => {
        try {
          const { data } = await supabase.auth.getUser();
          const email = data?.user?.email;

          if (!email) {
            toast({
              title: "Payment Error",
              description: "Unable to determine your account email. Please sign in.",
              variant: "destructive",
            });
            setIsPaying(false); 
            return;
          }
          
          // ⚠️ Make sure this table name ('users') is correct
          // In your useEffect, you use 'user'. Ensure they are consistent.
          const { error: updateError } = await supabase
            .from("users") 
            .update({ has_paid_fee: true })
            .eq("email", email);

          if (updateError) {
            console.error(updateError);
            toast({
              title: "Update Failed",
              description: "Could not update payment status. Please contact support.",
              variant: "destructive",
            });
            setIsPaying(false); 
            return;
          }

          setHasPaid(true);
          setContactsVisible(true); // INSTANTLY UNLOCK UI
          setUserProfile({ has_paid_fee: true }); // Update local profile state
          setIsPaying(false); 

          toast({
            title: "Payment Successful 🎉",
            description: "Contact details unlocked!" 
          });

        } catch (err) {
          console.error(err);
          toast({
            title: "Payment Error",
            description: "An unexpected error occurred.",
            variant: "destructive",
          });
          setIsPaying(false); 
        }
      },
      modal: {
        ondismiss: () => {
          setIsPaying(false); // Stop loading if user closes modal
        }
      },
      theme: { color: "#6366f1" },
    };

    const razor = new (window as any).Razorpay(options);
    
    razor.on('payment.failed', (response) => {
      console.error(response.error);
      toast({
        title: "Payment Failed",
        description: response.error.description || "Please try again.",
        variant: "destructive",
      });
      setIsPaying(false); // Stop loading on failure
    });
    
    razor.open();
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      setLoading(true);
      setIsCheckingUser(true);

      // --- 1. Fetch Game Data ---
      console.log("Fetching game with id:", id);
      const { data: game, error: gameError } = await supabase
        .from('game_listings')
        .select('*')
        .eq('id', id)
        .single();

      if (gameError) {
        console.error("Error fetching game:", gameError);
      } else {
        console.log("Fetched game:", game);
        setGameData(game);
      }
      setLoading(false); 

      // --- 2. Fetch Current Auth User ---
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // --- 3. Fetch User Profile from your 'user' table ---
        console.log("Fetching profile for user:", user.id);
         // ⚠️ Make sure this table name ('user') is correct
        const { data: profile, error: profileError } = await supabase
          .from('user') // 👈 Using your 'user' table
          .select('has_paid_fee')
          .eq('id', user.id) 
          .single();

        if (profileError) {
          console.error("Error fetching user profile:", profileError);
        } else if (profile) {
          console.log("Fetched profile:", profile);
          setUserProfile(profile);
          // --- 4. Set Visibility based on payment status ---
          if (profile.has_paid_fee) {
            setContactsVisible(true);
          }
        }
      } else {
        console.log("No user is logged in.");
      }
      
      setIsCheckingUser(false); // User check is done
    };

    fetchData();
  }, [id]);
  
  // --- SIMPLIFIED LOCKED COMPONENT ---
  const LockedContacts = () => (
    <div className="gaming-card p-6 sticky top-8 text-center">
      <h3 className="text-xl font-bold text-foreground mb-4">Contact Seller</h3>
      <div className="p-4 bg-background rounded-lg border border-border mb-6">
        <Lock className="w-12 h-12 text-primary mx-auto mb-3" />
        <p className="text-muted-foreground mb-4">
          Pay a small, one-time platform fee to unlock seller contact details.
        </p>
      </div>

      <button
        type="button"
        onClick={handlePayment}
        disabled={isPaying}
        className="w-full btn-gaming-secondary py-3 text-lg font-bold mt-4"
      >
        {isPaying ? 'Processing...' : `Pay ₹${PLATFORM_FEE} to Continue`}
      </button>
    </div>
  );
  
  // --- UPDATED LOADING STATE ---
  if (loading || isCheckingUser) {
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

  // ✅ Render game data
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

        {/* ✨ --- LAYOUT CORRECTED --- ✨ */}
        <div className="grid lg:grid-cols-3 gap-8">
        
          {/* ✨ --- GAME DETAILS (NOW ON LEFT) --- */}
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
          {/* --- END GAME DETAILS --- */}

          {/* ✨ --- CONTACT BOX (NOW ON RIGHT) --- */}
          <div className="lg:col-span-1">
            {contactsVisible ? (
              // --- STATE 1: UNLOCKED ---
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
                
                <div className="flex items-center justify-center p-3 bg-green-500/10 rounded-lg border border-green-500">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-green-500 font-medium">Contact Details Unlocked</span>
                </div>
              </div>

            ) : (
              // --- STATE 2: LOCKED ---
              <LockedContacts />
            )}
          </div>
          {/* --- END CONTACT BOX --- */}

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GameDetails;