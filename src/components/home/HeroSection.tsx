import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, MapPin, Home, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const cities = ["Hyderabad", "Bangalore", "Mumbai", "Delhi", "Pune", "Chennai", "Noida"];
const propertyTypes = ["Apartment", "Villa", "House", "Penthouse", "Plot"];

export default function HeroSection() {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    location: "",
    type: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchData.location) params.set("city", searchData.location);
    if (searchData.type) params.set("type", searchData.type);
    if (searchData.minPrice) params.set("minPrice", searchData.minPrice);
    if (searchData.maxPrice) params.set("maxPrice", searchData.maxPrice);
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
          alt="Modern luxury home"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-primary-foreground/10 rounded-full blur-3xl animate-float animation-delay-200" />

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/20 backdrop-blur-sm rounded-full text-primary-foreground text-sm font-medium mb-6">
              <Home className="w-4 h-4" />
              Your Dream Home Awaits
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight"
          >
            Find Your Perfect
            <span className="block text-accent">Nest</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-primary-foreground/90 text-lg md:text-xl mb-8 max-w-xl"
          >
            Discover exceptional properties across India's most sought-after locations. 
            Your new chapter starts here.
          </motion.p>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-effect rounded-2xl p-4 md:p-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Location</label>
                <Select value={searchData.location} onValueChange={(v) => setSearchData({ ...searchData, location: v })}>
                  <SelectTrigger className="bg-background">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <SelectValue placeholder="Select city" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Property Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Property Type</label>
                <Select value={searchData.type} onValueChange={(v) => setSearchData({ ...searchData, type: v })}>
                  <SelectTrigger className="bg-background">
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4 text-muted-foreground" />
                      <SelectValue placeholder="Select type" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Min Price</label>
                <Select value={searchData.minPrice} onValueChange={(v) => setSearchData({ ...searchData, minPrice: v })}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Min Price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">No Min</SelectItem>
                    <SelectItem value="2000000">₹20 L</SelectItem>
                    <SelectItem value="5000000">₹50 L</SelectItem>
                    <SelectItem value="10000000">₹1 Cr</SelectItem>
                    <SelectItem value="20000000">₹2 Cr</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Max Price</label>
                <Select value={searchData.maxPrice} onValueChange={(v) => setSearchData({ ...searchData, maxPrice: v })}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Max Price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5000000">₹50 L</SelectItem>
                    <SelectItem value="10000000">₹1 Cr</SelectItem>
                    <SelectItem value="20000000">₹2 Cr</SelectItem>
                    <SelectItem value="50000000">₹5 Cr</SelectItem>
                    <SelectItem value="100000000">No Max</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={handleSearch} className="w-full mt-4 btn-accent h-12 text-lg">
              <Search className="w-5 h-5 mr-2" />
              Search Properties
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-3 gap-8 mt-12"
          >
            {[
              { value: "500+", label: "Properties" },
              { value: "50+", label: "Cities" },
              { value: "1000+", label: "Happy Clients" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold text-accent">{stat.value}</div>
                <div className="text-primary-foreground/80 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/80"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.div>
    </section>
  );
}
