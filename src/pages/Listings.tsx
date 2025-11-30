import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Grid3X3, List, SlidersHorizontal, Search } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ListingCard from "@/components/listings/ListingCard";
import FilterPanel, { FilterState, initialFilters } from "@/components/listings/FilterPanel";
import { Button } from "@/components/ui/button";
import { listings, Listing } from "@/data/listings";

const cities = [...new Set(listings.map((l) => l.city))];
const propertyTypes = [...new Set(listings.map((l) => l.type))];

const ITEMS_PER_PAGE = 9;

export default function Listings() {
  const [searchParams] = useSearchParams();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  
  const [filters, setFilters] = useState<FilterState>(() => ({
    ...initialFilters,
    city: searchParams.get("city") || "",
    type: searchParams.get("type") || "",
    minPrice: parseInt(searchParams.get("minPrice") || "0"),
    maxPrice: parseInt(searchParams.get("maxPrice") || "50000000"),
  }));

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      city: searchParams.get("city") || prev.city,
      type: searchParams.get("type") || prev.type,
      minPrice: parseInt(searchParams.get("minPrice") || "0") || prev.minPrice,
      maxPrice: parseInt(searchParams.get("maxPrice") || "50000000") || prev.maxPrice,
    }));
  }, [searchParams]);

  const filteredListings = useMemo(() => {
    let result = [...listings];

    // Apply filters
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      result = result.filter(
        (l) =>
          l.title.toLowerCase().includes(keyword) ||
          l.address.toLowerCase().includes(keyword) ||
          l.city.toLowerCase().includes(keyword)
      );
    }

    if (filters.city && filters.city !== "all") {
      result = result.filter((l) => l.city === filters.city);
    }

    if (filters.type && filters.type !== "all") {
      result = result.filter((l) => l.type === filters.type);
    }

    result = result.filter(
      (l) => l.price >= filters.minPrice && l.price <= filters.maxPrice
    );

    if (filters.minBeds > 0) {
      result = result.filter((l) => l.beds >= filters.minBeds);
    }

    if (filters.minArea > 0) {
      result = result.filter((l) => l.area_sqft >= filters.minArea);
    }

    // Sort
    switch (filters.sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "area":
        result.sort((a, b) => b.area_sqft - a.area_sqft);
        break;
      case "newest":
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [filters]);

  const totalPages = Math.ceil(filteredListings.length / ITEMS_PER_PAGE);
  const paginatedListings = filteredListings.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setPage(1);
  }, [filters]);

  return (
    <>
      <Helmet>
        <title>Property Listings - Find Apartments, Villas, Houses | NestFinder</title>
        <meta name="description" content="Browse all property listings on NestFinder. Filter by city, price, property type and more to find your perfect home." />
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
                Explore Properties
              </h1>
              <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
                Discover {filteredListings.length} properties matching your criteria
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar Filters - Desktop */}
              <aside className="hidden lg:block w-72 flex-shrink-0">
                <FilterPanel
                  filters={filters}
                  onFilterChange={setFilters}
                  cities={cities}
                  propertyTypes={propertyTypes}
                />
              </aside>

              {/* Mobile Filter Button */}
              <div className="lg:hidden flex items-center justify-between mb-4">
                <Button
                  variant="outline"
                  onClick={() => setMobileFilterOpen(true)}
                  className="gap-2"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </Button>
                <div className="flex items-center gap-2">
                  <Button
                    variant={view === "grid" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setView("grid")}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={view === "list" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setView("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Mobile Filter Panel */}
              <FilterPanel
                filters={filters}
                onFilterChange={setFilters}
                cities={cities}
                propertyTypes={propertyTypes}
                isMobile
                isOpen={mobileFilterOpen}
                onClose={() => setMobileFilterOpen(false)}
              />

              {/* Listings */}
              <div className="flex-1">
                {/* Desktop View Toggle */}
                <div className="hidden lg:flex items-center justify-between mb-6">
                  <p className="text-muted-foreground">
                    Showing {(page - 1) * ITEMS_PER_PAGE + 1}-{Math.min(page * ITEMS_PER_PAGE, filteredListings.length)} of {filteredListings.length} properties
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={view === "grid" ? "default" : "outline"}
                      size="icon"
                      onClick={() => setView("grid")}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={view === "list" ? "default" : "outline"}
                      size="icon"
                      onClick={() => setView("list")}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Results */}
                {paginatedListings.length > 0 ? (
                  <>
                    <div
                      className={
                        view === "grid"
                          ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                          : "space-y-6"
                      }
                    >
                      {paginatedListings.map((listing, index) => (
                        <ListingCard
                          key={listing.id}
                          listing={listing}
                          index={index}
                          view={view}
                        />
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex justify-center items-center gap-2 mt-12">
                        <Button
                          variant="outline"
                          onClick={() => setPage((p) => Math.max(1, p - 1))}
                          disabled={page === 1}
                        >
                          Previous
                        </Button>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <Button
                              key={p}
                              variant={p === page ? "default" : "outline"}
                              size="icon"
                              onClick={() => setPage(p)}
                              className="w-10 h-10"
                            >
                              {p}
                            </Button>
                          ))}
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                          disabled={page === totalPages}
                        >
                          Next
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-16">
                    <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-display text-xl font-semibold mb-2">No properties found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your filters to see more results
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
