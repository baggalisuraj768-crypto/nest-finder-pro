import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { GitCompare, X, ArrowRight, Bed, Bath, Maximize2, MapPin, Check } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { listings, Listing } from "@/data/listings";

export default function Compare() {
  const { compareList, removeFromCompare, clearCompare } = useApp();
  const compareListings = listings.filter((l) => compareList.includes(l.id));

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`;
    return `₹${price.toLocaleString()}`;
  };

  const allFeatures = [...new Set(compareListings.flatMap((l) => l.features))];

  return (
    <>
      <Helmet>
        <title>Compare Properties | NestFinder</title>
        <meta name="description" content="Compare multiple properties side by side on NestFinder." />
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
                Compare Properties
              </h1>
              <p className="text-primary-foreground/80 text-lg">
                Compare up to 3 properties side by side
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            {compareListings.length > 0 ? (
              <>
                <div className="flex justify-end mb-6">
                  <Button variant="outline" onClick={clearCompare}>
                    Clear All
                  </Button>
                </div>

                {/* Comparison Table */}
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px]">
                    <thead>
                      <tr>
                        <th className="text-left p-4 bg-muted font-semibold rounded-tl-xl">Property</th>
                        {compareListings.map((listing) => (
                          <th key={listing.id} className="p-4 bg-muted last:rounded-tr-xl">
                            <div className="relative">
                              <button
                                onClick={() => removeFromCompare(listing.id)}
                                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center"
                              >
                                <X className="w-4 h-4" />
                              </button>
                              <img
                                src={listing.images[0]}
                                alt={listing.title}
                                className="w-full h-40 object-cover rounded-lg mb-3"
                              />
                              <Link to={`/listing/${listing.id}`}>
                                <h3 className="font-semibold text-sm hover:text-primary transition-colors line-clamp-2">
                                  {listing.title}
                                </h3>
                              </Link>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="p-4 font-medium">Price</td>
                        {compareListings.map((listing) => (
                          <td key={listing.id} className="p-4 text-center">
                            <span className="badge-price">{formatPrice(listing.price)}</span>
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-border bg-muted/50">
                        <td className="p-4 font-medium">Type</td>
                        {compareListings.map((listing) => (
                          <td key={listing.id} className="p-4 text-center">
                            <span className="badge-type">{listing.type}</span>
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-border">
                        <td className="p-4 font-medium">Location</td>
                        {compareListings.map((listing) => (
                          <td key={listing.id} className="p-4 text-center text-sm text-muted-foreground">
                            <div className="flex items-center justify-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {listing.city}
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-border bg-muted/50">
                        <td className="p-4 font-medium">Bedrooms</td>
                        {compareListings.map((listing) => (
                          <td key={listing.id} className="p-4 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Bed className="w-4 h-4 text-primary" />
                              {listing.beds || "N/A"}
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-border">
                        <td className="p-4 font-medium">Bathrooms</td>
                        {compareListings.map((listing) => (
                          <td key={listing.id} className="p-4 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Bath className="w-4 h-4 text-primary" />
                              {listing.baths || "N/A"}
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-border bg-muted/50">
                        <td className="p-4 font-medium">Area (sq ft)</td>
                        {compareListings.map((listing) => (
                          <td key={listing.id} className="p-4 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Maximize2 className="w-4 h-4 text-primary" />
                              {listing.area_sqft.toLocaleString()}
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-border">
                        <td className="p-4 font-medium">Price per sq ft</td>
                        {compareListings.map((listing) => (
                          <td key={listing.id} className="p-4 text-center text-sm">
                            ₹{Math.round(listing.price / listing.area_sqft).toLocaleString()}
                          </td>
                        ))}
                      </tr>

                      {/* Features */}
                      <tr>
                        <td colSpan={compareListings.length + 1} className="p-4 bg-muted font-semibold">
                          Features & Amenities
                        </td>
                      </tr>
                      {allFeatures.map((feature) => (
                        <tr key={feature} className="border-b border-border">
                          <td className="p-4 text-sm">{feature}</td>
                          {compareListings.map((listing) => (
                            <td key={listing.id} className="p-4 text-center">
                              {listing.features.includes(feature) ? (
                                <Check className="w-5 h-5 text-primary mx-auto" />
                              ) : (
                                <span className="text-muted-foreground">—</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                  <GitCompare className="w-10 h-10 text-muted-foreground" />
                </div>
                <h2 className="font-display text-2xl font-semibold mb-3">No properties to compare</h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Add properties to your compare list by clicking the compare icon on any listing card.
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
