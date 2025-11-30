import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export interface FilterState {
  city: string;
  type: string;
  minPrice: number;
  maxPrice: number;
  minBeds: number;
  minArea: number;
  keyword: string;
  sortBy: string;
}

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  cities: string[];
  propertyTypes: string[];
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export const initialFilters: FilterState = {
  city: "",
  type: "",
  minPrice: 0,
  maxPrice: 50000000,
  minBeds: 0,
  minArea: 0,
  keyword: "",
  sortBy: "newest",
};

export default function FilterPanel({
  filters,
  onFilterChange,
  cities,
  propertyTypes,
  isMobile = false,
  isOpen = true,
  onClose,
}: FilterPanelProps) {
  const [localFilters, setLocalFilters] = useState(filters);
  const [priceRange, setPriceRange] = useState([filters.minPrice, filters.maxPrice]);

  useEffect(() => {
    setLocalFilters(filters);
    setPriceRange([filters.minPrice, filters.maxPrice]);
  }, [filters]);

  const handleChange = (key: keyof FilterState, value: string | number) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
    const newFilters = { ...localFilters, minPrice: values[0], maxPrice: values[1] };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    setLocalFilters(initialFilters);
    setPriceRange([0, 50000000]);
    onFilterChange(initialFilters);
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(0)} L`;
    return `₹${price.toLocaleString()}`;
  };

  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-primary" />
          <h3 className="font-display text-lg font-semibold">Filters</h3>
        </div>
        {isMobile && onClose && (
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Search Keyword */}
      <div className="space-y-2">
        <Label>Search</Label>
        <Input
          placeholder="Search properties..."
          value={localFilters.keyword}
          onChange={(e) => handleChange("keyword", e.target.value)}
          className="input-search"
        />
      </div>

      {/* City */}
      <div className="space-y-2">
        <Label>City</Label>
        <Select value={localFilters.city} onValueChange={(v) => handleChange("city", v)}>
          <SelectTrigger>
            <SelectValue placeholder="All Cities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cities</SelectItem>
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
        <Label>Property Type</Label>
        <Select value={localFilters.type} onValueChange={(v) => handleChange("type", v)}>
          <SelectTrigger>
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {propertyTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Price Range</Label>
          <span className="text-sm text-muted-foreground">
            {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
          </span>
        </div>
        <Slider
          value={priceRange}
          onValueChange={handlePriceChange}
          min={0}
          max={50000000}
          step={500000}
          className="mt-2"
        />
      </div>

      {/* Bedrooms */}
      <div className="space-y-2">
        <Label>Min Bedrooms</Label>
        <Select value={localFilters.minBeds.toString()} onValueChange={(v) => handleChange("minBeds", parseInt(v))}>
          <SelectTrigger>
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Any</SelectItem>
            <SelectItem value="1">1+</SelectItem>
            <SelectItem value="2">2+</SelectItem>
            <SelectItem value="3">3+</SelectItem>
            <SelectItem value="4">4+</SelectItem>
            <SelectItem value="5">5+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Sort By */}
      <div className="space-y-2">
        <Label>Sort By</Label>
        <Select value={localFilters.sortBy} onValueChange={(v) => handleChange("sortBy", v)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="area">Area: Largest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reset */}
      <Button variant="outline" className="w-full" onClick={resetFilters}>
        Reset Filters
      </Button>
    </div>
  );

  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/50 z-40"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-card z-50 p-6 overflow-y-auto"
            >
              {content}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <div className="bg-card rounded-xl p-6 sticky top-24 shadow-card">
      {content}
    </div>
  );
}
