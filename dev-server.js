// dev-server.js
// Local development server using Node.js built-in modules (Zero dependencies required).
// Runs the Vercel serverless functions locally without requiring `vercel login` or project setup.

const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const API_DIR = path.join(__dirname, "api");

// Helper to enhance response object with Vercel/Express-like methods
function enhanceResponse(res) {
  res.status = function (statusCode) {
    res.statusCode = statusCode;
    return res;
  };

  res.json = function (data) {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify(data, null, 2));
    return res;
  };

  return res;
}

// Helper to parse incoming request body
function parseBody(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      // Protect against giant payloads (max 1MB)
      if (body.length > 1e6) {
        req.socket.destroy();
      }
    });

    req.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch {
        resolve(body);
      }
    });
  });
}

// Interactive API UI for root '/'
function serveDashboard(res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LuxeHaven Properties API — Local Dev</title>
  <style>
    :root {
      --bg: #0f172a;
      --card: #1e293b;
      --border: #334155;
      --primary: #38bdf8;
      --primary-hover: #0ea5e9;
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --success: #4ade80;
      --method-get: #38bdf8;
      --method-post: #a855f7;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; }
    body { background: var(--bg); color: var(--text); padding: 2rem; max-width: 1000px; margin: 0 auto; line-height: 1.5; }
    header { margin-bottom: 2rem; border-bottom: 1px solid var(--border); padding-bottom: 1rem; display: flex; justify-content: space-between; align-items: center; }
    h1 { font-size: 1.6rem; color: #fff; }
    .badge { background: #064e3b; color: var(--success); font-size: 0.8rem; padding: 0.25rem 0.6rem; border-radius: 9999px; font-weight: 600; }
    .endpoints { display: grid; gap: 1.25rem; }
    .card { background: var(--card); border: 1px solid var(--border); border-radius: 8px; padding: 1.25rem; transition: border-color 0.2s; }
    .card:hover { border-color: var(--primary); }
    .card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem; }
    .method { font-weight: 700; font-size: 0.85rem; padding: 0.2rem 0.5rem; border-radius: 4px; }
    .get { background: rgba(56, 189, 248, 0.15); color: var(--method-get); border: 1px solid var(--method-get); }
    .post { background: rgba(168, 85, 247, 0.15); color: var(--method-post); border: 1px solid var(--method-post); }
    .route { font-family: monospace; font-size: 1rem; font-weight: 600; color: #f1f5f9; }
    .desc { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem; }
    .btn { background: var(--primary); color: #0f172a; border: none; padding: 0.5rem 1rem; border-radius: 6px; font-weight: 600; cursor: pointer; transition: background 0.2s; font-size: 0.85rem; }
    .btn:hover { background: var(--primary-hover); }
    pre { background: #090d16; border: 1px solid #1e293b; border-radius: 6px; padding: 1rem; overflow-x: auto; font-family: monospace; font-size: 0.85rem; color: #e2e8f0; margin-top: 0.75rem; max-height: 250px; }
    .hidden { display: none; }
  </style>
</head>
<body>
  <header>
    <div>
      <h1>🏠 LuxeHaven Properties API</h1>
      <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 4px;">Local Development Server running on <code>http://localhost:${PORT}</code></p>
    </div>
    <span class="badge">● Online</span>
  </header>

  <main class="endpoints">
    <!-- Health Check -->
    <div class="card">
      <div class="card-header">
        <div><span class="method get">GET</span> <span class="route">/api/health</span></div>
        <button class="btn" onclick="testEndpoint('GET', '/api/health', null, 'out-health')">Test API</button>
      </div>
      <p class="desc">System health check, uptime, version, and server status.</p>
      <pre id="out-health" class="hidden"></pre>
    </div>

    <!-- Properties List -->
    <div class="card">
      <div class="card-header">
        <div><span class="method get">GET</span> <span class="route">/api/properties</span></div>
        <button class="btn" onclick="testEndpoint('GET', '/api/properties?city=Austin', null, 'out-props')">Test (Austin)</button>
      </div>
      <p class="desc">List all properties or filter by <code>?type=villa</code>, <code>?city=Austin</code>, <code>?minPrice=500000</code>, <code>?maxPrice=2000000</code>, or <code>?id=lh-1001</code>.</p>
      <pre id="out-props" class="hidden"></pre>
    </div>

    <!-- Mortgage Calculator -->
    <div class="card">
      <div class="card-header">
        <div><span class="method post">POST</span> <span class="route">/api/calculate-mortgage</span></div>
        <button class="btn" onclick="testEndpoint('POST', '/api/calculate-mortgage', { principal: 500000, interestRate: 6.5, downPayment: 100000, tenureYears: 30 }, 'out-mortgage')">Test Calculate</button>
      </div>
      <p class="desc">Calculate monthly loan EMI and full amortization schedule year-by-year.</p>
      <pre id="out-mortgage" class="hidden"></pre>
    </div>

    <!-- Submit Inquiry -->
    <div class="card">
      <div class="card-header">
        <div><span class="method post">POST</span> <span class="route">/api/inquiries</span></div>
        <button class="btn" onclick="testEndpoint('POST', '/api/inquiries', { name: 'Jordan Lee', email: 'jordan@example.com', phone: '+1 512-555-0199', propertyId: 'lh-1001', message: 'I would like to book a private viewing.' }, 'out-inquiry')">Test Submit</button>
      </div>
      <p class="desc">Submit and validate a prospective buyer/renter inquiry lead.</p>
      <pre id="out-inquiry" class="hidden"></pre>
    </div>
  </main>

  <script>
    async function testEndpoint(method, path, body, targetId) {
      const el = document.getElementById(targetId);
      el.classList.remove('hidden');
      el.textContent = 'Fetching...';
      try {
        const opts = { method, headers: {} };
        if (body) {
          opts.headers['Content-Type'] = 'application/json';
          opts.body = JSON.stringify(body);
        }
        const res = await fetch(path, opts);
        const data = await res.json();
        el.textContent = JSON.stringify(data, null, 2);
      } catch (err) {
        el.textContent = 'Error: ' + err.message;
      }
    }
  </script>
</body>
</html>`);
}

const server = http.createServer(async (req, res) => {
  enhanceResponse(res);

  const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const pathname = parsedUrl.pathname.replace(/\/+$/, "") || "/";

  // Root Dashboard
  if (pathname === "/" || pathname === "/index.html") {
    return serveDashboard(res);
  }

  // Handle /api/* routes
  if (pathname.startsWith("/api/")) {
    const routeName = pathname.replace(/^\/api\//, "");

    // Ignore _lib or hidden files
    if (routeName.startsWith("_") || routeName.includes("..")) {
      return res.status(404).json({ success: false, error: "Not found" });
    }

    const routeFile = path.join(API_DIR, `${routeName}.js`);

    if (fs.existsSync(routeFile)) {
      try {
        // Clear require cache in dev mode for hot reloading
        delete require.cache[require.resolve(routeFile)];
        const handler = require(routeFile);

        req.query = Object.fromEntries(parsedUrl.searchParams.entries());
        req.body = await parseBody(req);

        console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${pathname}`);
        return await handler(req, res);
      } catch (err) {
        console.error(`[Error executing ${pathname}]:`, err);
        return res.status(500).json({
          success: false,
          error: "Internal Server Error",
          details: err.message,
        });
      }
    }
  }

  // 404 for other routes
  return res.status(404).json({
    success: false,
    error: `Route ${pathname} not found. Available endpoints: /api/properties, /api/inquiries, /api/calculate-mortgage, /api/health`,
  });
});

server.listen(PORT, () => {
  console.log(`
=====================================================
🚀 LuxeHaven Properties API Server running!
📍 URL: http://localhost:${PORT}
📋 Test Dashboard: http://localhost:${PORT}/
⚡ Endpoints:
   • GET  http://localhost:${PORT}/api/health
   • GET  http://localhost:${PORT}/api/properties
   • POST http://localhost:${PORT}/api/calculate-mortgage
   • POST http://localhost:${PORT}/api/inquiries
=====================================================
  `);
});
