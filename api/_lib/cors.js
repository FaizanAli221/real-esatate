// api/_lib/cors.js
// Shared CORS + method-guard helper for every serverless function.
// NOTE: files/folders prefixed with "_" inside /api are ignored by Vercel's
// file-system router, so this module is never itself exposed as an endpoint.

function withCors(handler, allowedMethods = ["GET"]) {
  return async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", process.env.CORS_ORIGIN || "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      [...allowedMethods, "OPTIONS"].join(", ")
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // Preflight
    if (req.method === "OPTIONS") {
      return res.status(204).end();
    }

    if (!allowedMethods.includes(req.method)) {
      res.setHeader("Allow", allowedMethods.join(", "));
      return res.status(405).json({
        success: false,
        error: `Method ${req.method} not allowed on this endpoint.`,
      });
    }

    try {
      return await handler(req, res);
    } catch (err) {
      console.error(`[API ERROR] ${req.url}:`, err);
      return res.status(500).json({
        success: false,
        error: "Internal server error.",
      });
    }
  };
}

module.exports = { withCors };
