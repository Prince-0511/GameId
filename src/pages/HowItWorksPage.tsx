import { CheckCircle, Shield, Users, Zap, ArrowRight, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '../lib/supabase';

const HowItWorksPage = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [user, setUser] = useState(null);

  // Init session and listen for auth state changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // Prevent background scroll when popup active
  useEffect(() => {
    if (showPopup) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [showPopup]);

  const steps = [
    {
      step: '01',
      title: 'Create Your Account',
      description: 'Sign up for free and join our trusted gaming community. Verify your identity for secure transactions.',
      icon: Users,
      features: ['Free registration', 'Identity verification', 'Profile customization']
    },
    {
      step: '02',
      title: 'Browse or List Games',
      description: 'Search through thousands of premium accounts or list your own with detailed information.',
      icon: Zap,
      features: ['Advanced search filters', 'Detailed listings', 'Price comparison']
    },
    {
      step: '03',
      title: 'Secure Transaction',
      description: 'Complete your purchase safely with our escrow protection and secure payment methods.',
      icon: Shield,
      features: ['Escrow protection', 'Multiple payment options', '24/7 support']
    },
    {
      step: '04',
      title: 'Instant Transfer',
      description: 'Receive account details immediately after payment confirmation. Start playing right away!',
      icon: CheckCircle,
      features: ['Instant delivery', 'Account verification', 'Post-sale support']
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Secure Escrow',
      description: 'Your money is protected until you confirm the account is as described.'
    },
    {
      icon: Users,
      title: 'Verified Sellers',
      description: 'All sellers go through identity verification for your safety.'
    },
    {
      icon: CheckCircle,
      title: 'Quality Guarantee',
      description: 'Every account is checked to ensure it matches the listing description.'
    },
    {
      icon: Star,
      title: 'Rating System',
      description: 'Community-driven ratings help you find the most trusted sellers.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-7 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/20 via-secondary/20 to-background">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gradient-gaming mb-6">
            How It Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Your complete guide to buying and selling gaming accounts safely on our platform
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-7 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="gaming-card p-8 md:p-12">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-xl">
                          {step.step}
                        </div>
                        <div className="w-16 h-16 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                          <step.icon className="w-8 h-8 text-primary" />
                        </div>
                      </div>
                      
                      <h3 className="text-3xl font-bold text-foreground mb-4">
                        {step.title}
                      </h3>
                      
                      <p className="text-lg text-muted-foreground mb-6">
                        {step.description}
                      </p>
                      
                      <ul className="space-y-3">
                        {step.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-3 text-foreground">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className={`text-center ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                      <div className="w-48 h-48 mx-auto bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center">
                        <step.icon className="w-24 h-24 text-primary" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Arrow connector */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center py-3">
                    <ArrowRight className="w-8 h-8 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient-gaming mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We've built the most secure and user-friendly marketplace for gaming accounts
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="gaming-card p-6 text-center group">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="gaming-card p-12">
            <h2 className="text-4xl font-bold text-gradient-gaming mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of gamers who trust our platform for secure account trading
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/games" className="btn-gaming-primary px-8 py-4 text-lg inline-block text-center">
                Browse Games
                </a>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (!user) setShowPopup(true);
                  else navigate('/sell');
                }}
                className="btn-gaming-secondary px-8 py-4 text-lg"
              >
                Sell Your Account
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Login Popup for Sell action */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]">
          <div className="bg-gray-900 border border-cyan-400 rounded-lg p-6 text-center w-80 shadow-lg">
            <h2 className="text-cyan-400 text-xl font-semibold mb-3">Please Login</h2>
            <p className="text-gray-300 mb-5">You need to log in before you can sell your account.</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  setShowPopup(false);
                  navigate('/login', { state: { redirectToSell: true } });
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

      <Footer />
    </div>
  );
};

export default HowItWorksPage;