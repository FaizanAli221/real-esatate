// api/properties.js
// GET /api/properties
// GET /api/properties?type=villa&minPrice=500000&maxPrice=2000000&city=Austin
// GET /api/properties?id=lh-1001   -> single property lookup

const { withCors } = require("./_lib/cors");
const { getProperties, getPropertyById } = require("./_lib/data");

async function handler(req, res) {
  const { id, type, minPrice, maxPrice, city } = req.query;

  // Single-property lookup
  if (id) {
    const property = getPropertyById(id);
    if (!property) {
      return res.status(404).json({ success: false, error: `No property found with id "${id}".` });
    }
    return res.status(200).json({ success: true, data: property });
  }

  // Basic param validation — fail loudly instead of silently ignoring bad input
  if (minPrice && Number.isNaN(Number(minPrice))) {
    return res.status(400).json({ success: false, error: "minPrice must be a number." });
  }
  if (maxPrice && Number.isNaN(Number(maxPrice))) {
    return res.status(400).json({ success: false, error: "maxPrice must be a number." });
  }

  const results = getProperties({ type, minPrice, maxPrice, city });

  return res.status(200).json({
    success: true,
    count: results.length,
    filters: { type: type || null, minPrice: minPrice || null, maxPrice: maxPrice || null, city: city || null },
    data: results,
  });
}

module.exports = withCors(handler, ["GET"]);
