import { Link } from 'react-router-dom';
import { Shield, Trophy, Target, Zap, Crown, Star, Key, Coins, Gift } from 'lucide-react';

const listingCategories = [
  {
    id: 'bgmi',
    name: 'BGMI Accounts',
    icon: Trophy,
    color: 'text-yellow-400'
  },
  {
    id: 'valorant',
    name: 'Valorant Accounts',
    icon: Target,
    color: 'text-red-400'
  },
  {
    id: 'freefire',
    name: 'Free Fire Accounts',
    icon: Zap,
    color: 'text-orange-400'
  },
  {
    id: 'codm',
    name: 'COD Mobile Accounts',
    icon: Shield,
    color: 'text-green-400'
  },
  {
    id: 'apex',
    name: 'Apex Legends Accounts',
    icon: Crown,
    color: 'text-purple-400'
  },
  {
    id: 'pubg',
    name: 'PUBG PC Accounts',
    icon: Star,
    color: 'text-blue-400'
  }
];

const productCategories = [
  {
    id: 'valorant-vp',
    name: 'Valorant Points (VP)',
    icon: Coins,
    color: 'text-red-400'
  },
  {
    id: 'lol-rp',
    name: 'LoL Riot Points (RP)',
    icon: Crown,
    color: 'text-yellow-400'
  },
  {
    id: 'steam-code',
    name: 'Steam Wallet Code',
    icon: Gift,
    color: 'text-blue-400'
  },
  {
    id: 'random-keys',
    name: 'Steam Random Keys',
    icon: Key,
    color: 'text-green-400'
  },
  {
    id: 'dragon-coin',
    name: 'Metin2 Dragon Coin',
    icon: Star,
    color: 'text-purple-400'
  },
  {
    id: 'bigpoint',
    name: 'Bigpoint Epin',
    icon: Zap,
    color: 'text-orange-400'
  }
];

const CategoryList = ({ title, categories }) => (
  <div className="bg-card/40 rounded-xl p-6 border border-border">
    <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          to={`/category/${cat.id}`}
          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-card/70 transition-colors group"
        >
          <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 rounded-md group-hover:from-primary/30 group-hover:to-secondary/30">
            <cat.icon className={`w-5 h-5 ${cat.color}`} />
          </div>
          <span className="text-sm font-medium text-foreground group-hover:text-primary truncate">
            {cat.name}
          </span>
        </Link>
      ))}
    </div>
  </div>
);

const PopularCategories = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <CategoryList
          title="Popular Listing & Account Categories"
          categories={listingCategories}
        />
        <CategoryList
          title="Popular Product & Epin Categories"
          categories={productCategories}
        />
      </div>
    </section>
  );
};

export default PopularCategories;
