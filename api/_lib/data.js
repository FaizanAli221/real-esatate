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
      "https://images.unsplash.com/photo-1613977257363-707ba9348227",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    ],
    address: { line1: "88 Meridian Ave, Unit 42B", city: "Austin", state: "TX", zip: "78701" },
    amenities: ["Rooftop Pool", "Concierge", "Smart Home", "Gym", "EV Charging"],
    coordinates: { lat: 30.2672, lng: -97.7431 },
    listedAt: "2025-11-02T09:00:00.000Z",
  },
  {
    id: "lh-1002",
    title: "Modern Hillside Villa",
    type: "villa",
    status: "for-sale",
    price: 2850000,
    currency: "USD",
    specs: { bedrooms: 5, bathrooms: 5, areaSqft: 5200, parking: 3, yearBuilt: 2019 },
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
    ],
    address: { line1: "14 Ridgecrest Drive", city: "Malibu", state: "CA", zip: "90265" },
    amenities: ["Infinity Pool", "Ocean View", "Wine Cellar", "Home Theater"],
    coordinates: { lat: 34.0259, lng: -118.7798 },
    listedAt: "2025-10-18T09:00:00.000Z",
  },
  {
    id: "lh-1003",
    title: "Downtown Loft with Skyline Views",
    type: "condo",
    status: "for-rent",
    price: 4200,
    currency: "USD",
    priceUnit: "month",
    specs: { bedrooms: 2, bathrooms: 2, areaSqft: 1350, parking: 1, yearBuilt: 2016 },
    images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb"],
    address: { line1: "500 Congress St, Unit 12", city: "Austin", state: "TX", zip: "78701" },
    amenities: ["Pet Friendly", "In-unit Laundry", "Balcony"],
    coordinates: { lat: 30.2688, lng: -97.7411 },
    listedAt: "2025-12-01T09:00:00.000Z",
  },
  {
    id: "lh-1004",
    title: "Suburban Family Home",
    type: "house",
    status: "for-sale",
    price: 685000,
    currency: "USD",
    specs: { bedrooms: 4, bathrooms: 3, areaSqft: 2900, parking: 2, yearBuilt: 2008 },
    images: ["https://images.unsplash.com/photo-1568605114967-8130f3a36994"],
    address: { line1: "227 Maple Grove Lane", city: "Round Rock", state: "TX", zip: "78664" },
    amenities: ["Backyard", "Solar Panels", "Community Pool"],
    coordinates: { lat: 30.5083, lng: -97.6789 },
    listedAt: "2025-09-22T09:00:00.000Z",
  },
  {
    id: "lh-1005",
    title: "Waterfront Luxury Condo",
    type: "condo",
    status: "for-sale",
    price: 1975000,
    currency: "USD",
    specs: { bedrooms: 3, bathrooms: 3, areaSqft: 2100, parking: 2, yearBuilt: 2022 },
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"],
    address: { line1: "9 Harbor Point Blvd", city: "Miami", state: "FL", zip: "33132" },
    amenities: ["Private Marina", "Spa", "24/7 Security", "Rooftop Lounge"],
    coordinates: { lat: 25.7743, lng: -80.1937 },
    listedAt: "2025-11-27T09:00:00.000Z",
  },
  {
    id: "lh-1006",
    title: "Cozy Studio Near Tech Corridor",
    type: "apartment",
    status: "for-rent",
    price: 1850,
    currency: "USD",
    priceUnit: "month",
    specs: { bedrooms: 1, bathrooms: 1, areaSqft: 620, parking: 1, yearBuilt: 2018 },
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"],
    address: { line1: "3300 Innovation Way, Unit 5", city: "Austin", state: "TX", zip: "78759" },
    amenities: ["Co-working Lounge", "Gym", "Bike Storage"],
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
