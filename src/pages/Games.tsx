import { useState } from 'react';
import { Search, Filter, Star, Users, TrendingUp } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GameCard from '@/components/GameCard';

const Games = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample game data
  const games = [
    {
      id: 1,
      title: 'BGMI',
      image: '/src/assets/bgmi.jpg',
      category: 'Battle Royale',
      accounts: 245,
      trending: true,
      rating: 4.8
    },
    {
      id: 2,
      title: 'Free Fire',
      image: '/src/assets/freefire.jpg',
      category: 'Battle Royale',
      accounts: 189,
      trending: true,
      rating: 4.6
    },
    {
      id: 3,
      title: 'Valorant',
      image: '/src/assets/valorant.jpg',
      category: 'FPS',
      accounts: 156,
      trending: false,
      rating: 4.7
    },
    {
      id: 4,
      title: 'Call of Duty Mobile',
      image: '/src/assets/bgmi.jpg',
      category: 'FPS',
      accounts: 134,
      trending: false,
      rating: 4.5
    },
    {
      id: 5,
      title: 'PUBG Mobile',
      image: '/src/assets/freefire.jpg',
      category: 'Battle Royale',
      accounts: 98,
      trending: false,
      rating: 4.4
    },
    {
      id: 6,
      title: 'Mobile Legends',
      image: '/src/assets/valorant.jpg',
      category: 'MOBA',
      accounts: 87,
      trending: true,
      rating: 4.3
    }
  ];

  const categories = ['all', 'Battle Royale', 'FPS', 'MOBA', 'RPG', 'Strategy'];

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/20 via-secondary/20 to-background">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gradient-gaming mb-6">
            Browse All Games
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Discover premium gaming accounts across all your favorite titles
          </p>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="gaming-card p-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search for games..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none text-lg border border-border rounded-lg"
                  />
                </div>

                {/* Category Filter */}
                <div className="relative">
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="pl-12 pr-8 py-4 bg-background text-foreground border border-border rounded-lg focus:outline-none text-lg appearance-none cursor-pointer"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-foreground">
              {filteredGames.length} Games Found
            </h2>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                Trending
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                Top Rated
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGames.map((game) => (
              <div key={game.id} className="gaming-card group cursor-pointer">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {game.trending && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-secondary text-white px-3 py-1 rounded-full text-sm font-bold">
                      Trending
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {game.title}
                      </h3>
                      <p className="text-muted-foreground">{game.category}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{game.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">{game.accounts} accounts</span>
                    </div>
                    <button className="btn-gaming-primary px-4 py-2 text-sm">
                      Browse Accounts
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredGames.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-muted-foreground mb-4">
                No games found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Games;