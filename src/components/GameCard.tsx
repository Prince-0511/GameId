import { Link } from 'react-router-dom';
import { Star, Shield, Users } from 'lucide-react';

interface GameCardProps {
  id: string;
  title: string;
  game: string;
  description: string;
  price: string;
  seller: {
    name: string;
    rating: number;
    verified: boolean;
  };
  image: string;
  featured?: boolean;
}

const GameCard = ({ id, title, game, description, price, seller, image, featured }: GameCardProps) => {
  return (
    <div className={`gaming-card p-6 group ${featured ? 'ring-2 ring-primary' : ''}`}>
      {/* Game Image */}
      <div className="relative mb-4 overflow-hidden rounded-lg">
        <img
          src={image}
          alt={`${game} game ID`}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {featured && (
          <div className="absolute top-2 right-2 bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs font-bold">
            Featured
          </div>
        )}
      </div>

      {/* Game Info */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-primary font-semibold">{game}</span>
          <span className="text-lg font-bold text-secondary">{price}</span>
        </div>
        
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>
      </div>

      {/* Seller Info */}
      <div className="flex items-center justify-between mb-4 p-3 bg-background/50 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">
              {seller.name.charAt(0)}
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <span className="text-sm font-medium text-foreground">
                {seller.name}
              </span>
              {seller.verified && (
                <Shield className="w-4 h-4 text-secondary fill-current" />
              )}
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-xs text-muted-foreground">
                {seller.rating}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <Link
          to={`/game/${id}`}
          className="w-full btn-gaming-primary py-3 text-center block"
        >
          View Details
        </Link>
        <button className="w-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground py-3 rounded-xl font-semibold transition-all duration-300">
          Contact Seller
        </button>
      </div>
    </div>
  );
};

export default GameCard;