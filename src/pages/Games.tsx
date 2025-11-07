import { useState, useEffect } from "react";
import { Search, Filter, Star, Users, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GameCard from "@/components/GameCard";
import { supabase } from "../lib/supabase";

const Games = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ["all", "Battle Royale", "FPS", "MOBA", "RPG", "Strategy"];

  // ✅ Fetch all uploaded games from Supabase
  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("game_listings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching games:", error);
      } else {
        setGames(data || []);
      }

      setLoading(false);
    };

    fetchGames();
  }, []);

  // ✅ Apply search + category filters
  const filteredGames = games.filter((game) => {
    const matchesSearch = game.game_name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      game.category?.toLowerCase() === selectedCategory.toLowerCase();
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
            Discover premium gaming accounts listed by verified sellers
          </p>

          {/* Search + Filter */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="gaming-card p-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Input */}
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
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
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
          {loading ? (
            <div className="text-center text-muted-foreground py-16">
              Loading games...
            </div>
          ) : filteredGames.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-muted-foreground mb-4">
                No games found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <>
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

              {/* ✅ Use GameCard to show uploaded games */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredGames.map((game) => (
                  <GameCard
                    key={game.id}
                    id={game.id}
                    title={game.game_name}
                    game={game.category || "Unknown"}
                    description={game.description || "No description available"}
                    price={`₹${game.price}`}
                    seller={{
                      name: game.seller_name || "Unknown Seller",
                      rating: game.seller_rating || 4.5,
                      verified: game.seller_verified || false,
                    }}
                    image={
                      game.image_url ||
                      "https://via.placeholder.com/400x250?text=Game+Image"
                    }
                    featured={game.featured || false}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Games;
