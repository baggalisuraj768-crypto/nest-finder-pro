import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ListingCard from "@/components/listings/ListingCard";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { listings } from "@/data/listings";

export default function Favorites() {
  const { favorites, clearFavorites } = useApp();
  const favoriteListings = listings.filter((l) => favorites.includes(l.id));

  return (
    <>
      <Helmet>
        <title>My Favorites | NestFinder</title>
        <meta name="description" content="View your saved favorite properties on NestFinder." />
      </Helmet>
      <Layout>
        {/* Header */}
        <section className="bg-primary py-16 md:py-24">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
                My Favorites
              </h1>
              <p className="text-primary-foreground/80 text-lg">
                {favoriteListings.length} saved {favoriteListings.length === 1 ? "property" : "properties"}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            {favoriteListings.length > 0 ? (
              <>
                <div className="flex justify-end mb-6">
                  <Button variant="outline" onClick={clearFavorites}>
                    Clear All
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteListings.map((listing, index) => (
                    <ListingCard key={listing.id} listing={listing} index={index} />
                  ))}
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-10 h-10 text-muted-foreground" />
                </div>
                <h2 className="font-display text-2xl font-semibold mb-3">No favorites yet</h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Start exploring properties and save your favorites to view them here later.
                </p>
                <Link to="/listings">
                  <Button className="btn-accent gap-2">
                    Browse Properties
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
}
