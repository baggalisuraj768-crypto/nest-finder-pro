export interface Listing {
  id: string;
  title: string;
  price: number;
  type: "Apartment" | "House" | "Villa" | "Plot" | "Penthouse";
  beds: number;
  baths: number;
  area_sqft: number;
  address: string;
  city: string;
  lat: number;
  lng: number;
  images: string[];
  description: string;
  features: string[];
  agent_id: string;
  featured: boolean;
  createdAt: string;
}

export const listings: Listing[] = [
  {
    id: "L1001",
    title: "Luxurious 3 BHK Apartment with City View",
    price: 8500000,
    type: "Apartment",
    beds: 3,
    baths: 2,
    area_sqft: 1450,
    address: "Plot 42, Road No. 12, Banjara Hills",
    city: "Hyderabad",
    lat: 17.4156,
    lng: 78.4347,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    ],
    description: "Experience luxury living in this stunning 3 BHK apartment located in the heart of Banjara Hills. Features modern architecture, premium finishes, and breathtaking city views. The apartment includes a modular kitchen, spacious bedrooms, and a large balcony perfect for entertaining.",
    features: ["Modular Kitchen", "Balcony", "Parking", "24/7 Security", "Gym", "Swimming Pool"],
    agent_id: "A201",
    featured: true,
    createdAt: "2024-01-15",
  },
  {
    id: "L1002",
    title: "Modern 4 BHK Villa with Garden",
    price: 15000000,
    type: "Villa",
    beds: 4,
    baths: 4,
    area_sqft: 3200,
    address: "Villa 18, Green Valley Estates, Whitefield",
    city: "Bangalore",
    lat: 12.9698,
    lng: 77.7500,
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    ],
    description: "Exquisite 4 BHK villa nestled in a serene gated community. This property boasts a beautiful private garden, contemporary interiors, and premium amenities. Perfect for families seeking a peaceful yet connected lifestyle.",
    features: ["Private Garden", "Servant Quarter", "Home Theater", "Solar Panels", "Rainwater Harvesting", "Club Access"],
    agent_id: "A202",
    featured: true,
    createdAt: "2024-01-20",
  },
  {
    id: "L1003",
    title: "Cozy 2 BHK Apartment Near Metro",
    price: 4500000,
    type: "Apartment",
    beds: 2,
    baths: 2,
    area_sqft: 950,
    address: "Tower B, Sunrise Heights, Andheri West",
    city: "Mumbai",
    lat: 19.1364,
    lng: 72.8296,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80",
    ],
    description: "Well-designed 2 BHK apartment offering excellent connectivity with metro station just 5 minutes walk. Features include modern amenities, ample natural light, and proximity to shopping centers and schools.",
    features: ["Near Metro", "Covered Parking", "Power Backup", "Intercom", "CCTV", "Children's Play Area"],
    agent_id: "A203",
    featured: true,
    createdAt: "2024-02-01",
  },
  {
    id: "L1004",
    title: "Stunning Penthouse with Terrace",
    price: 25000000,
    type: "Penthouse",
    beds: 5,
    baths: 5,
    area_sqft: 4500,
    address: "Top Floor, Skyline Towers, Marine Drive",
    city: "Mumbai",
    lat: 18.9432,
    lng: 72.8235,
    images: [
      "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
    ],
    description: "Ultra-luxury penthouse offering panoramic sea views and unmatched sophistication. Features include a private terrace, designer interiors, smart home automation, and exclusive access to premium building amenities.",
    features: ["Sea View", "Private Terrace", "Smart Home", "Private Elevator", "Wine Cellar", "Jacuzzi"],
    agent_id: "A201",
    featured: true,
    createdAt: "2024-02-10",
  },
  {
    id: "L1005",
    title: "Spacious 3 BHK in Gated Community",
    price: 7200000,
    type: "Apartment",
    beds: 3,
    baths: 3,
    area_sqft: 1650,
    address: "Block C, Prestige Palm Gardens, Electronic City",
    city: "Bangalore",
    lat: 12.8456,
    lng: 77.6603,
    images: [
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    ],
    description: "Premium 3 BHK apartment in one of Bangalore's most sought-after gated communities. Enjoy world-class amenities, beautiful landscaping, and excellent connectivity to IT hubs.",
    features: ["Clubhouse", "Tennis Court", "Jogging Track", "Landscaped Gardens", "Visitor Parking", "ATM"],
    agent_id: "A204",
    featured: false,
    createdAt: "2024-02-15",
  },
  {
    id: "L1006",
    title: "Heritage 4 BHK House with Courtyard",
    price: 18000000,
    type: "House",
    beds: 4,
    baths: 3,
    area_sqft: 2800,
    address: "12, Old Rajinder Nagar",
    city: "Delhi",
    lat: 28.6448,
    lng: 77.1730,
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80",
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=80",
    ],
    description: "Charming heritage property blending traditional architecture with modern comforts. Features a central courtyard, high ceilings, and beautifully restored woodwork. Located in a prestigious neighborhood.",
    features: ["Central Courtyard", "Wooden Flooring", "Study Room", "Servant Quarter", "Garden", "Terrace"],
    agent_id: "A205",
    featured: false,
    createdAt: "2024-02-20",
  },
  {
    id: "L1007",
    title: "Premium Plot in Developing Area",
    price: 3500000,
    type: "Plot",
    beds: 0,
    baths: 0,
    area_sqft: 2400,
    address: "Sector 150, Noida Extension",
    city: "Noida",
    lat: 28.5124,
    lng: 77.3973,
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
      "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=800&q=80",
      "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=800&q=80",
    ],
    description: "Prime residential plot in rapidly developing Sector 150. Excellent investment opportunity with upcoming metro connectivity and commercial developments nearby. Clear titles and all approvals in place.",
    features: ["Clear Title", "Corner Plot", "East Facing", "Near Metro", "Wide Roads", "Gated Society"],
    agent_id: "A206",
    featured: false,
    createdAt: "2024-03-01",
  },
  {
    id: "L1008",
    title: "Elegant 2 BHK with Lake View",
    price: 5800000,
    type: "Apartment",
    beds: 2,
    baths: 2,
    area_sqft: 1100,
    address: "Lake Vista Residency, Hussain Sagar",
    city: "Hyderabad",
    lat: 17.4239,
    lng: 78.4738,
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80",
    ],
    description: "Beautifully designed 2 BHK apartment offering stunning lake views. Wake up to serene water vistas and enjoy premium living with top-notch amenities in this well-connected locality.",
    features: ["Lake View", "Vastu Compliant", "Wooden Flooring", "Modular Kitchen", "Gym", "Infinity Pool"],
    agent_id: "A201",
    featured: true,
    createdAt: "2024-03-05",
  },
  {
    id: "L1009",
    title: "Contemporary 3 BHK Duplex",
    price: 12000000,
    type: "Apartment",
    beds: 3,
    baths: 4,
    area_sqft: 2200,
    address: "The Skyline, Koregaon Park",
    city: "Pune",
    lat: 18.5362,
    lng: 73.8939,
    images: [
      "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    ],
    description: "Stunning duplex apartment featuring contemporary design and premium finishes. Double-height living room, private terrace, and located in Pune's most vibrant neighborhood.",
    features: ["Duplex Layout", "Double Height Ceiling", "Private Terrace", "Italian Marble", "Home Automation", "Concierge"],
    agent_id: "A207",
    featured: false,
    createdAt: "2024-03-10",
  },
  {
    id: "L1010",
    title: "Charming 2 BHK in Heritage Building",
    price: 6500000,
    type: "Apartment",
    beds: 2,
    baths: 1,
    area_sqft: 900,
    address: "Fort Area, Colaba",
    city: "Mumbai",
    lat: 18.9220,
    lng: 72.8347,
    images: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
      "https://images.unsplash.com/photo-1600566752584-e6b7d32eae0d?w=800&q=80",
    ],
    description: "Rare opportunity to own a piece of Mumbai's heritage. This beautifully maintained apartment features high ceilings, original wooden floors, and period details while offering modern conveniences.",
    features: ["Heritage Building", "High Ceilings", "Original Woodwork", "Sea Proximity", "Elevator", "24/7 Security"],
    agent_id: "A203",
    featured: false,
    createdAt: "2024-03-15",
  },
  {
    id: "L1011",
    title: "Beachfront 4 BHK Villa",
    price: 35000000,
    type: "Villa",
    beds: 4,
    baths: 5,
    area_sqft: 4000,
    address: "ECR Beach Road, Uthandi",
    city: "Chennai",
    lat: 12.8785,
    lng: 80.2477,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    ],
    description: "Exclusive beachfront villa offering direct access to pristine beach. Features include infinity pool, landscaped gardens, and luxurious interiors designed for coastal living.",
    features: ["Beach Access", "Infinity Pool", "Landscaped Garden", "Outdoor Kitchen", "Guest House", "Private Beach"],
    agent_id: "A208",
    featured: true,
    createdAt: "2024-03-20",
  },
  {
    id: "L1012",
    title: "Smart 1 BHK Studio Apartment",
    price: 2800000,
    type: "Apartment",
    beds: 1,
    baths: 1,
    area_sqft: 550,
    address: "IT Park Road, Hinjewadi",
    city: "Pune",
    lat: 18.5904,
    lng: 73.7389,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80",
    ],
    description: "Perfect starter home or investment property in Pune's IT hub. Fully furnished with smart home features, ideal for young professionals seeking convenience and connectivity.",
    features: ["Fully Furnished", "Smart Home", "Co-working Space", "Rooftop Lounge", "EV Charging", "Pet Friendly"],
    agent_id: "A207",
    featured: false,
    createdAt: "2024-03-25",
  },
];

export const getFeaturedListings = () => listings.filter((l) => l.featured);

export const getListingById = (id: string) => listings.find((l) => l.id === id);

export const getListingsByCity = (city: string) => 
  listings.filter((l) => l.city.toLowerCase() === city.toLowerCase());

export const getListingsByAgent = (agentId: string) => 
  listings.filter((l) => l.agent_id === agentId);

export const searchListings = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return listings.filter(
    (l) =>
      l.title.toLowerCase().includes(lowercaseQuery) ||
      l.city.toLowerCase().includes(lowercaseQuery) ||
      l.address.toLowerCase().includes(lowercaseQuery) ||
      l.type.toLowerCase().includes(lowercaseQuery)
  );
};
