export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  bio: string;
  specialization: string[];
  experience: number;
  rating: number;
  reviewCount: number;
  listings: number;
  verified: boolean;
}

export const agents: Agent[] = [
  {
    id: "A201",
    name: "Priya Sharma",
    email: "priya.sharma@nestfinder.com",
    phone: "+91 98765 43210",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    bio: "With over 10 years of experience in luxury real estate, Priya specializes in premium properties across Hyderabad and Mumbai. Her deep market knowledge and client-first approach have earned her recognition as a top performer.",
    specialization: ["Luxury Apartments", "Penthouses", "Investment Properties"],
    experience: 10,
    rating: 4.9,
    reviewCount: 156,
    listings: 45,
    verified: true,
  },
  {
    id: "A202",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@nestfinder.com",
    phone: "+91 98765 43211",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    bio: "Rajesh brings 8 years of expertise in Bangalore's residential market. He specializes in villas and gated communities, helping families find their dream homes in premium localities.",
    specialization: ["Villas", "Gated Communities", "Family Homes"],
    experience: 8,
    rating: 4.8,
    reviewCount: 124,
    listings: 38,
    verified: true,
  },
  {
    id: "A203",
    name: "Anjali Mehta",
    email: "anjali.mehta@nestfinder.com",
    phone: "+91 98765 43212",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
    bio: "Mumbai native Anjali has been helping clients navigate the city's complex real estate market for 12 years. Her expertise in heritage properties and South Mumbai locations is unmatched.",
    specialization: ["Heritage Properties", "South Mumbai", "Commercial Spaces"],
    experience: 12,
    rating: 4.9,
    reviewCount: 189,
    listings: 52,
    verified: true,
  },
  {
    id: "A204",
    name: "Vikram Singh",
    email: "vikram.singh@nestfinder.com",
    phone: "+91 98765 43213",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    bio: "Vikram is Bangalore's go-to expert for IT corridor properties. With 6 years of experience, he helps tech professionals and investors find ideal properties near major IT hubs.",
    specialization: ["IT Corridor", "New Launches", "Rental Properties"],
    experience: 6,
    rating: 4.7,
    reviewCount: 98,
    listings: 32,
    verified: true,
  },
  {
    id: "A205",
    name: "Neha Gupta",
    email: "neha.gupta@nestfinder.com",
    phone: "+91 98765 43214",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&q=80",
    bio: "Delhi-based Neha specializes in premium residential properties and independent houses. Her 9 years of experience and vast network make her a trusted advisor for discerning buyers.",
    specialization: ["Independent Houses", "Premium Apartments", "NRI Services"],
    experience: 9,
    rating: 4.8,
    reviewCount: 142,
    listings: 41,
    verified: true,
  },
  {
    id: "A206",
    name: "Amit Patel",
    email: "amit.patel@nestfinder.com",
    phone: "+91 98765 43215",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    bio: "Amit focuses on NCR region plots and new developments. With 5 years of experience, he helps investors identify high-growth opportunities in emerging areas.",
    specialization: ["Plots", "New Developments", "Investment Advisory"],
    experience: 5,
    rating: 4.6,
    reviewCount: 76,
    listings: 28,
    verified: true,
  },
  {
    id: "A207",
    name: "Sanjana Reddy",
    email: "sanjana.reddy@nestfinder.com",
    phone: "+91 98765 43216",
    image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400&q=80",
    bio: "Pune specialist Sanjana has 7 years of experience in residential and commercial properties. Her client relationships and market insights drive successful transactions.",
    specialization: ["Pune Market", "Duplex Apartments", "First-time Buyers"],
    experience: 7,
    rating: 4.8,
    reviewCount: 112,
    listings: 35,
    verified: true,
  },
  {
    id: "A208",
    name: "Karthik Iyer",
    email: "karthik.iyer@nestfinder.com",
    phone: "+91 98765 43217",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
    bio: "Chennai's coastal property expert, Karthik brings 11 years of experience in beachfront and ECR properties. He's helped numerous clients find their seaside dream homes.",
    specialization: ["Beachfront Properties", "ECR", "Vacation Homes"],
    experience: 11,
    rating: 4.9,
    reviewCount: 167,
    listings: 48,
    verified: true,
  },
];

export const getAgentById = (id: string) => agents.find((a) => a.id === id);

export const getTopAgents = (limit: number = 4) => 
  [...agents].sort((a, b) => b.rating - a.rating).slice(0, limit);
