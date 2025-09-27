import { Link } from 'react-router-dom';
import { Shield, Trophy, Target, Zap, Crown, Star } from 'lucide-react';

const categories = [
  {
    id: 'bgmi',
    name: 'BGMI Accounts',
    description: 'Conqueror & Ace tier accounts',
    icon: Trophy,
    count: '120+ listings',
    color: 'text-yellow-400'
  },
  {
    id: 'valorant',
    name: 'Valorant Accounts',
    description: 'Ranked accounts with skins',
    icon: Target,
    count: '85+ listings',
    color: 'text-red-400'
  },
  {
    id: 'freefire',
    name: 'Free Fire Accounts',
    description: 'Diamond & Heroic accounts',
    icon: Zap,
    count: '200+ listings',
    color: 'text-orange-400'
  },
  {
    id: 'codm',
    name: 'COD Mobile Accounts',
    description: 'Legendary & Master accounts',
    icon: Shield,
    count: '95+ listings',
    color: 'text-green-400'
  },
  {
    id: 'apex',
    name: 'Apex Legends Accounts',
    description: 'Ranked accounts with legends',
    icon: Crown,
    count: '60+ listings',
    color: 'text-purple-400'
  },
  {
    id: 'pubg',
    name: 'PUBG PC Accounts',
    description: 'High tier ranked accounts',
    icon: Star,
    count: '45+ listings',
    color: 'text-blue-400'
  }
];

const PopularCategories = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Popular Listing & Account Categories
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="flex items-center space-x-4 p-4 bg-card/50 rounded-xl border border-border hover:border-primary/50 hover:bg-card/70 transition-all duration-300 group"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
                  <category.icon className={`w-6 h-6 ${category.color}`} />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300 truncate">
                  {category.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-1 truncate">
                  {category.description}
                </p>
                <span className="text-xs text-secondary font-semibold">
                  {category.count}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;