import bgmiImage from '@/assets/bgmi.jpg';
import valorantImage from '@/assets/valorant.jpg';
import freefireImage from '@/assets/freefire.jpg';

const games = [
  { name: 'VALORANT', image: valorantImage },
  { name: 'FREE FIRE', image: freefireImage },
  { name: 'BGMI', image: bgmiImage },
  { name: 'LEGENDS', image: valorantImage },
];

const GameBanner = () => {
  // Duplicate the array so the scroll looks continuous
  const loopGames = [...games, ...games, ...games];

  return (
    <section className="py-8 px-4 border-y border-primary/20 bg-black">
      <div className="max-w-7xl mx-auto overflow-hidden">
        <div className="flex animate-scroll space-x-8">
          {loopGames.map((game, index) => (
            <div
              key={index}
              className="flex-shrink-0 relative group cursor-pointer"
            >
              <div className="w-32 h-20 rounded-lg overflow-hidden border-2 border-primary/30 group-hover:border-primary transition-all duration-300">
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-1 left-2 right-2">
                  <span className="text-xs font-bold text-white drop-shadow-lg">
                    {game.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameBanner;
