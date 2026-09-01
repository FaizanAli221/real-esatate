// api/_lib/data.js
// In-memory mock data store. Swap this module for a Supabase/Postgres/Prisma
// client later without touching any route handler — every handler only calls
// the exported functions below, never the arrays directly.

const PROPERTIES = [
  {
    id: "lh-1001",
    title: "Skyline Penthouse at The Meridian",
    type: "apartment",
    status: "for-sale",
    price: 1250000,
    currency: "USD",
    specs: { bedrooms: 3, bathrooms: 3, areaSqft: 2400, parking: 2, yearBuilt: 2021 },
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85"
    ],
    address: { line1: "88 Meridian Ave, Unit 42B", city: "Austin", state: "TX", zip: "78701" },
    description: "Perched atop the prestigious Meridian Tower in Downtown Austin, this architectural penthouse offers panoramic skyline and Lady Bird Lake views. Featuring 11-foot floor-to-ceiling glass walls, European white oak flooring, custom Poliform cabinetry, and a private 400-sqft sky terrace equipped with an outdoor kitchen.",
    amenities: ["Rooftop Infinity Pool", "24/7 White-Glove Concierge", "Smart Home Automation", "Private Fitness Studio", "Dual EV Charging Stations", "Wine Sommelier Room"],
    highlights: ["Panoramic 360° Skyline Views", "Direct Private Elevator Access", "Sub-Zero & Wolf Appliances", "Motorized Solar & Blackout Shades"],
    coordinates: { lat: 30.2672, lng: -97.7431 },
    listedAt: "2025-11-02T09:00:00.000Z",
  },
  {
    id: "lh-1002",
    title: "Modern Hillside Villa with Ocean Panoramas",
    type: "villa",
    status: "for-sale",
    price: 2850000,
    currency: "USD",
    specs: { bedrooms: 5, bathrooms: 5, areaSqft: 5200, parking: 3, yearBuilt: 2019 },
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85"
    ],
    address: { line1: "14 Ridgecrest Drive", city: "Malibu", state: "CA", zip: "90265" },
    description: "An extraordinary coastal masterpiece engineered into the Malibu bluffs. Seamless indoor-outdoor living with motorized pocket glass doors opening to a zero-edge infinity pool cascading toward the Pacific Ocean. Includes a temperature-controlled 600-bottle wine cellar, private Dolby Atmos screening room, and secluded guest house.",
    amenities: ["Zero-Edge Infinity Pool", "Unobstructed Pacific Ocean Views", "Climate-Controlled Wine Cellar", "Dolby Atmos Home Theater", "Zen Garden & Fire Pit", "Private Security Gated Compound"],
    highlights: ["Custom Travertine & Cedar Finishes", "Chef's Kitchen with Double Islands", "Detached Luxury Guest Casita", "Solar Microgrid & Tesla Powerwalls"],
    coordinates: { lat: 34.0259, lng: -118.7798 },
    listedAt: "2025-10-18T09:00:00.000Z",
  },
  {
    id: "lh-1003",
    title: "Downtown Designer Loft with Soaring Ceilings",
    type: "condo",
    status: "for-rent",
    price: 4200,
    currency: "USD",
    priceUnit: "month",
    specs: { bedrooms: 2, bathrooms: 2, areaSqft: 1350, parking: 1, yearBuilt: 2016 },
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=85"
    ],
    address: { line1: "500 Congress St, Unit 12", city: "Austin", state: "TX", zip: "78701" },
    description: "A rare authentic loft combining industrial heritage with sophisticated modern luxury on prestigious Congress Avenue. Features exposed brick walls, 14-foot exposed concrete timber beams, bespoke brass fixtures, open-concept Italian kitchen, and a sunset-facing private balcony.",
    amenities: ["Pet Friendly Spa", "In-Unit Miele Laundry", "Private Sunset Balcony", "Reserved Underground Parking", "Keyless Smart Entry", "Boutique Rooftop Deck"],
    highlights: ["14ft Historic High Ceilings", "Exposed Original Brick & Steel", "Custom Walk-in Dressing Room", "Steps to World-Class Dining"],
    coordinates: { lat: 30.2688, lng: -97.7411 },
    listedAt: "2025-12-01T09:00:00.000Z",
  },
  {
    id: "lh-1004",
    title: "The Maple Estate & Private Garden Residence",
    type: "house",
    status: "for-sale",
    price: 685000,
    currency: "USD",
    specs: { bedrooms: 4, bathrooms: 3, areaSqft: 2900, parking: 2, yearBuilt: 2008 },
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&w=1200&q=85"
    ],
    address: { line1: "227 Maple Grove Lane", city: "Round Rock", state: "TX", zip: "78664" },
    description: "Nestled within an exclusive tree-lined enclave, this gracious family estate offers refined tranquility. Features an expansive open floor plan with hardwood floors, gourmet kitchen with quartz island, resort-style backyard with covered pergola, heated pool, and complete rooftop solar array.",
    amenities: ["Expansive Private Backyard", "Rooftop Solar Energy System", "Heated Community Pool & Clubhouse", "3-Car Garage with Workshop", "High-Speed Fiber Connected", "Top-Rated School District"],
    highlights: ["Primary Suite with Spa Bath", "Outdoor Summer Kitchen & BBQ", "Zero-Maintenance Turf Lawn", "Dedicated Work-From-Home Office"],
    coordinates: { lat: 30.5083, lng: -97.6789 },
    listedAt: "2025-09-22T09:00:00.000Z",
  },
  {
    id: "lh-1005",
    title: "Waterfront Luxury Condo at Harbor Point",
    type: "condo",
    status: "for-sale",
    price: 1975000,
    currency: "USD",
    specs: { bedrooms: 3, bathrooms: 3, areaSqft: 2100, parking: 2, yearBuilt: 2022 },
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85"
    ],
    address: { line1: "9 Harbor Point Blvd", city: "Miami", state: "FL", zip: "33132" },
    description: "Direct Biscayne Bay frontage and sparkling water panoramas define this ultra-luxury Miami condominium. Designed by renowned interior architects with custom Italian porcelain tiles, Boffi kitchen, expansive glass balconies overlooking cruise ship channels, and private deep-water yacht slip access.",
    amenities: ["Private Yacht Marina Slips", "Hydrotherapy Spa & Sauna", "24/7 Armed Concierge Security", "Sunset Sky Lounge on 50th Floor", "Valet Parking Service", "Private Beach Club Access"],
    highlights: ["Direct Bay & Ocean Facing", "Expansive 50ft Wrap Balcony", "Smart Automated Lighting & AC", "Private Wine Storage Locker"],
    coordinates: { lat: 25.7743, lng: -80.1937 },
    listedAt: "2025-11-27T09:00:00.000Z",
  },
  {
    id: "lh-1006",
    title: "Executive Tech Corridor Studio Loft",
    type: "apartment",
    status: "for-rent",
    price: 1850,
    currency: "USD",
    priceUnit: "month",
    specs: { bedrooms: 1, bathrooms: 1, areaSqft: 620, parking: 1, yearBuilt: 2018 },
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1502005229762-ee1b2b81e4b8?auto=format&fit=crop&w=1200&q=85"
    ],
    address: { line1: "3300 Innovation Way, Unit 5", city: "Austin", state: "TX", zip: "78759" },
    description: "A meticulously engineered urban sanctuary situated minutes from Austin's primary tech campuses. High-end built-in Murphy bed and transformable office system, stainless steel appliances, quartz counters, and floor-to-ceiling acoustic glass for serene quiet living.",
    amenities: ["Co-Working Executive Lounge", "State-of-the-Art Fitness Center", "Secure Indoor Bike Storage", "Dog Park & Grooming Station", "Package Lockers & Cold Storage"],
    highlights: ["Smart Space-Saving Furniture", "Ultra-Fast 10Gbps Internet", "Walk to Cafes & Breweries", "Low Utility Energy-Star Rating"],
    coordinates: { lat: 30.4021, lng: -97.7489 },
    listedAt: "2025-12-10T09:00:00.000Z",
  },
];

const INQUIRIES = [];

function getProperties(filters = {}) {
  const { type, minPrice, maxPrice, city } = filters;

  return PROPERTIES.filter((p) => {
    if (type && p.type.toLowerCase() !== String(type).toLowerCase()) return false;
    if (city && p.address.city.toLowerCase() !== String(city).toLowerCase()) return false;
    if (minPrice && p.price < Number(minPrice)) return false;
    if (maxPrice && p.price > Number(maxPrice)) return false;
    return true;
  });
}

function getPropertyById(id) {
  return PROPERTIES.find((p) => p.id === id) || null;
}

function createInquiry(inquiry) {
  INQUIRIES.push(inquiry);
  return inquiry;
}

module.exports = { PROPERTIES, getProperties, getPropertyById, createInquiry };
