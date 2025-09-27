import { Shield, Users, Zap, Heart } from 'lucide-react';

const WhyUs = () => {
  const features = [
    {
      icon: Shield,
      title: "Trusted Platform",
      description: "Verified sellers and secure communication channels ensure safe transactions for everyone.",
      color: "from-primary to-blue-400"
    },
    {
      icon: Users,
      title: "Large Community",
      description: "Join thousands of active gamers buying and selling accounts across popular games.",
      color: "from-secondary to-green-400"
    },
    {
      icon: Zap,
      title: "Quick Connections",
      description: "Find buyers and sellers instantly with our optimized matching and search system.",
      color: "from-yellow-400 to-orange-400"
    },
    {
      icon: Heart,
      title: "Gamer-First",
      description: "Built by gamers for gamers, we understand what the community needs and wants.",
      color: "from-pink-400 to-red-400"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient-gaming mb-4">
            Why Choose KreedaaX?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're more than just a marketplace – we're a trusted community where gamers connect safely
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="gaming-card p-6 text-center group relative overflow-hidden"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              {/* Icon */}
              <div className="relative mb-6">
                <div className={`w-16 h-16 mx-auto bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 gaming-card p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gradient-gaming mb-2">10K+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gradient-gaming mb-2">5K+</div>
              <div className="text-muted-foreground">Successful Deals</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gradient-gaming mb-2">50+</div>
              <div className="text-muted-foreground">Supported Games</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gradient-gaming mb-2">24/7</div>
              <div className="text-muted-foreground">Community Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;