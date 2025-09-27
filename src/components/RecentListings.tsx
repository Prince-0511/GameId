import { Link } from 'react-router-dom';
import { Star, Shield, Clock } from 'lucide-react';
import bgmiImage from '@/assets/bgmi.jpg';
import valorantImage from '@/assets/valorant.jpg';
import freefireImage from '@/assets/freefire.jpg';

const recentListings = [
  {
    id: '1',
    title: 'BGMI Conqueror Account',
    game: 'BGMI',
    description: 'Season 15 Conqueror with rare skins',
    price: '$299',
    image: bgmiImage,
    seller: {
      name: 'ProGamer123',
      rating: 4.9,
      verified: true
    },
    timeAgo: '2 hours ago',
    featured: true
  },
  {
    id: '2',
    title: 'Valorant Radiant Account',
    game: 'Valorant',
    description: 'Radiant rank with premium skins',
    price: '$450',
    image: valorantImage,
    seller: {
      name: 'ValMaster',
      rating: 4.8,
      verified: true
    },
    timeAgo: '4 hours ago',
    featured: false
  },
  {
    id: '3',
    title: 'Free Fire Diamond Account',
    game: 'Free Fire',
    description: 'Diamond tier with exclusive bundles',
    price: '$180',
    image: freefireImage,
    seller: {
      name: 'FFKing',
      rating: 4.7,
      verified: true
    },
    timeAgo: '6 hours ago',
    featured: false
  },
  {
    id: '4',
    title: 'BGMI Crown Account',
    game: 'BGMI',
    description: 'Crown rank with mythic outfits',
    price: '$220',
    image: bgmiImage,
    seller: {
      name: 'CrownAce',
      rating: 4.9,
      verified: false
    },
    timeAgo: '8 hours ago',
    featured: false
  }
];

const RecentListings = () => {
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
          <Link
            to="/games"
            className="btn-gaming-secondary px-6 py-3"
          >
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
              {/* Featured Badge */}
              {listing.featured && (
                <div className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-bold z-10">
                  Featured
                </div>
              )}

              {/* Game Image */}
              <div className="relative mb-4 overflow-hidden rounded-xl">
                <img
                  src={listing.image}
                  alt={`${listing.game} account`}
                  className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent"></div>
                <div className="absolute top-2 left-2">
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full font-semibold">
                    {listing.game}
                  </span>
                </div>
                <div className="absolute bottom-2 left-2">
                  <h3 className="text-sm font-bold text-white mb-1">
                    {listing.title}
                  </h3>
                </div>
                <div className="absolute bottom-2 right-2">
                  <span className="text-lg font-bold text-secondary bg-background/80 px-2 py-1 rounded-lg">
                    {listing.price}
                  </span>
                </div>
              </div>

              {/* Listing Info */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{listing.timeAgo}</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {listing.description}
                </p>
              </div>

              {/* Seller Info */}
              <div className="flex items-center justify-between mb-4 p-2 bg-background/50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {listing.seller.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs font-medium text-foreground">
                        {listing.seller.name}
                      </span>
                      {listing.seller.verified && (
                        <Shield className="w-3 h-3 text-secondary fill-current" />
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-2 h-2 text-yellow-400 fill-current" />
                      <span className="text-xs text-muted-foreground">
                        {listing.seller.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
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