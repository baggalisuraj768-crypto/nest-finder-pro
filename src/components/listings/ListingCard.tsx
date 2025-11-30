import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Bed, Bath, Maximize2, MapPin, GitCompare, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { Listing } from "@/data/listings";
import { cn } from "@/lib/utils";

interface ListingCardProps {
  listing: Listing;
  index?: number;
  view?: "grid" | "list";
}

export default function ListingCard({ listing, index = 0, view = "grid" }: ListingCardProps) {
  const { toggleFavorite, isFavorite, addToCompare, isInCompare, canAddMore } = useApp();

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} L`;
    }
    return `₹${price.toLocaleString()}`;
  };

  if (view === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="card-listing flex flex-col sm:flex-row"
      >
        {/* Image */}
        <div className="relative sm:w-72 h-48 sm:h-auto flex-shrink-0">
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 badge-type">{listing.type}</div>
          <button
            onClick={() => toggleFavorite(listing.id)}
            className={cn("favorite-btn absolute top-3 right-3", isFavorite(listing.id) && "active")}
          >
            <Heart className={cn("w-5 h-5", isFavorite(listing.id) && "fill-current")} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col">
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Link to={`/listing/${listing.id}`}>
                  <h3 className="font-display text-lg font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
                    {listing.title}
                  </h3>
                </Link>
                <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                  <MapPin className="w-4 h-4" />
                  <span>{listing.address}, {listing.city}</span>
                </div>
              </div>
              <div className="badge-price text-lg">{formatPrice(listing.price)}</div>
            </div>

            <div className="flex items-center gap-6 mt-4 text-muted-foreground">
              {listing.beds > 0 && (
                <div className="flex items-center gap-1.5">
                  <Bed className="w-4 h-4" />
                  <span className="text-sm">{listing.beds} Beds</span>
                </div>
              )}
              {listing.baths > 0 && (
                <div className="flex items-center gap-1.5">
                  <Bath className="w-4 h-4" />
                  <span className="text-sm">{listing.baths} Baths</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Maximize2 className="w-4 h-4" />
                <span className="text-sm">{listing.area_sqft.toLocaleString()} sqft</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
            <Link to={`/listing/${listing.id}`} className="flex-1">
              <Button className="w-full btn-primary">
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </Link>
            <Button
              variant="outline"
              size="icon"
              onClick={() => addToCompare(listing.id)}
              disabled={!canAddMore && !isInCompare(listing.id)}
              className={cn(isInCompare(listing.id) && "bg-primary text-primary-foreground")}
            >
              <GitCompare className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="card-listing group"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-3 left-3 badge-type">{listing.type}</div>
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={() => toggleFavorite(listing.id)}
            className={cn("favorite-btn", isFavorite(listing.id) && "active")}
          >
            <Heart className={cn("w-5 h-5", isFavorite(listing.id) && "fill-current")} />
          </button>
          <button
            onClick={() => addToCompare(listing.id)}
            disabled={!canAddMore && !isInCompare(listing.id)}
            className={cn(
              "favorite-btn",
              isInCompare(listing.id) && "bg-primary text-primary-foreground"
            )}
          >
            <GitCompare className="w-4 h-4" />
          </button>
        </div>
        
        <div className="absolute bottom-3 left-3">
          <div className="badge-price text-lg">{formatPrice(listing.price)}</div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <Link to={`/listing/${listing.id}`}>
          <h3 className="font-display text-lg font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
            {listing.title}
          </h3>
        </Link>
        
        <div className="flex items-center gap-1 text-muted-foreground text-sm mt-2">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="line-clamp-1">{listing.address}, {listing.city}</span>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          {listing.beds > 0 && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Bed className="w-4 h-4" />
              <span className="text-sm">{listing.beds}</span>
            </div>
          )}
          {listing.baths > 0 && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Bath className="w-4 h-4" />
              <span className="text-sm">{listing.baths}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Maximize2 className="w-4 h-4" />
            <span className="text-sm">{listing.area_sqft.toLocaleString()}</span>
          </div>
        </div>

        <Link to={`/listing/${listing.id}`}>
          <Button className="w-full mt-4 btn-primary">
            View Details
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
