import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Shield, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';

const RecentListings = () => {
  const [recentListings, setRecentListings] = useState<any[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      const { data, error } = await supabase
        .from('game_listings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(4);

      if (error) console.error('Error fetching games:', error);
      else setRecentListings(data);
    };

    fetchGames();
  }, []);

  return (
    <section className="py-16 px-4 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Recent Listings
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
          </div>
          <Link to="/games" className="btn-gaming-secondary px-6 py-3">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentListings.map((listing) => (
            <div
              key={listing.id}
              className={`gaming-card p-6 group relative ${
                listing.featured ? 'ring-2 ring-primary' : ''
              }`}
            >
              {listing.featured && (
                <div className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-bold z-10">
                  Featured
                </div>
              )}

              <div className="relative mb-4 overflow-hidden rounded-xl">
                <img
                  src={listing.image_url}
                  alt={`${listing.game} account`}
                  className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent"></div>
                <div className="absolute top-2 left-2">
                  {/* <span className="">
                    {listing.game}
                  </span> */}
                </div>
                <div className="absolute bottom-2 left-2">
                  <h3 className="text-sm font-bold text-white mb-1">
                    {listing.title}
                  </h3>
                </div>
                <div className="absolute bottom-2 right-2">
                  <span className="text-lg font-bold text-secondary bg-background/80 px-2 py-1 rounded-lg">
                    {`₹${listing.price}`}
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>Just now</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {listing.game_name}
                </p>
              </div>

              <div className="flex items-center justify-between mb-4 p-2 bg-background/50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {listing.seller_name?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs font-medium text-foreground">
                        {listing.seller_name}
                      </span>
                      {listing.seller_verified && (
                        <Shield className="w-3 h-3 text-secondary fill-current" />
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-2 h-2 text-yellow-400 fill-current" />
                      <span className="text-xs text-muted-foreground">
                        {listing.seller_rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                to={`/game/${listing.id}`}
                className="w-full btn-gaming-primary py-2 text-center block text-sm"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentListings;
