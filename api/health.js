// api/health.js
// GET /api/health

const { withCors } = require("./_lib/cors");

const API_VERSION = "1.0.0";
const startedAt = Date.now();

async function handler(req, res) {
  return res.status(200).json({
    success: true,
    status: "ok",
    version: API_VERSION,
    uptimeSeconds: Math.floor((Date.now() - startedAt) / 1000),
    timestamp: new Date().toISOString(),
    environment: process.env.VERCEL_ENV || "local",
  });
}

module.exports = withCors(handler, ["GET"]);
