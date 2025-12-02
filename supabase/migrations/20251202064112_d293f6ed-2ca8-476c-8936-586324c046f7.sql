-- Create app_role enum for future use
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create agents table
CREATE TABLE public.agents (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  image TEXT NOT NULL,
  bio TEXT NOT NULL,
  specialization TEXT[] NOT NULL,
  experience INTEGER NOT NULL,
  rating DECIMAL(2,1) NOT NULL CHECK (rating >= 0 AND rating <= 5),
  review_count INTEGER NOT NULL DEFAULT 0,
  listings_count INTEGER NOT NULL DEFAULT 0,
  verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create listings table
CREATE TABLE public.listings (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  price INTEGER NOT NULL CHECK (price > 0),
  type TEXT NOT NULL CHECK (type IN ('Apartment', 'House', 'Villa', 'Plot', 'Penthouse')),
  beds INTEGER NOT NULL DEFAULT 0,
  baths INTEGER NOT NULL DEFAULT 0,
  area_sqft INTEGER NOT NULL CHECK (area_sqft > 0),
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  lat DECIMAL(10,8) NOT NULL,
  lng DECIMAL(11,8) NOT NULL,
  images TEXT[] NOT NULL,
  description TEXT NOT NULL,
  features TEXT[] NOT NULL,
  agent_id TEXT NOT NULL REFERENCES public.agents(id) ON DELETE CASCADE,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (real estate site needs public listings)
CREATE POLICY "Agents are viewable by everyone"
  ON public.agents
  FOR SELECT
  USING (true);

CREATE POLICY "Listings are viewable by everyone"
  ON public.listings
  FOR SELECT
  USING (true);

-- Create indexes for better performance
CREATE INDEX idx_listings_city ON public.listings(city);
CREATE INDEX idx_listings_type ON public.listings(type);
CREATE INDEX idx_listings_price ON public.listings(price);
CREATE INDEX idx_listings_featured ON public.listings(featured);
CREATE INDEX idx_listings_agent_id ON public.listings(agent_id);
CREATE INDEX idx_agents_verified ON public.agents(verified);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_agents_updated_at
  BEFORE UPDATE ON public.agents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_listings_updated_at
  BEFORE UPDATE ON public.listings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert agents data
INSERT INTO public.agents (id, name, email, phone, image, bio, specialization, experience, rating, review_count, listings_count, verified) VALUES
('A201', 'Priya Sharma', 'priya.sharma@nestfinder.com', '+91 98765 43210', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80', 'With over 10 years of experience in luxury real estate, Priya specializes in premium properties across Hyderabad and Mumbai. Her deep market knowledge and client-first approach have earned her recognition as a top performer.', ARRAY['Luxury Apartments', 'Penthouses', 'Investment Properties'], 10, 4.9, 156, 45, true),
('A202', 'Rajesh Kumar', 'rajesh.kumar@nestfinder.com', '+91 98765 43211', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80', 'Rajesh brings 8 years of expertise in Bangalore''s residential market. He specializes in villas and gated communities, helping families find their dream homes in premium localities.', ARRAY['Villas', 'Gated Communities', 'Family Homes'], 8, 4.8, 124, 38, true),
('A203', 'Anjali Mehta', 'anjali.mehta@nestfinder.com', '+91 98765 43212', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80', 'Mumbai native Anjali has been helping clients navigate the city''s complex real estate market for 12 years. Her expertise in heritage properties and South Mumbai locations is unmatched.', ARRAY['Heritage Properties', 'South Mumbai', 'Commercial Spaces'], 12, 4.9, 189, 52, true),
('A204', 'Vikram Singh', 'vikram.singh@nestfinder.com', '+91 98765 43213', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', 'Vikram is Bangalore''s go-to expert for IT corridor properties. With 6 years of experience, he helps tech professionals and investors find ideal properties near major IT hubs.', ARRAY['IT Corridor', 'New Launches', 'Rental Properties'], 6, 4.7, 98, 32, true),
('A205', 'Neha Gupta', 'neha.gupta@nestfinder.com', '+91 98765 43214', 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&q=80', 'Delhi-based Neha specializes in premium residential properties and independent houses. Her 9 years of experience and vast network make her a trusted advisor for discerning buyers.', ARRAY['Independent Houses', 'Premium Apartments', 'NRI Services'], 9, 4.8, 142, 41, true),
('A206', 'Amit Patel', 'amit.patel@nestfinder.com', '+91 98765 43215', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80', 'Amit focuses on NCR region plots and new developments. With 5 years of experience, he helps investors identify high-growth opportunities in emerging areas.', ARRAY['Plots', 'New Developments', 'Investment Advisory'], 5, 4.6, 76, 28, true),
('A207', 'Sanjana Reddy', 'sanjana.reddy@nestfinder.com', '+91 98765 43216', 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400&q=80', 'Pune specialist Sanjana has 7 years of experience in residential and commercial properties. Her client relationships and market insights drive successful transactions.', ARRAY['Pune Market', 'Duplex Apartments', 'First-time Buyers'], 7, 4.8, 112, 35, true),
('A208', 'Karthik Iyer', 'karthik.iyer@nestfinder.com', '+91 98765 43217', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80', 'Chennai''s coastal property expert, Karthik brings 11 years of experience in beachfront and ECR properties. He''s helped numerous clients find their seaside dream homes.', ARRAY['Beachfront Properties', 'ECR', 'Vacation Homes'], 11, 4.9, 167, 48, true);

-- Insert listings data
INSERT INTO public.listings (id, title, price, type, beds, baths, area_sqft, address, city, lat, lng, images, description, features, agent_id, featured, created_at) VALUES
('L1001', 'Luxurious 3 BHK Apartment with City View', 8500000, 'Apartment', 3, 2, 1450, 'Plot 42, Road No. 12, Banjara Hills', 'Hyderabad', 17.4156, 78.4347, ARRAY['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80'], 'Experience luxury living in this stunning 3 BHK apartment located in the heart of Banjara Hills. Features modern architecture, premium finishes, and breathtaking city views. The apartment includes a modular kitchen, spacious bedrooms, and a large balcony perfect for entertaining.', ARRAY['Modular Kitchen', 'Balcony', 'Parking', '24/7 Security', 'Gym', 'Swimming Pool'], 'A201', true, '2024-01-15'),
('L1002', 'Modern 4 BHK Villa with Garden', 15000000, 'Villa', 4, 4, 3200, 'Villa 18, Green Valley Estates, Whitefield', 'Bangalore', 12.9698, 77.7500, ARRAY['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80', 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'], 'Exquisite 4 BHK villa nestled in a serene gated community. This property boasts a beautiful private garden, contemporary interiors, and premium amenities. Perfect for families seeking a peaceful yet connected lifestyle.', ARRAY['Private Garden', 'Servant Quarter', 'Home Theater', 'Solar Panels', 'Rainwater Harvesting', 'Club Access'], 'A202', true, '2024-01-20'),
('L1003', 'Cozy 2 BHK Apartment Near Metro', 4500000, 'Apartment', 2, 2, 950, 'Tower B, Sunrise Heights, Andheri West', 'Mumbai', 19.1364, 72.8296, ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80', 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80'], 'Well-designed 2 BHK apartment offering excellent connectivity with metro station just 5 minutes walk. Features include modern amenities, ample natural light, and proximity to shopping centers and schools.', ARRAY['Near Metro', 'Covered Parking', 'Power Backup', 'Intercom', 'CCTV', 'Children''s Play Area'], 'A203', true, '2024-02-01'),
('L1004', 'Stunning Penthouse with Terrace', 25000000, 'Penthouse', 5, 5, 4500, 'Top Floor, Skyline Towers, Marine Drive', 'Mumbai', 18.9432, 72.8235, ARRAY['https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&q=80', 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80', 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80'], 'Ultra-luxury penthouse offering panoramic sea views and unmatched sophistication. Features include a private terrace, designer interiors, smart home automation, and exclusive access to premium building amenities.', ARRAY['Sea View', 'Private Terrace', 'Smart Home', 'Private Elevator', 'Wine Cellar', 'Jacuzzi'], 'A201', true, '2024-02-10'),
('L1005', 'Spacious 3 BHK in Gated Community', 7200000, 'Apartment', 3, 3, 1650, 'Block C, Prestige Palm Gardens, Electronic City', 'Bangalore', 12.8456, 77.6603, ARRAY['https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80', 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80', 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80'], 'Premium 3 BHK apartment in one of Bangalore''s most sought-after gated communities. Enjoy world-class amenities, beautiful landscaping, and excellent connectivity to IT hubs.', ARRAY['Clubhouse', 'Tennis Court', 'Jogging Track', 'Landscaped Gardens', 'Visitor Parking', 'ATM'], 'A204', false, '2024-02-15'),
('L1006', 'Heritage 4 BHK House with Courtyard', 18000000, 'House', 4, 3, 2800, '12, Old Rajinder Nagar', 'Delhi', 28.6448, 77.1730, ARRAY['https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80', 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80', 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=80'], 'Charming heritage property blending traditional architecture with modern comforts. Features a central courtyard, high ceilings, and beautifully restored woodwork. Located in a prestigious neighborhood.', ARRAY['Central Courtyard', 'Wooden Flooring', 'Study Room', 'Servant Quarter', 'Garden', 'Terrace'], 'A205', false, '2024-02-20'),
('L1007', 'Premium Plot in Developing Area', 3500000, 'Plot', 0, 0, 2400, 'Sector 150, Noida Extension', 'Noida', 28.5124, 77.3973, ARRAY['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', 'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=800&q=80', 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=800&q=80'], 'Prime residential plot in rapidly developing Sector 150. Excellent investment opportunity with upcoming metro connectivity and commercial developments nearby. Clear titles and all approvals in place.', ARRAY['Clear Title', 'Corner Plot', 'East Facing', 'Near Metro', 'Wide Roads', 'Gated Society'], 'A206', false, '2024-03-01'),
('L1008', 'Elegant 2 BHK with Lake View', 5800000, 'Apartment', 2, 2, 1100, 'Lake Vista Residency, Hussain Sagar', 'Hyderabad', 17.4239, 78.4738, ARRAY['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80', 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&q=80', 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80'], 'Beautifully designed 2 BHK apartment offering stunning lake views. Wake up to serene water vistas and enjoy premium living with top-notch amenities in this well-connected locality.', ARRAY['Lake View', 'Vastu Compliant', 'Wooden Flooring', 'Modular Kitchen', 'Gym', 'Infinity Pool'], 'A201', true, '2024-03-05'),
('L1009', 'Contemporary 3 BHK Duplex', 12000000, 'Apartment', 3, 4, 2200, 'The Skyline, Koregaon Park', 'Pune', 18.5362, 73.8939, ARRAY['https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&q=80', 'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&q=80', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'], 'Stunning duplex apartment featuring contemporary design and premium finishes. Double-height living room, private terrace, and located in Pune''s most vibrant neighborhood.', ARRAY['Duplex Layout', 'Double Height Ceiling', 'Private Terrace', 'Italian Marble', 'Home Automation', 'Concierge'], 'A207', false, '2024-03-10'),
('L1010', 'Charming 2 BHK in Heritage Building', 6500000, 'Apartment', 2, 1, 900, 'Fort Area, Colaba', 'Mumbai', 18.9220, 72.8347, ARRAY['https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80', 'https://images.unsplash.com/photo-1600566752584-e6b7d32eae0d?w=800&q=80'], 'Rare opportunity to own a piece of Mumbai''s heritage. This beautifully maintained apartment features high ceilings, original wooden floors, and period details while offering modern conveniences.', ARRAY['Heritage Building', 'High Ceilings', 'Original Woodwork', 'Sea Proximity', 'Elevator', '24/7 Security'], 'A203', false, '2024-03-15'),
('L1011', 'Beachfront 4 BHK Villa', 35000000, 'Villa', 4, 5, 4000, 'ECR Beach Road, Uthandi', 'Chennai', 12.8785, 80.2477, ARRAY['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80'], 'Exclusive beachfront villa offering direct access to pristine beach. Features include infinity pool, landscaped gardens, and luxurious interiors designed for coastal living.', ARRAY['Beach Access', 'Infinity Pool', 'Landscaped Garden', 'Outdoor Kitchen', 'Guest House', 'Private Beach'], 'A208', true, '2024-03-20'),
('L1012', 'Smart 1 BHK Studio Apartment', 2800000, 'Apartment', 1, 1, 550, 'IT Park Road, Hinjewadi', 'Pune', 18.5904, 73.7389, ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80', 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80'], 'Perfect starter home or investment property in Pune''s IT hub. Fully furnished with smart home features, ideal for young professionals seeking convenience and connectivity.', ARRAY['Fully Furnished', 'Smart Home', 'Co-working Space', 'Rooftop Lounge', 'EV Charging', 'Pet Friendly'], 'A207', false, '2024-03-25');