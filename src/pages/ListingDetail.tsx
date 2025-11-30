import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  Phone,
  Mail,
  X,
  Check,
  Star,
  GitCompare,
  Copy,
  CheckCircle2,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import ContactModal from "@/components/modals/ContactModal";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { getListingById, Listing } from "@/data/listings";
import { getAgentById, Agent } from "@/data/agents";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const listing = getListingById(id || "");
  const agent = listing ? getAgentById(listing.agent_id) : undefined;
  
  const [currentImage, setCurrentImage] = useState(0);
  const [fullscreenGallery, setFullscreenGallery] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  
  const { toggleFavorite, isFavorite, addToCompare, isInCompare, canAddMore } = useApp();

  if (!listing) {
    return (
      <Layout>
        <div className="section-padding text-center">
          <h1 className="font-display text-2xl font-bold mb-4">Property not found</h1>
          <Link to="/listings">
            <Button>Back to Listings</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`;
    return `₹${price.toLocaleString()}`;
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const nextImage = () => setCurrentImage((i) => (i + 1) % listing.images.length);
  const prevImage = () => setCurrentImage((i) => (i - 1 + listing.images.length) % listing.images.length);

  return (
    <>
      <Helmet>
        <title>{listing.title} | NestFinder</title>
        <meta name="description" content={listing.description.substring(0, 160)} />
      </Helmet>
      <Layout>
        {/* Breadcrumb */}
        <div className="bg-muted py-4">
          <div className="container-custom">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span>/</span>
              <Link to="/listings" className="hover:text-primary">Listings</Link>
              <span>/</span>
              <span className="text-foreground">{listing.title}</span>
            </div>
          </div>
        </div>

        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Gallery */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative rounded-2xl overflow-hidden"
                >
                  <div className="aspect-[16/10] relative">
                    <img
                      src={listing.images[currentImage]}
                      alt={`${listing.title} - Image ${currentImage + 1}`}
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => setFullscreenGallery(true)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent pointer-events-none" />
                    
                    {/* Navigation */}
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 flex items-center justify-center hover:bg-background transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 flex items-center justify-center hover:bg-background transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Counter */}
                    <div className="absolute bottom-4 right-4 px-3 py-1 bg-background/90 rounded-full text-sm font-medium">
                      {currentImage + 1} / {listing.images.length}
                    </div>
                  </div>

                  {/* Thumbnails */}
                  <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                    {listing.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImage(i)}
                        className={cn(
                          "flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all",
                          i === currentImage ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                        )}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="badge-type">{listing.type}</span>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Listed {new Date(listing.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                        {listing.title}
                      </h1>
                      <div className="flex items-center gap-2 text-muted-foreground mt-2">
                        <MapPin className="w-5 h-5" />
                        <span>{listing.address}, {listing.city}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="badge-price text-2xl">{formatPrice(listing.price)}</div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    {listing.beds > 0 && (
                      <div className="bg-muted rounded-xl p-4 text-center">
                        <Bed className="w-6 h-6 text-primary mx-auto mb-2" />
                        <div className="font-semibold">{listing.beds}</div>
                        <div className="text-sm text-muted-foreground">Bedrooms</div>
                      </div>
                    )}
                    {listing.baths > 0 && (
                      <div className="bg-muted rounded-xl p-4 text-center">
                        <Bath className="w-6 h-6 text-primary mx-auto mb-2" />
                        <div className="font-semibold">{listing.baths}</div>
                        <div className="text-sm text-muted-foreground">Bathrooms</div>
                      </div>
                    )}
                    <div className="bg-muted rounded-xl p-4 text-center">
                      <Maximize2 className="w-6 h-6 text-primary mx-auto mb-2" />
                      <div className="font-semibold">{listing.area_sqft.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Sq Ft</div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h2 className="font-display text-xl font-semibold mb-3">Description</h2>
                    <p className="text-muted-foreground leading-relaxed">{listing.description}</p>
                  </div>

                  {/* Features */}
                  <div>
                    <h2 className="font-display text-xl font-semibold mb-3">Features & Amenities</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {listing.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-muted-foreground">
                          <Check className="w-5 h-5 text-primary" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Actions */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-card rounded-2xl p-6 shadow-card sticky top-24"
                >
                  <div className="flex gap-3 mb-6">
                    <Button
                      variant="outline"
                      className={cn("flex-1 gap-2", isFavorite(listing.id) && "text-accent border-accent")}
                      onClick={() => {
                        toggleFavorite(listing.id);
                        toast.success(isFavorite(listing.id) ? "Removed from favorites" : "Added to favorites");
                      }}
                    >
                      <Heart className={cn("w-4 h-4", isFavorite(listing.id) && "fill-current")} />
                      {isFavorite(listing.id) ? "Saved" : "Save"}
                    </Button>
                    <Button variant="outline" className="flex-1 gap-2" onClick={handleShare}>
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        addToCompare(listing.id);
                      }}
                      disabled={!canAddMore && !isInCompare(listing.id)}
                      className={cn(isInCompare(listing.id) && "bg-primary text-primary-foreground")}
                    >
                      <GitCompare className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Agent Card */}
                  {agent && (
                    <div className="border-t border-border pt-6">
                      <h3 className="font-display text-lg font-semibold mb-4">Listed by</h3>
                      <Link to={`/agent/${agent.id}`}>
                        <div className="flex items-center gap-4 p-4 bg-muted rounded-xl hover:bg-secondary transition-colors">
                          <img
                            src={agent.image}
                            alt={agent.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{agent.name}</span>
                              {agent.verified && <CheckCircle2 className="w-4 h-4 text-primary" />}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Star className="w-4 h-4 text-accent fill-accent" />
                              {agent.rating} ({agent.reviewCount} reviews)
                            </div>
                          </div>
                        </div>
                      </Link>

                      <div className="space-y-3 mt-4">
                        <a href={`tel:${agent.phone}`}>
                          <Button variant="outline" className="w-full gap-2">
                            <Phone className="w-4 h-4" />
                            {agent.phone}
                          </Button>
                        </a>
                        <Button
                          className="w-full btn-accent gap-2"
                          onClick={() => setContactModalOpen(true)}
                        >
                          <Mail className="w-4 h-4" />
                          Contact Agent
                        </Button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Fullscreen Gallery */}
        <AnimatePresence>
          {fullscreenGallery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/95 z-50 flex items-center justify-center"
            >
              <button
                onClick={() => setFullscreenGallery(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background flex items-center justify-center"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background flex items-center justify-center"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <img
                src={listing.images[currentImage]}
                alt=""
                className="max-w-[90vw] max-h-[90vh] object-contain"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-background rounded-full text-sm font-medium">
                {currentImage + 1} / {listing.images.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <ContactModal
          open={contactModalOpen}
          onOpenChange={setContactModalOpen}
          agent={agent}
          listingTitle={listing.title}
        />
      </Layout>
    </>
  );
}
